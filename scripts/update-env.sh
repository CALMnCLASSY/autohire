#!/bin/bash

echo "🔄 Updating .env file to use session port..."

# Replace port 6543 with 5432 in .env file
sed -i 's/:6543/:5432/g' .env

echo "✅ Updated .env file to use session port (5432)"
echo "🔍 Current DATABASE_URL:"
grep DATABASE_URL .env
