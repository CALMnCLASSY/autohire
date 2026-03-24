'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const carId = parseInt(params.id);

  const carsData: Record<number, any> = {
    1: {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2024,
      pricePerDay: 4500,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      images: [
        'https://source.unsplash.com/featured/?toyota,sedan',
        'https://source.unsplash.com/featured/?car,interior',
        'https://source.unsplash.com/featured/?sedan,luxury',
      ],
      description: 'Luxury sedan with premium comfort and advanced safety features.',
      features: ['Leather seats', 'Sunroof', 'Backup camera', 'Cruise control', 'Bluetooth'],
    },
    2: {
      id: 2,
      make: 'Honda',
      model: 'CR-V',
      year: 2024,
      pricePerDay: 5500,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      images: [
        'https://source.unsplash.com/featured/?honda,suv',
        'https://source.unsplash.com/featured/?suv,family',
        'https://source.unsplash.com/featured/?suv,adventure',
      ],
      description: 'Spacious SUV perfect for family trips and off-road adventures.',
      features: ['All-wheel drive', 'Panoramic sunroof', 'Heated seats', 'Navigation system', 'Apple CarPlay'],
    },
    3: {
      id: 3,
      make: 'Nissan',
      model: 'X-Trail',
      year: 2023,
      pricePerDay: 6000,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 7,
      images: [
        'https://source.unsplash.com/featured/?nissan,suv',
        'https://source.unsplash.com/featured/?7seater,suv',
        'https://source.unsplash.com/featured/?diesel,suv',
      ],
      description: '7-seater SUV with excellent fuel efficiency and spacious cargo.',
      features: ['3rd row seating', 'Diesel engine', 'Roof rails', 'Traction control', 'Stability control'],
    },
    4: {
      id: 4,
      make: 'BMW',
      model: '3 Series',
      year: 2024,
      pricePerDay: 8500,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      images: [
        'https://source.unsplash.com/featured/?bmw,luxury',
        'https://source.unsplash.com/featured/?bmw,performance',
        'https://source.unsplash.com/featured/?luxury,sedan',
      ],
      description: 'Premium luxury sedan with cutting-edge technology and performance.',
      features: ['M Sport package', 'Adaptive suspension', 'Premium sound system', 'Panoramic sunroof', 'Gesture control'],
    },
  };

  const car = carsData[carId];

  if (!car) {
    return (
      <main className="w-full min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Car not found</h1>
          <Link href="/cars" className="text-[#c9ff5c] hover:text-[#a8ff00]">
            ← Back to listings
          </Link>
        </div>
      </main>
    );
  }

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();
  const totalPrice = days * car.pricePerDay;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!pickupDate || !returnDate || !userEmail) {
      setError('Please fill in all fields');
      return;
    }

    if (days <= 0) {
      setError('Return date must be after pickup date');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId,
          userEmail,
          startDate: pickupDate,
          endDate: returnDate,
          totalAmount: totalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Booking failed');
        return;
      }

      setSuccess(`Booking created! Booking ID: ${data.id}. Proceed to payment.`);
      setTimeout(() => {
        window.location.href = `/checkout/${data.id}`;
      }, 2000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/cars" className="text-[#c9ff5c] hover:text-[#a8ff00] transition mb-8 inline-block">
          ← Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-[rgba(201,255,92,0.1)] to-[rgba(80,223,255,0.1)] border border-[rgba(201,255,92,0.15)] h-96">
              <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {car.images.map((img: string, i: number) => (
                <div key={i} className="rounded-lg overflow-hidden border border-[rgba(201,255,92,0.1)] h-24">
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-8 mb-8">
              <h1 className="text-4xl font-bold mb-2">
                {car.make} {car.model}
              </h1>
              <p className="text-gray-400 mb-6">{car.year} • {car.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[rgba(201,255,92,0.05)] border border-[rgba(201,255,92,0.1)] rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Transmission</p>
                  <p className="text-lg font-bold text-[#c9ff5c]">{car.transmission}</p>
                </div>
                <div className="bg-[rgba(80,223,255,0.05)] border border-[rgba(80,223,255,0.1)] rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Fuel Type</p>
                  <p className="text-lg font-bold text-[#50dfff]">{car.fuelType}</p>
                </div>
                <div className="bg-[rgba(255,107,107,0.05)] border border-[rgba(255,107,107,0.1)] rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Seats</p>
                  <p className="text-lg font-bold text-[#ff6b6b]">{car.seats}</p>
                </div>
                <div className="bg-[rgba(201,255,92,0.05)] border border-[rgba(201,255,92,0.1)] rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Price/Day</p>
                  <p className="text-lg font-bold text-[#c9ff5c]">KES {car.pricePerDay.toLocaleString()}</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {car.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center text-gray-300">
                    <span className="text-[#c9ff5c] mr-2">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-xl p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Book Now</h2>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                  />
                </div>

                {days > 0 && (
                  <div className="bg-[rgba(201,255,92,0.1)] border border-[rgba(201,255,92,0.2)] rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{days} days</span>
                      <span className="text-gray-300">KES {(days * car.pricePerDay).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-[rgba(201,255,92,0.2)] pt-2 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold text-[#c9ff5c]">KES {totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">{error}</div>}
                {success && <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-2 rounded-lg text-sm">{success}</div>}

                <button
                  type="submit"
                  disabled={loading || days <= 0}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : days > 0 ? 'Proceed to Payment' : 'Select Dates'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
