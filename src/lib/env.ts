export const env = {
  // App configuration
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV || "development",
  
  // External services
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  
  // Stripe configuration
  stripeStandard: process.env.NEXT_PUBLIC_STRIPE_PRICE_STANDARD || "",
  stripeDeluxe: process.env.NEXT_PUBLIC_STRIPE_PRICE_DELUXE || "",
  linkStandard: process.env.NEXT_PUBLIC_STRIPE_LINK_STANDARD || "",
  linkDeluxe: process.env.NEXT_PUBLIC_STRIPE_LINK_DELUXE || "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  
  // Database
  databaseUrl: process.env.DATABASE_URL || "",
  
  // Clerk authentication
  clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
  clerkSecretKey: process.env.CLERK_SECRET_KEY || "",
  
  // Redis (optional)
  redisUrl: process.env.REDIS_URL || "",
  
  // Feature flags
  enableRedis: !!process.env.REDIS_URL,
  enableStripe: !!process.env.STRIPE_SECRET_KEY,
  enableDatabase: !!process.env.DATABASE_URL,
  enableClerk: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
};

