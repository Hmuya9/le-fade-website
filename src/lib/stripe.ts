import Stripe from 'stripe'
import { env } from './env'
import { logger } from './logger'

// Create Stripe instance with proper error handling
export const stripe = env.enableStripe 
  ? new Stripe(env.stripeSecretKey, {
      apiVersion: '2025-08-27.basil',
    })
  : null

// Helper to check if Stripe is available
export const isStripeEnabled = () => {
  return env.enableStripe && stripe !== null
}

// Safe Stripe operations with fallbacks
export const safeStripeOperation = async <T>(
  operation: (stripe: Stripe) => Promise<T>,
  fallback?: T
): Promise<T | null> => {
  if (!isStripeEnabled()) {
    logger.warn('Stripe operation attempted but Stripe is not enabled')
    return fallback || null
  }

  try {
    return await operation(stripe!)
  } catch (error) {
    logger.error('Stripe operation failed', error as Error)
    return fallback || null
  }
}

export const formatAmountForDisplay = (amount: number, currency: string): string => {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  return numberFormat.format(amount)
}

export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100)
}


