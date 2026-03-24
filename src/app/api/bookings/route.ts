import { NextRequest, NextResponse } from 'next/server';

const mockBookings: Record<number, any> = {};
let bookingIdCounter = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { carId, userEmail, startDate, endDate, totalAmount } = body;

    if (!carId || !userEmail || !startDate || !endDate || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return NextResponse.json(
        { error: 'Return date must be after pickup date' },
        { status: 400 }
      );
    }

    const bookingId = bookingIdCounter++;
    const booking = {
      id: bookingId,
      carId,
      userEmail,
      startDate,
      endDate,
      totalAmount,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    mockBookings[bookingId] = booking;

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get('id');

  if (bookingId) {
    const booking = mockBookings[parseInt(bookingId)];
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(booking);
  }

  return NextResponse.json(Object.values(mockBookings));
}
