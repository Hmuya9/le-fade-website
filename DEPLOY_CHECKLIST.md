# Le Fade - Deployment Checklist

## Pre-Deployment Setup

### Environment Variables (Required in Vercel)
```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe Payments
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_STANDARD=price_...
NEXT_PUBLIC_STRIPE_PRICE_DELUXE=price_...

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### Database Setup
1. **Create PostgreSQL database** (Vercel Postgres, Supabase, or Railway)
2. **Run Prisma migrations**:
   ```bash
   npx prisma migrate deploy
   ```
3. **Seed initial data** (optional):
   ```bash
   npm run seed
   ```

## Vercel Deployment Steps

### 1. Connect Repository
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Select the `web` folder as the root directory

### 2. Configure Build Settings
- **Framework Preset**: Next.js
- **Root Directory**: `web`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3. Environment Variables
Add all required environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add each variable for Production, Preview, and Development

### 4. Deploy
- Click "Deploy" button
- Vercel will automatically:
  - Install dependencies
  - Generate Prisma client
  - Build the Next.js application
  - Deploy to global CDN

## Post-Deployment Verification

### 1. Basic Functionality
- [ ] Landing page loads correctly
- [ ] Plans page displays pricing cards
- [ ] Booking form is functional
- [ ] Navigation works on all pages

### 2. Authentication (Clerk)
- [ ] Sign up flow works
- [ ] Sign in flow works
- [ ] Protected routes redirect properly
- [ ] User profile displays correctly

### 3. Database Operations
- [ ] User registration creates database records
- [ ] Booking creation works
- [ ] Admin dashboard loads metrics
- [ ] Barber dashboard displays appointments

### 4. Payment Integration (Stripe)
- [ ] Payment intent creation works
- [ ] Webhook processing functions
- [ ] Subscription creation succeeds
- [ ] Payment confirmation updates database

### 5. API Endpoints
- [ ] `/api/v1/bookings` - Create bookings
- [ ] `/api/v1/payments/intent` - Create payment intents
- [ ] `/api/webhooks/stripe` - Process webhooks
- [ ] `/api/admin/metrics` - Admin metrics
- [ ] `/api/admin/seed-role` - Role seeding (dev only)

### 6. SEO & Performance
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Meta tags display correctly
- [ ] Page load times < 3 seconds
- [ ] Mobile responsive design

## Monitoring & Maintenance

### 1. Error Tracking
- Monitor Vercel function logs
- Check browser console for client-side errors
- Review database connection issues

### 2. Performance Monitoring
- Use Vercel Analytics for page views
- Monitor API response times
- Track database query performance

### 3. Security
- Regularly update dependencies
- Monitor for security vulnerabilities
- Review access logs for suspicious activity

## Troubleshooting

### Common Issues

#### Build Failures
- **Prisma Client Generation**: Ensure `DATABASE_URL` is set
- **TypeScript Errors**: Check for missing type definitions
- **ESLint Errors**: Review linting configuration

#### Runtime Errors
- **Database Connection**: Verify `DATABASE_URL` format
- **Clerk Authentication**: Check API keys are correct
- **Stripe Integration**: Verify webhook endpoint configuration

#### Performance Issues
- **Slow Page Loads**: Check image optimization
- **API Timeouts**: Review database query performance
- **Memory Usage**: Monitor Vercel function limits

## Rollback Plan

### If Deployment Fails
1. **Revert to Previous Commit**:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Database Rollback** (if needed):
   ```bash
   npx prisma migrate reset
   npx prisma migrate deploy
   ```

3. **Environment Variable Rollback**:
   - Update Vercel environment variables
   - Redeploy with previous configuration

## Success Criteria

### ✅ Deployment Complete When:
- [ ] All pages load without errors
- [ ] Authentication flow works end-to-end
- [ ] Database operations function correctly
- [ ] Payment processing is operational
- [ ] Mobile experience is smooth
- [ ] SEO elements are properly configured
- [ ] Performance metrics meet targets

### 🎯 Performance Targets
- **Page Load Time**: < 3 seconds
- **Time to Interactive**: < 5 seconds
- **Lighthouse Score**: > 80 (Performance)
- **Accessibility Score**: > 90
- **SEO Score**: > 90

## Next Steps After Deployment

1. **Set up monitoring** (Sentry, LogRocket, etc.)
2. **Configure analytics** (Google Analytics, Vercel Analytics)
3. **Set up backups** (Database backups, code backups)
4. **Plan scaling** (CDN, database optimization)
5. **User testing** (Beta user feedback, A/B testing)

---

**Deployment Date**: ___________
**Deployed By**: ___________
**Version**: ___________
**Status**: ___________
