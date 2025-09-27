import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { getCurrentUser } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { env } from "@/lib/env";
import { db } from "@/lib/db";

const paymentIntentSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  amount: z.number().min(50, "Minimum amount is $0.50"), // Minimum Stripe amount
  idempotencyKey: z.string().min(1, "Idempotency key is required"),
  currency: z.string().default("usd"),
});

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is enabled
    if (!env.enableStripe) {
      return NextResponse.json(
        { error: "Payment processing is currently unavailable" },
        { status: 503 }
      );
    }

    // Get current user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = paymentIntentSchema.parse(body);

    const { appointmentId, amount, idempotencyKey, currency } = validatedData;

    // Verify appointment belongs to user
    const appointment = await db.appointment.findFirst({
      where: {
        id: appointmentId,
        clientId: currentUser.id,
        status: "BOOKED",
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found or not available for payment" },
        { status: 404 }
      );
    }

    // Check if payment already exists
    const existingPayment = await db.payment.findFirst({
      where: {
        appointmentId,
        status: {
          in: ["PENDING", "COMPLETED"],
        },
      },
    });

    if (existingPayment) {
      logger.info("Payment already exists for appointment", {
        appointmentId,
        existingPaymentId: existingPayment.id,
        userId: currentUser.id,
      });

      return NextResponse.json({
        paymentIntentId: existingPayment.stripePaymentId,
        status: "existing",
      });
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe!.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        appointmentId,
        userId: currentUser.id,
        idempotencyKey,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    }, {
      idempotencyKey,
    });

    // Create payment record in database
    const payment = await db.payment.create({
      data: {
        userId: currentUser.id,
        appointmentId,
        stripePaymentId: paymentIntent.id,
        amount: Math.round(amount * 100), // Store in cents
        kind: "ONEOFF",
        status: "PENDING",
      },
    });

    logger.info("Payment intent created", {
      paymentIntentId: paymentIntent.id,
      appointmentId,
      userId: currentUser.id,
      amount,
      idempotencyKey,
    });

    return NextResponse.json({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      status: "created",
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
      },
    });
  } catch (error) {
    logger.error("Failed to create payment intent", error as Error);

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
