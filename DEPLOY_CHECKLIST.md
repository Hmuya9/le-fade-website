# Le Fade - Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables
Create `.env.local` with the following variables:

```bash
# Required for production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
DATABASE_URL=postgresql://user:password@host:port/database

# Stripe Configuration (Required for payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_STANDARD=price_...
NEXT_PUBLIC_STRIPE_PRICE_DELUXE=price_...

# Fallback Payment Links (Optional)
NEXT_PUBLIC_STRIPE_LINK_STANDARD=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_LINK_DELUXE=https://buy.stripe.com/...

# External Services (Optional)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
```

### 2. Database Setup
- [ ] PostgreSQL database provisioned
- [ ] Database migrations run (`npx prisma migrate deploy`)
- [ ] Database connection tested
- [ ] Backup strategy configured

### 3. Stripe Configuration
- [ ] Stripe account set to live mode
- [ ] Products and prices created in Stripe dashboard
- [ ] Webhook endpoint configured: `https://your-domain.com/api/stripe/webhook`
- [ ] Webhook events enabled:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

### 4. Domain & SSL
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] DNS records pointing to hosting provider

## Vercel Deployment

### 1. Build Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### 2. Environment Variables in Vercel
- [ ] All environment variables added to Vercel dashboard
- [ ] Environment variables marked as "Production"
- [ ] Sensitive variables marked as "Encrypted"

### 3. Build Configuration
- [ ] Node.js version: 18.x or higher
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Install command: `npm install`

## Post-Deployment Verification

### 1. Smoke Tests
Run the following tests after deployment:

```bash
# Test homepage loads
curl -I https://your-domain.com

# Test plans page loads
curl -I https://your-domain.com/plans

# Test booking page loads
curl -I https://your-domain.com/booking

# Test admin dashboard loads
curl -I https://your-domain.com/admin

# Test barber dashboard loads
curl -I https://your-domain.com/barber
```

### 2. Functional Tests
- [ ] Homepage displays correctly
- [ ] Plans page shows Standard ($39.99) and Deluxe ($60) plans
- [ ] Booking form validates input correctly
- [ ] Payment flow works (test with Stripe test mode first)
- [ ] Admin dashboard loads metrics
- [ ] Barber dashboard displays appointments
- [ ] Mobile responsive design works
- [ ] All links and navigation work

### 3. Performance Tests
- [ ] Lighthouse audit: Performance ≥ 80
- [ ] Lighthouse audit: Accessibility ≥ 90
- [ ] Page load times < 3 seconds
- [ ] Mobile performance acceptable

### 4. Security Tests
- [ ] HTTPS enforced
- [ ] No sensitive data in client-side code
- [ ] API routes protected with rate limiting
- [ ] Error messages don't leak sensitive information

## Monitoring Setup

### 1. Error Tracking
- [ ] Sentry or similar error tracking service configured
- [ ] Error alerts set up
- [ ] Performance monitoring enabled

### 2. Analytics
- [ ] Google Analytics or similar configured
- [ ] Conversion tracking set up
- [ ] User behavior monitoring

### 3. Uptime Monitoring
- [ ] Uptime monitoring service configured
- [ ] Alert thresholds set (99% uptime target)
- [ ] Response time monitoring

## Rollback Plan

### 1. Database Rollback
```bash
# If database issues occur
npx prisma migrate reset
npx prisma migrate deploy
```

### 2. Code Rollback
- [ ] Previous deployment tagged in Vercel
- [ ] Rollback procedure documented
- [ ] Team trained on rollback process

## Go-Live Checklist

### Final Verification
- [ ] All smoke tests pass
- [ ] Payment processing works
- [ ] Email notifications work
- [ ] Admin functions work
- [ ] Barber functions work
- [ ] Mobile experience verified
- [ ] Performance benchmarks met
- [ ] Security scan completed
- [ ] Team notified of go-live
- [ ] Customer support ready
- [ ] Monitoring alerts configured

### Post-Launch
- [ ] Monitor error rates for 24 hours
- [ ] Check payment processing
- [ ] Verify customer signups
- [ ] Monitor performance metrics
- [ ] Collect user feedback
- [ ] Document any issues

## Emergency Contacts

- **Technical Lead**: [Name] - [Phone] - [Email]
- **Stripe Support**: [Contact Info]
- **Hosting Provider**: [Contact Info]
- **Domain Registrar**: [Contact Info]

## Success Criteria

- [ ] Zero critical errors in first 24 hours
- [ ] Payment processing success rate > 95%
- [ ] Page load times < 3 seconds
- [ ] Mobile usability score > 90
- [ ] Customer signup flow works end-to-end

---

**Deployment Date**: ___________  
**Deployed By**: ___________  
**Verified By**: ___________  
**Status**: ___________ (Ready/In Progress/Complete)
