import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";

const cancelBookingSchema = z.object({
  reason: z.string().optional(),
  refund: z.boolean().default(false),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const appointmentId = params.id;
    const body = await request.json();
    const { reason, refund } = cancelBookingSchema.parse(body);

    // Find the appointment
    const appointment = await db.appointment.findFirst({
      where: {
        id: appointmentId,
        clientId: currentUser.id,
        status: {
          in: ["BOOKED", "CONFIRMED"],
        },
      },
      include: {
        payment: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found or cannot be canceled" },
        { status: 404 }
      );
    }

    // Check if cancellation is allowed (e.g., not within 24 hours)
    const now = new Date();
    const hoursUntilAppointment = (appointment.startAt.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilAppointment < 24) {
      return NextResponse.json(
        { error: "Appointments cannot be canceled within 24 hours" },
        { status: 400 }
      );
    }

    // Start transaction
    const result = await db.$transaction(async (tx: any) => {
      // Update appointment status
      const updatedAppointment = await tx.appointment.update({
        where: { id: appointmentId },
        data: {
          status: "CANCELED",
          notes: appointment.notes 
            ? `${appointment.notes}\n\nCancellation reason: ${reason || "No reason provided"}`
            : `Cancellation reason: ${reason || "No reason provided"}`,
        },
      });

      // Handle refund if requested and payment exists
      let refundResult = null;
      if (refund && appointment.payment && appointment.payment.status === "COMPLETED") {
        if (env.enableStripe) {
          try {
            // Create refund in Stripe
            const stripeRefund = await stripe!.refunds.create({
              payment_intent: appointment.payment.stripePaymentId,
              reason: "requested_by_customer",
              metadata: {
                appointmentId,
                userId: currentUser.id,
                reason: reason || "No reason provided",
              },
            });

            // Update payment status
            await tx.payment.update({
              where: { id: appointment.payment.id },
              data: { status: "REFUNDED" },
            });

            // Create refund payment record
            const refundPayment = await tx.payment.create({
              data: {
                userId: currentUser.id,
                appointmentId,
                stripePaymentId: stripeRefund.id,
                amount: -appointment.payment.amount, // Negative amount for refund
                kind: "REFUND",
                status: "COMPLETED",
              },
            });

            refundResult = {
              refundId: stripeRefund.id,
              amount: appointment.payment.amount,
              status: "completed",
            };

            logger.info("Refund processed successfully", {
              appointmentId,
              userId: currentUser.id,
              refundId: stripeRefund.id,
              amount: appointment.payment.amount,
            });
          } catch (error) {
            logger.error("Failed to process refund", error as Error, {
              appointmentId,
              userId: currentUser.id,
              paymentId: appointment.payment.id,
            });

            // Continue with cancellation even if refund fails
            refundResult = {
              error: "Refund processing failed",
              status: "failed",
            };
          }
        } else {
          refundResult = {
            error: "Payment processing not available",
            status: "unavailable",
          };
        }
      }

      return {
        appointment: updatedAppointment,
        refund: refundResult,
      };
    });

    logger.info("Appointment canceled", {
      appointmentId,
      userId: currentUser.id,
      reason,
      refundRequested: refund,
      refundResult: result.refund,
    });

    return NextResponse.json({
      success: true,
      appointment: {
        id: result.appointment.id,
        status: result.appointment.status,
        startAt: result.appointment.startAt.toISOString(),
        endAt: result.appointment.endAt.toISOString(),
      },
      refund: result.refund,
    });
  } catch (error) {
    logger.error("Failed to cancel appointment", error as Error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
