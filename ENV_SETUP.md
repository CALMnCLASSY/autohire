# Environment Setup Guide for Classy Car Rentals

This guide walks you through setting up all required environment variables and external services for the Classy Car Rentals platform.

## 1. Database Setup (Supabase PostgreSQL)

### Steps:
1. Go to [Supabase](https://supabase.com) and create a new project
2. Choose a region (preferably closest to Kenya for latency)
3. Once created, navigate to **Settings > Database > Connection pooling**
4. Copy both connection strings:
   - **Pooler mode** (for app connections) → `DATABASE_URL`
   - **Direct connection** (for migrations) → `DIRECT_URL`

### Configuration:
In your `.env.local` file, set both URLs:
```
# Connection pooling (for application queries)
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (for Prisma migrations)
DIRECT_URL="postgresql://postgres.[project-id]:[password]@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
```

Replace `[project-id]` and `[password]` with your actual Supabase credentials.

### Verify:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 2. Supabase Authentication Setup

### Steps:
1. In your Supabase project, go to **Authentication > Providers**
2. Enable **Email/Password** provider (default)
3. Navigate to **Settings > API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role secret** key → `SUPABASE_SERVICE_ROLE_KEY`

### Add to `.env`:
```
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 3. IntaSend Payment Gateway Setup

### Steps:
1. Sign up at [IntaSend](https://intasend.com)
2. Complete KYC verification
3. Navigate to **Settings > API Keys**
4. Copy:
   - **Publishable Key** → `INTASEND_PUBLISHABLE_KEY`
   - **Secret Key** → `INTASEND_SECRET_KEY`

### Add to `.env`:
```
INTASEND_PUBLISHABLE_KEY="pk_live_..."
INTASEND_SECRET_KEY="sk_live_..."
```

### Webhook Setup:
1. In IntaSend dashboard, go to **Webhooks**
2. Add a new webhook with URL: `https://your-domain.com/api/webhooks/intasend`
3. Select events: **payment.success**, **payment.failed**
4. Copy the **Webhook Secret** → `INTASEND_WEBHOOK_SECRET`

### Add to `.env`:
```
INTASEND_WEBHOOK_SECRET="whsec_..."
```

---

## 4. Admin User Setup

### Steps:
1. After deploying, manually create an admin user in Supabase:
   - Go to **Authentication > Users**
   - Click **Add user**
   - Enter email and password
2. In the database, create an `admin_users` table (or add a flag to users):
   ```sql
   CREATE TABLE admin_users (
     id UUID PRIMARY KEY REFERENCES auth.users(id),
     email TEXT UNIQUE,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```
3. Insert your admin email:
   ```sql
   INSERT INTO admin_users (email) VALUES ('your-email@example.com');
   ```

---

## 5. Complete `.env.local` Template

```
# Database - Connection Pooling (for app queries)
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Database - Direct Connection (for Prisma migrations)
DIRECT_URL="postgresql://postgres.[project-id]:[password]@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# IntaSend Payment
INTASEND_PUBLISHABLE_KEY="pk_live_..."
INTASEND_SECRET_KEY="sk_live_..."
INTASEND_WEBHOOK_SECRET="whsec_..."

# Next.js (Public - safe to expose)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Note**: Use `.env.local` for local development (git-ignored). For production/Railway, set these as environment variables in the deployment platform.

---

## 6. Local Development

### Quick Start:
```bash
# Install dependencies
npm install

# Set up .env with local/test values
cp ENV_SETUP.md .env  # Then edit with your actual keys

# Run migrations
npx prisma migrate dev --name init

# Seed sample data
npx prisma db seed

# Start dev server
npm run dev
```

Visit `http://localhost:3000` to see the home page.

---

## 7. Deployment (Railway)

When deploying to Railway:
1. Add all `.env` variables to Railway's **Variables** section
2. Railway will automatically run migrations on deploy
3. Set `NODE_ENV=production`

See `railway.json` for service configuration.

---

## Troubleshooting

- **Database connection fails**: Verify IP whitelist in Supabase (Settings > Database > Allowed IPs)
- **Supabase auth not working**: Check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` match your project
- **IntaSend webhook not firing**: Verify webhook URL is publicly accessible and secret matches
- **Prisma client not found**: Run `npx prisma generate` to regenerate the client

For more help, check the [Supabase Docs](https://supabase.com/docs) or [IntaSend Docs](https://intasend.com/docs).
