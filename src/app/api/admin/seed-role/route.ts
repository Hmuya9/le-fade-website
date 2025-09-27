import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { z } from "zod";

const seedRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["CLIENT", "BARBER", "OWNER"]),
});

export async function POST(request: NextRequest) {
  try {
    // Only allow in development
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        { error: "This endpoint is only available in development" },
        { status: 403 }
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

    // Parse request body
    const body = await request.json();
    const { userId, role } = seedRoleSchema.parse(body);

    // Update user role
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { role },
    });

    logger.info("User role updated", {
      userId,
      newRole: role,
      updatedBy: currentUser.id,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        role: updatedUser.role,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    logger.error("Failed to seed user role", error as Error);

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
