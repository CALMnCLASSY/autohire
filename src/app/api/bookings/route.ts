import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const userEmail = searchParams.get('userEmail');

    if (id) {
      const booking = await prisma.booking.findUnique({
        where: { id: parseInt(id) },
        include: { car: true },
      });

      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(booking);
    }

    if (userEmail) {
      const bookings = await prisma.booking.findMany({
        where: { userEmail },
        include: { car: true },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json(bookings);
    }

    const bookings = await prisma.booking.findMany({
      include: { car: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      carId,
      userEmail,
      startDate,
      endDate,
      totalAmount,
      status = 'PENDING',
      intaSendRef,
    } = body;

    // Check if car is available for the requested dates
    const existingBooking = await prisma.booking.findFirst({
      where: {
        carId,
        status: 'PAID',
        OR: [
          {
            AND: [
              { startDate: { lte: startDate } },
              { endDate: { gte: startDate } },
            ],
          },
          {
            AND: [
              { startDate: { lte: endDate } },
              { endDate: { gte: endDate } },
            ],
          },
          {
            AND: [
              { startDate: { gte: startDate } },
              { endDate: { lte: endDate } },
            ],
          },
        ],
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Car is already booked for these dates' },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        carId,
        userEmail,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalAmount,
        status,
        intaSendRef,
      },
      include: { car: true },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Booking ID and status are required' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status },
      include: { car: true },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
