export const PLANS = [
  {
    id: "standard",
    name: "Standard",
    priceMonthlyCents: 3999,
    bullets: [
      "2 cuts/month at the shop",
      "First cut free",
      "Priority scheduling",
    ],
    isHome: false,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD ?? "",
  },
  {
    id: "deluxe",
    name: "Deluxe",
    priceMonthlyCents: 6000,
    bullets: [
      "2 cuts/month at your place",
      "Travel included",
      "First cut free",
    ],
    isHome: true,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_DELUXE ?? "",
  },
] as const;

export type Plan = typeof PLANS[number];
