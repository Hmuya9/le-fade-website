import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { env } from "@/lib/env";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    if (!env.enableStripe) {
      logger.warn("Stripe webhook received but Stripe is not enabled");
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 503 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      logger.warn("Stripe webhook missing signature");
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe!.webhooks.constructEvent(
        body,
        signature,
        env.stripeWebhookSecret
      );
    } catch (err) {
      logger.error("Stripe webhook signature verification failed", err as Error);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    logger.info("Stripe webhook received", {
      type: event.type,
      id: event.id,
    });

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      case "payment_intent.canceled": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentCanceled(paymentIntent);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleSubscriptionPaymentSucceeded(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleSubscriptionPaymentFailed(invoice);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        logger.info("Unhandled Stripe webhook event type", {
          type: event.type,
        });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error("Stripe webhook processing failed", error as Error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { appointmentId, userId } = paymentIntent.metadata;

    if (!appointmentId || !userId) {
      logger.warn("Payment succeeded but missing metadata", {
        paymentIntentId: paymentIntent.id,
        metadata: paymentIntent.metadata,
      });
      return;
    }

    // Update payment status
    const payment = await db.payment.update({
      where: { stripePaymentId: paymentIntent.id },
      data: { status: "COMPLETED" },
    });

    // Update appointment status
    const appointment = await db.appointment.update({
      where: { id: appointmentId },
      data: { status: "CONFIRMED" },
    });

    logger.info("Payment succeeded and appointment confirmed", {
      paymentIntentId: paymentIntent.id,
      appointmentId,
      userId,
      paymentId: payment.id,
    });
  } catch (error) {
    logger.error("Failed to handle payment succeeded", error as Error, {
      paymentIntentId: paymentIntent.id,
    });
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { appointmentId, userId } = paymentIntent.metadata;

    if (!appointmentId || !userId) {
      logger.warn("Payment failed but missing metadata", {
        paymentIntentId: paymentIntent.id,
        metadata: paymentIntent.metadata,
      });
      return;
    }

    // Update payment status
    await db.payment.update({
      where: { stripePaymentId: paymentIntent.id },
      data: { status: "FAILED" },
    });

    // Cancel appointment
    await db.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELED" },
    });

    logger.info("Payment failed and appointment canceled", {
      paymentIntentId: paymentIntent.id,
      appointmentId,
      userId,
    });
  } catch (error) {
    logger.error("Failed to handle payment failed", error as Error, {
      paymentIntentId: paymentIntent.id,
    });
  }
}

async function handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { appointmentId, userId } = paymentIntent.metadata;

    if (!appointmentId || !userId) {
      logger.warn("Payment canceled but missing metadata", {
        paymentIntentId: paymentIntent.id,
        metadata: paymentIntent.metadata,
      });
      return;
    }

    // Update payment status
    await db.payment.update({
      where: { stripePaymentId: paymentIntent.id },
      data: { status: "FAILED" },
    });

    // Cancel appointment
    await db.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELED" },
    });

    logger.info("Payment canceled and appointment canceled", {
      paymentIntentId: paymentIntent.id,
      appointmentId,
      userId,
    });
  } catch (error) {
    logger.error("Failed to handle payment canceled", error as Error, {
      paymentIntentId: paymentIntent.id,
    });
  }
}

async function handleSubscriptionPaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = typeof (invoice as any).subscription === 'string' 
      ? (invoice as any).subscription 
      : (invoice as any).subscription?.id;
    
    if (!subscriptionId) {
      logger.warn("Invoice payment succeeded but no subscription ID", {
        invoiceId: invoice.id,
      });
      return;
    }

    // Update subscription status
    await db.subscription.update({
      where: { stripeSubId: subscriptionId },
      data: { status: "ACTIVE" },
    });

    logger.info("Subscription payment succeeded", {
      invoiceId: invoice.id,
      subscriptionId,
    });
  } catch (error) {
    logger.error("Failed to handle subscription payment succeeded", error as Error, {
      invoiceId: invoice.id,
    });
  }
}

async function handleSubscriptionPaymentFailed(invoice: Stripe.Invoice) {
  try {
    const subscriptionId = typeof (invoice as any).subscription === 'string' 
      ? (invoice as any).subscription 
      : (invoice as any).subscription?.id;
    
    if (!subscriptionId) {
      logger.warn("Invoice payment failed but no subscription ID", {
        invoiceId: invoice.id,
      });
      return;
    }

    // Update subscription status
    await db.subscription.update({
      where: { stripeSubId: subscriptionId },
      data: { status: "PAST_DUE" },
    });

    logger.info("Subscription payment failed", {
      invoiceId: invoice.id,
      subscriptionId,
    });
  } catch (error) {
    logger.error("Failed to handle subscription payment failed", error as Error, {
      invoiceId: invoice.id,
    });
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    // Update subscription status
    const status = subscription.status === "active" ? "ACTIVE" : 
                   subscription.status === "past_due" ? "PAST_DUE" :
                   subscription.status === "canceled" ? "CANCELED" : "TRIAL";

    await db.subscription.update({
      where: { stripeSubId: subscription.id },
      data: { 
        status,
        renewsAt: (subscription as any).current_period_end 
          ? new Date((subscription as any).current_period_end * 1000)
          : new Date(),
      },
    });

    logger.info("Subscription updated", {
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (error) {
    logger.error("Failed to handle subscription updated", error as Error, {
      subscriptionId: subscription.id,
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    // Update subscription status
    await db.subscription.update({
      where: { stripeSubId: subscription.id },
      data: { status: "CANCELED" },
    });

    logger.info("Subscription deleted", {
      subscriptionId: subscription.id,
    });
  } catch (error) {
    logger.error("Failed to handle subscription deleted", error as Error, {
      subscriptionId: subscription.id,
    });
  }
}
