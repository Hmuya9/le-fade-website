import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  // Check if Stripe is properly configured
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 501 }
    )
  }

  try {
    const { priceId } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/plans?canceled=true`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
