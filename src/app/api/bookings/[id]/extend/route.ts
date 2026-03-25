import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const { newEndDate, additionalAmount } = body;

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(resolvedParams.id) },
      include: { car: true },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (booking.status !== 'PAID') {
      return NextResponse.json(
        { error: 'Cannot extend unpaid booking' },
        { status: 400 }
      );
    }

    // Check if new dates conflict with other bookings
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        carId: booking.carId,
        status: 'PAID',
        id: { not: parseInt(resolvedParams.id) },
        OR: [
          {
            AND: [
              { startDate: { lte: booking.endDate } },
              { endDate: { gte: newEndDate } },
            ],
          },
          {
            AND: [
              { startDate: { lte: newEndDate } },
              { endDate: { gte: newEndDate } },
            ],
          },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { error: 'Car is already booked for the requested extension period' },
        { status: 409 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(resolvedParams.id) },
      data: {
        endDate: new Date(newEndDate),
        totalAmount: booking.totalAmount + additionalAmount,
      },
      include: { car: true },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Error extending booking:', error);
    return NextResponse.json(
      { error: 'Failed to extend booking' },
      { status: 500 }
    );
  }
}
