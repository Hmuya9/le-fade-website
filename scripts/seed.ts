import { PrismaClient } from "@prisma/client";
import { logger } from "../src/lib/logger";

const prisma = new PrismaClient();

async function main() {
  logger.info("Starting database seed...");

  // Create sample plans
  const standardPlan = await prisma.plan.upsert({
    where: { id: "standard" },
    update: {},
    create: {
      id: "standard",
      name: "Standard",
      priceMonthly: 3999, // $39.99
      cutsPerMonth: 2,
      isHome: false,
      stripePriceId: "price_standard_dev",
    },
  });

  const deluxePlan = await prisma.plan.upsert({
    where: { id: "deluxe" },
    update: {},
    create: {
      id: "deluxe",
      name: "Deluxe",
      priceMonthly: 6000, // $60.00
      cutsPerMonth: 2,
      isHome: true,
      stripePriceId: "price_deluxe_dev",
    },
  });

  logger.info("Created plans", { standardPlan, deluxePlan });

  // Create sample barbers
  const barber1 = await prisma.user.upsert({
    where: { email: "mike@lefade.com" },
    update: {},
    create: {
      email: "mike@lefade.com",
      name: "Mike Johnson",
      phone: "+1234567890",
      role: "BARBER",
      clerkId: "clerk_barber_mike",
    },
  });

  const barber2 = await prisma.user.upsert({
    where: { email: "alex@lefade.com" },
    update: {},
    create: {
      email: "alex@lefade.com",
      name: "Alex Rodriguez",
      phone: "+1234567891",
      role: "BARBER",
      clerkId: "clerk_barber_alex",
    },
  });

  // Create sample client
  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      name: "John Doe",
      phone: "+1234567892",
      role: "CLIENT",
      clerkId: "clerk_client_john",
    },
  });

  // Create owner/admin
  const owner = await prisma.user.upsert({
    where: { email: "admin@lefade.com" },
    update: {},
    create: {
      email: "admin@lefade.com",
      name: "Admin User",
      phone: "+1234567893",
      role: "OWNER",
      clerkId: "clerk_owner_admin",
    },
  });

  logger.info("Created users", { barber1, barber2, client, owner });

  // Create availability for barbers
  const days = [1, 2, 3, 4, 5]; // Monday to Friday
  const startTime = "09:00";
  const endTime = "17:00";

  for (const barber of [barber1, barber2]) {
    for (const dayOfWeek of days) {
      await prisma.availability.upsert({
        where: {
          barberId_dayOfWeek: {
            barberId: barber.id,
            dayOfWeek,
          },
        },
        update: {},
        create: {
          barberId: barber.id,
          dayOfWeek,
          startTime,
          endTime,
          isActive: true,
        },
      });
    }
  }

  logger.info("Created availability schedules");

  // Create sample subscription
  const subscription = await prisma.subscription.upsert({
    where: { id: "sub_sample" },
    update: {},
    create: {
      id: "sub_sample",
      userId: client.id,
      planId: standardPlan.id,
      status: "ACTIVE",
      startDate: new Date(),
      renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      stripeSubId: "sub_sample_dev",
    },
  });

  logger.info("Created subscription", { subscription });

  // Create sample appointment
  const appointment = await prisma.appointment.create({
    data: {
      clientId: client.id,
      barberId: barber1.id,
      type: "SHOP",
      startAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      endAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 30 minutes later
      status: "BOOKED",
      notes: "Regular haircut",
    },
  });

  logger.info("Created appointment", { appointment });

  // Create sample review
  const review = await prisma.review.create({
    data: {
      userId: client.id,
      appointmentId: appointment.id,
      rating: 5,
      comment: "Great haircut! Mike was professional and efficient.",
      isModerated: true,
    },
  });

  logger.info("Created review", { review });

  // Create sample payment
  const payment = await prisma.payment.create({
    data: {
      userId: client.id,
      appointmentId: appointment.id,
      stripePaymentId: "pi_sample_dev",
      amount: 3999, // $39.99
      kind: "ONEOFF",
      status: "COMPLETED",
    },
  });

  logger.info("Created payment", { payment });

  logger.info("Database seed completed successfully!");
}

main()
  .catch((e) => {
    logger.error("Database seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
