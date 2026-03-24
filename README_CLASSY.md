# Classy Car Rentals

A premium, high-performance car rental marketplace built with **Next.js 14 (App Router)**, **Tailwind CSS**, **TypeScript**, and **Supabase**. Features instant booking, M-Pesa/card payments via IntaSend, and a sleek dark-mode UI.

## 🚀 Features

- **Hero Section & Search**: Location, pickup/return date filtering
- **Car Listings**: Dynamic grid with price filtering and specs
- **Car Details**: Image gallery, full specifications, and instant booking
- **Booking System**: Date-range picker, automatic price calculation, double-booking prevention
- **Payment Integration**: M-Pesa and card payments via IntaSend
- **Webhook Handling**: Real-time payment verification and status updates
- **Admin Dashboard**: Add/edit vehicles, view recent bookings
- **Responsive Design**: Mobile-first, optimized for all devices
- **Dark Theme**: Premium high-contrast aesthetic with accent colors (#c9ff5c, #50dfff)

## 📋 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Payments**: IntaSend (M-Pesa, Card)
- **Deployment**: Railway

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available)
- IntaSend account (for payments)
- Railway account (for deployment)

### 2. Clone & Install

```bash
cd classycar
npm install
```

### 3. Environment Setup

Follow the **ENV_SETUP.md** guide to configure:
- `DATABASE_URL` (Supabase PostgreSQL)
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `INTASEND_PUBLISHABLE_KEY`, `INTASEND_SECRET_KEY`, `INTASEND_WEBHOOK_SECRET`

Create a `.env` file:
```bash
cp ENV_SETUP.md .env  # Then edit with your actual keys
```

### 4. Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# (Optional) Seed sample data
npx prisma db seed
```

### 5. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see the home page.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page (hero + featured cars)
│   ├── cars/
│   │   ├── page.tsx                # Car listings with filters
│   │   └── [id]/
│   │       └── page.tsx            # Car detail page with booking form
│   ├── checkout/
│   │   └── [id]/
│   │       └── page.tsx            # Payment checkout page
│   ├── payment-success/
│   │   └── [id]/
│   │       └── page.tsx            # Payment confirmation
│   ├── admin/
│   │   └── page.tsx                # Admin dashboard (vehicles & bookings)
│   ├── api/
│   │   ├── bookings/
│   │   │   └── route.ts            # POST/GET bookings
│   │   ├── payments/
│   │   │   └── intasend/
│   │   │       └── route.ts        # IntaSend payment initiation
│   │   └── webhooks/
│   │       └── intasend/
│   │           └── route.ts        # Payment webhook verification
│   ├── layout.tsx                  # Root layout with theme
│   └── globals.css                 # Global styles & dark theme
├── generated/
│   └── prisma/                     # Auto-generated Prisma client
└── ...

prisma/
├── schema.prisma                   # Database schema (Car, Booking models)
└── migrations/                     # Database migration files
```

## 🔑 Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page with hero and featured cars |
| `/cars` | Browse all available cars with filters |
| `/cars/[id]` | Car detail page with booking form |
| `/checkout/[id]` | Payment checkout for a booking |
| `/payment-success/[id]` | Confirmation after successful payment |
| `/admin` | Admin dashboard (vehicles & bookings) |
| `/api/bookings` | Create/fetch bookings |
| `/api/payments/intasend` | Initiate IntaSend payment |
| `/api/webhooks/intasend` | Receive payment status updates |

## 💳 Payment Flow

1. User selects car and dates → **Booking created** (PENDING status)
2. User proceeds to checkout → **Payment form** (M-Pesa or Card)
3. IntaSend processes payment → **Webhook callback** to verify
4. Status updated to PAID → **Confirmation email** sent
5. User receives pickup details 24h before rental

## 🗄️ Database Schema

### Car Model
```prisma
- id (Int, PK)
- make, model, year
- pricePerDay (Int, in KES)
- transmission, fuelType
- seats (Int)
- imageUrls (String[])
- isAvailable (Boolean)
- createdAt, updatedAt
- bookings (Booking[])
```

### Booking Model
```prisma
- id (Int, PK)
- carId (Int, FK → Car)
- userEmail (String)
- startDate, endDate (DateTime)
- totalAmount (Int, in KES)
- status (PENDING | PAID | CANCELLED)
- intaSendRef (String, optional)
- createdAt, updatedAt
```

## 🚀 Deployment (Railway)

1. Push code to GitHub
2. Create a new Railway project
3. Add PostgreSQL service (Supabase connection)
4. Set environment variables from `railway.json`
5. Deploy via Railway dashboard

See `railway.json` for service configuration.

## 📝 Admin Features

- **Add/Edit Vehicles**: Form to manage car inventory
- **View Bookings**: Table of recent bookings with status
- **Filter & Search**: By date, status, email
- **Booking Status**: PENDING, PAID, CANCELLED

## 🔐 Security Notes

- Never commit `.env` files
- IntaSend webhook signatures are verified
- Supabase RLS policies should be configured for production
- Admin routes should require authentication (implement via Supabase Auth)

## 🐛 Troubleshooting

**Database connection fails**
- Verify `DATABASE_URL` format
- Check Supabase IP whitelist (Settings > Database)

**IntaSend payments not working**
- Confirm `INTASEND_PUBLISHABLE_KEY` and `INTASEND_SECRET_KEY`
- Test webhook URL is publicly accessible
- Check IntaSend dashboard for failed requests

**Prisma client not found**
- Run `npx prisma generate`
- Clear `.next` folder and rebuild

## 📚 Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Next.js Docs](https://nextjs.org/docs)
- [IntaSend Docs](https://intasend.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

**Built with ❤️ for the Kenyan car rental market.**
