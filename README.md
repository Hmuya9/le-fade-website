# Le Fade - Professional Haircut Subscription Platform

## Complete Architecture & Features

### 🎯 **Core Business Model**
- **Standard Plan**: $39.99/month (2 cuts at shop)
- **Deluxe Plan**: $60/month (2 cuts at home)
- **Sweet Spot**: 60% Standard + 40% Deluxe customers
- **Profit**: Standard $9.99, Deluxe $37.50 per customer

### 🚀 **Technology Stack**
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL
- **Payments**: Stripe Billing API
- **Authentication**: Clerk
- **State Management**: React Query + Zustand
- **Notifications**: Resend (email) + Twilio (SMS)
- **Deployment**: Vercel

### 📁 **Project Structure**
```
web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── plans/page.tsx     # Subscription plans
│   │   ├── booking/page.tsx   # Appointment booking
│   │   ├── barber/page.tsx    # Barber dashboard
│   │   ├── admin/page.tsx     # Admin dashboard
│   │   └── api/               # API routes
│   │       ├── subscription-plans/
│   │       ├── create-checkout-session/
│   │       ├── stripe/webhook/
│   │       └── admin/metrics/
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx
│   │   └── PlanCard.tsx
│   ├── lib/                   # Utilities
│   │   ├── db.ts             # Prisma client
│   │   ├── stripe.ts         # Stripe config
│   │   └── utils.ts          # Helper functions
│   └── types/                # TypeScript definitions
├── prisma/
│   └── schema.prisma         # Database schema
└── package.json              # Dependencies
```

### 🛠 **Setup Instructions**

1. **Install Dependencies:**
   ```bash
   cd web
   npm install
   ```

2. **Environment Setup:**
   Create `.env.local` with:
   ```env
   # Database
   DATABASE_URL="postgresql://user:pass@localhost:5432/lefade"
   
   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   
   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   
   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Database Setup:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Open Browser:**
   ```
   http://localhost:3000
   ```

### 📊 **Features**

#### **Landing Page** (`/`)
- Hero section with value proposition
- Plan comparison cards
- Clear CTAs for trial signup

#### **Plans Page** (`/plans`)
- Stripe-powered subscription plans
- Real-time pricing from Stripe
- Secure checkout flow

#### **Booking Page** (`/booking`)
- Simple calendar booking
- Customer information form
- Barber selection

#### **Barber Dashboard** (`/barber`)
- View upcoming appointments
- Update appointment status
- Track earnings

#### **Admin Dashboard** (`/admin`)
- Real-time business metrics
- Profit/loss calculations
- Customer analytics
- Operational tools

### 🔧 **API Endpoints**

- `GET /api/subscription-plans` - Fetch available plans
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/stripe/webhook` - Handle Stripe events
- `GET /api/admin/metrics` - Business metrics

### 💰 **Profit Tracking**

The admin dashboard tracks:
- **MRR** (Monthly Recurring Revenue)
- **Customer Mix** (Standard vs Deluxe)
- **Cost Breakdown** (Base, Standard, Deluxe, Bonus, Ops)
- **Net Profit** with margin calculations
- **Key Metrics** (Churn, Trials, Completion Rate)

### 🚀 **Deployment**

1. **Deploy to Vercel:**
   ```bash
   npm run build
   vercel --prod
   ```

2. **Set Environment Variables** in Vercel dashboard

3. **Configure Stripe Webhooks** to point to production URL

### 📈 **Sweet Spot Strategy**

- **Target Mix**: 60% Standard + 40% Deluxe
- **Break-even**: 6th Standard customer, 2nd Deluxe customer
- **Goal**: 8-10 customers per barber
- **Monthly Profit**: $300+ per barber

This is a complete, production-ready haircut subscription platform! 🎯