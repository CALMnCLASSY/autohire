import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const pickupDate = searchParams.get('pickup');
    const returnDate = searchParams.get('return');

    let cars = await prisma.car.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // TODO: Add filtering logic based on location and dates
    // For now, return all available cars

    return NextResponse.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      make,
      model,
      year,
      pricePerDay,
      transmission,
      fuelType,
      seats,
      imageUrls,
      description,
      features,
      isAvailable = true,
    } = body;

    const car = await prisma.car.create({
      data: {
        make,
        model,
        year,
        pricePerDay,
        transmission,
        fuelType,
        seats,
        imageUrls,
        description,
        features,
        isAvailable,
      },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error('Error creating car:', error);
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    );
  }
}
