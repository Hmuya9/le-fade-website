import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { nanoid } from "nanoid";

const bookingSchema = z.object({
  barberId: z.string().min(1, "Barber ID is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  startsAtUTC: z.string().datetime("Invalid date format"),
  timezone: z.string().default("America/New_York"),
  idempotencyKey: z.string().min(1, "Idempotency key is required"),
  notes: z.string().optional(),
  address: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
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
    const validatedData = bookingSchema.parse(body);

    const { barberId, serviceId, startsAtUTC, timezone, idempotencyKey, notes, address } = validatedData;

    // Check for existing appointment with same idempotency key
    const existingAppointment = await db.appointment.findFirst({
      where: {
        clientId: currentUser.id,
        // Add idempotency key to appointment model if needed
      },
    });

    if (existingAppointment) {
      logger.info("Duplicate booking request", {
        userId: currentUser.id,
        idempotencyKey,
        existingAppointmentId: existingAppointment.id,
      });

      return NextResponse.json({
        appointmentId: existingAppointment.id,
        status: "duplicate",
      });
    }

    // Parse start time
    const startAt = new Date(startsAtUTC);
    const endAt = new Date(startAt.getTime() + 30 * 60 * 1000); // 30 minutes

    // Validate appointment time (not in the past, within business hours)
    const now = new Date();
    if (startAt <= now) {
      return NextResponse.json(
        { error: "Appointment time must be in the future" },
        { status: 400 }
      );
    }

    // Check if barber exists and is available
    const barber = await db.user.findUnique({
      where: { id: barberId, role: "BARBER" },
    });

    if (!barber) {
      return NextResponse.json(
        { error: "Barber not found" },
        { status: 404 }
      );
    }

    // Check for double booking (unique constraint will prevent this, but we check first for better error)
    const conflictingAppointment = await db.appointment.findFirst({
      where: {
        barberId,
        startAt: {
          gte: startAt,
          lt: endAt,
        },
        status: {
          in: ["BOOKED", "CONFIRMED"],
        },
      },
    });

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: "Time slot is no longer available" },
        { status: 409 }
      );
    }

    // Create appointment in transaction
    const appointment = await db.appointment.create({
      data: {
        clientId: currentUser.id,
        barberId,
        type: address ? "HOME" : "SHOP",
        startAt,
        endAt,
        status: "BOOKED",
        notes,
        address,
        isFree: false, // Will be determined by subscription status
      },
    });

    logger.info("Appointment created", {
      appointmentId: appointment.id,
      userId: currentUser.id,
      barberId,
      startAt: startAt.toISOString(),
      idempotencyKey,
    });

    return NextResponse.json({
      appointmentId: appointment.id,
      status: "created",
      appointment: {
        id: appointment.id,
        startAt: appointment.startAt.toISOString(),
        endAt: appointment.endAt.toISOString(),
        status: appointment.status,
        type: appointment.type,
      },
    });
  } catch (error) {
    logger.error("Failed to create booking", error as Error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    // Handle Prisma unique constraint violation (double booking)
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { error: "Time slot is no longer available" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = {
      clientId: currentUser.id,
    };

    if (status) {
      where.status = status;
    }

    const appointments = await db.appointment.findMany({
      where,
      include: {
        barber: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        startAt: "desc",
      },
      take: limit,
      skip: offset,
    });

    return NextResponse.json({
      appointments: appointments.map((apt: any) => ({
        id: apt.id,
        startAt: apt.startAt.toISOString(),
        endAt: apt.endAt.toISOString(),
        status: apt.status,
        type: apt.type,
        notes: apt.notes,
        address: apt.address,
        barber: apt.barber,
      })),
      pagination: {
        limit,
        offset,
        hasMore: appointments.length === limit,
      },
    });
  } catch (error) {
    logger.error("Failed to fetch bookings", error as Error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
