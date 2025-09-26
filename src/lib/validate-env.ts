import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_CALENDLY_URL: z.string().url().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_STANDARD: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PRICE_DELUXE: z.string().optional(),
  NEXT_PUBLIC_STRIPE_LINK_STANDARD: z.string().url().optional(),
  NEXT_PUBLIC_STRIPE_LINK_DELUXE: z.string().url().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  DATABASE_URL: z.string().url().optional(),
})

export function validateEnv() {
  try {
    const env = envSchema.parse(process.env)
    
    // Warn about missing critical env vars in development
    if (process.env.NODE_ENV === "development") {
      const warnings: string[] = []
      
      if (!env.STRIPE_SECRET_KEY) {
        warnings.push("STRIPE_SECRET_KEY is missing - Stripe features will be disabled")
      }
      
      if (!env.STRIPE_WEBHOOK_SECRET) {
        warnings.push("STRIPE_WEBHOOK_SECRET is missing - Webhooks will be disabled")
      }
      
      if (!env.DATABASE_URL) {
        warnings.push("DATABASE_URL is missing - Database features will be disabled")
      }
      
      if (warnings.length > 0) {
        console.warn("⚠️ Environment Configuration Warnings:")
        warnings.forEach(warning => console.warn(`  - ${warning}`))
      }
    }
    
    return env
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Environment validation failed:")
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`)
      })
    }
    
    // In production, we should fail fast
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment configuration")
    }
    
    // In development, return partial env with warnings
    return process.env as any
  }
}

export const env = validateEnv()
