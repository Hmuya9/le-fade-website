"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PlanCard } from "@/components/PlanCard";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscription-plans")
      .then(res => res.json())
      .then(data => {
        setPlans(data);
        setLoading(false);
      });
  }, []);

  const handleSubscribe = async (priceId: string) => {
    const stripe = await stripePromise;
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Choose Your Plan
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <div className="text-4xl font-bold mb-6">
                ${(plan.price / 100).toFixed(2)} / {plan.interval}
              </div>
              <button
                onClick={() => handleSubscribe(plan.id)}
                className="w-full rounded-xl px-6 py-4 bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Want to try before you subscribe?
          </p>
          <a 
            href="/booking"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Book a free test cut →
          </a>
        </div>
      </div>
    </div>
  );
}