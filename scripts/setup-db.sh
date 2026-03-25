#!/bin/bash

echo "🔄 Setting up database with session port..."

# Store original DATABASE_URL
ORIGINAL_DB_URL="$DATABASE_URL"

# Use session port instead of pooler
SESSION_DB_URL="${DATABASE_URL/6543/5432}"

echo "📦 Installing Prisma v5.22.0..."
npm install prisma@5.22.0 @prisma/client@5.22.0

echo "🔧 Generating Prisma client..."
DATABASE_URL="$SESSION_DB_URL" npx prisma generate

echo "🗄️  Pushing database schema..."
DATABASE_URL="$SESSION_DB_URL" npx prisma db push --accept-data-loss

echo "🌱 Seeding database with cars..."
DATABASE_URL="$SESSION_DB_URL" npm run db:seed

# Restore original DATABASE_URL
export DATABASE_URL="$ORIGINAL_DB_URL"

echo "✅ Database setup complete!"
