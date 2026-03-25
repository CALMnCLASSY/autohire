-- Create Cars table
CREATE TABLE IF NOT EXISTS "Car" (
    "id" SERIAL NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "pricePerDay" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "imageUrls" TEXT[],
    "description" TEXT,
    "features" TEXT[],
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- Create Bookings table
CREATE TABLE IF NOT EXISTS "Booking" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "intaSendRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Car_isAvailable_idx" ON "Car"("isAvailable");
CREATE INDEX IF NOT EXISTS "Car_pricePerDay_idx" ON "Car"("pricePerDay");
CREATE INDEX IF NOT EXISTS "Booking_carId_idx" ON "Booking"("carId");
CREATE INDEX IF NOT EXISTS "Booking_userEmail_idx" ON "Booking"("userEmail");
CREATE INDEX IF NOT EXISTS "Booking_status_idx" ON "Booking"("status");
CREATE INDEX IF NOT EXISTS "Booking_startDate_endDate_idx" ON "Booking"("startDate", "endDate");

-- Add foreign key constraint
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;
