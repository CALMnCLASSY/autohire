import { PrismaClient } from '@prisma/client';

// Override DATABASE_URL to use session connection for seeding
const originalDbUrl = process.env.DATABASE_URL;
process.env.DATABASE_URL = process.env.DATABASE_URL?.replace(':6543', ':5432') || process.env.DATABASE_URL;

const prisma = new PrismaClient();

const cars = [
  {
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    pricePerDay: 4500,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    imageUrls: [
      'https://4x4carrentalkenya.com/wp-content/uploads/2023/08/Sedan-Car-Hire-Kenya.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzJVd5i-cdWinV-IvF1qfWbN2zXiBVV3Ke8g&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgH5IYG_8EbqNR-cgOFb55Gx99O6PuuQPSkg&s',
    ],
    description: 'Luxury sedan with premium comfort and advanced safety features.',
    features: ['Leather seats', 'Sunroof', 'Backup camera', 'Cruise control', 'Bluetooth'],
    isAvailable: true,
  },
  {
    make: 'Honda',
    model: 'CR-V',
    year: 2024,
    pricePerDay: 5500,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    imageUrls: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3SmiUNEB9wgNbMOM9G413mngdt0xL8A5B7w&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoxa3Uudj-VksSEXygWuQ6ssBdUobFtADOzs4o2I0wlQ&s',
      'https://www.cardeal.co.ke/wp-content/uploads/2024/12/pioneer.nairobi_1730144063263.jpg',
    ],
    description: 'Spacious SUV perfect for family trips and off-road adventures.',
    features: ['All-wheel drive', 'Panoramic sunroof', 'Heated seats', 'Navigation system', 'Apple CarPlay'],
    isAvailable: true,
  },
  {
    make: 'Nissan',
    model: 'X-Trail',
    year: 2023,
    pricePerDay: 6000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    imageUrls: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92OYqCIC1BUBMcUI34HdMHxvp6C_weZ3Pyg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3SmiUNEB9wgNbMOM9G413mngdt0xL8A5B7w&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoxa3Uudj-VksSEXygWuQ6ssBdUobFtADOzs4o2I0wlQ&s',
    ],
    description: '7-seater SUV with excellent fuel efficiency and spacious cargo.',
    features: ['3rd row seating', 'Diesel engine', 'Roof rails', 'Traction control', 'Stability control'],
    isAvailable: true,
  },
  {
    make: 'BMW',
    model: '3 Series',
    year: 2024,
    pricePerDay: 8500,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    imageUrls: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqSXa3QxRG4trfttw8-lZIK31JIbxHVj8AVA&s',
      'https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-search_result400x300/10734927/2016-BMW-3-Series-320i-Auto.jpg?v=1099830122',
    ],
    description: 'Premium luxury sedan with cutting-edge technology and performance.',
    features: ['M Sport package', 'Adaptive suspension', 'Premium sound system', 'Panoramic sunroof', 'Gesture control'],
    isAvailable: true,
  },
  {
    make: 'Mitsubishi',
    model: 'Pajero',
    year: 2023,
    pricePerDay: 7500,
    transmission: 'Manual',
    fuelType: 'Diesel',
    seats: 7,
    imageUrls: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoxa3Uudj-VksSEXygWuQ6ssBdUobFtADOzs4o2I0wlQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3SmiUNEB9wgNbMOM9G413mngdt0xL8A5B7w&s',
    ],
    description: 'Rugged 4x4 SUV built for adventure and off-road capability.',
    features: ['4WD system', 'Off-road tires', 'Roof rack', 'Tow hitch', 'Skid plates'],
    isAvailable: true,
  },
  {
    make: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2024,
    pricePerDay: 9000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    imageUrls: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqSXa3QxRG4trfttw8-lZIK31JIbxHVj8AVA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3SmiUNEB9wgNbMOM9G413mngdt0xL8A5B7w&s',
    ],
    description: 'Executive luxury sedan with unparalleled comfort and technology.',
    features: ['MBUX infotainment', 'Burmester sound', 'Air suspension', 'Massage seats', 'Ambient lighting'],
    isAvailable: true,
  },
];

async function main() {
  console.log('Start seeding with session connection...');

  try {
    // Clean existing data
    try {
      await prisma.booking.deleteMany();
      console.log('Cleared existing bookings');
    } catch (e) {
      console.log('Bookings table does not exist, skipping...');
    }
    
    try {
      await prisma.car.deleteMany();
      console.log('Cleared existing cars');
    } catch (e) {
      console.log('Cars table does not exist, will create new...');
    }

    // Insert cars
    const createdCars = [];
    for (const car of cars) {
      const createdCar = await prisma.car.create({
        data: car,
      });
      createdCars.push(createdCar);
      console.log(`Created car: ${car.make} ${car.model}`);
    }

    console.log(`Successfully seeded ${createdCars.length} cars`);
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('Disconnected from database');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
