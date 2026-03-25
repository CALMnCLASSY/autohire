'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchLocation, setSearchLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const featuredCars = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2024,
      pricePerDay: 4500,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      image: 'https://4x4carrentalkenya.com/wp-content/uploads/2023/08/Sedan-Car-Hire-Kenya.jpg',
    },
    {
      id: 2,
      make: 'Honda',
      model: 'CR-V',
      year: 2024,
      pricePerDay: 5500,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3SmiUNEB9wgNbMOM9G413mngdt0xL8A5B7w&s',
    },
    {
      id: 3,
      make: 'Nissan',
      model: 'X-Trail',
      year: 2023,
      pricePerDay: 6000,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT92OYqCIC1BUBMcUI34HdMHxvp6C_weZ3Pyg&s',
    },
    {
      id: 4,
      make: 'BMW',
      model: '3 Series',
      year: 2024,
      pricePerDay: 8500,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      image: 'data:image/jpeg;base64,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',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      location: searchLocation,
      pickup: pickupDate,
      return: returnDate,
    });
    window.location.href = `/cars?${params.toString()}`;
  };

  return (
    <main className="w-full">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#c9ff5c]/20 to-transparent rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#50dfff]/20 to-transparent rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-white">Drive Your</span>
            <br />
            <span className="bg-gradient-to-r from-[#c9ff5c] to-[#50dfff] bg-clip-text text-transparent">
              Perfect Ride
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Browse premium vehicles, compare prices, and book instantly. Fast, secure, and hassle-free car rentals across Kenya.
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="City or airport"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-300 mb-2">Pickup Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-300 mb-2">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition transform hover:scale-105"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[rgba(201,255,92,0.05)] to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Featured Vehicles</h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Handpicked premium cars ready for your next adventure
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <Link key={car.id} href={`/cars/${car.id}`}>
                <div className="group cursor-pointer h-full">
                  <div className="relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-[rgba(201,255,92,0.1)] to-[rgba(80,223,255,0.1)] border border-[rgba(201,255,92,0.15)] h-48">
                    <img
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <div className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-4 group-hover:border-[rgba(201,255,92,0.3)] transition">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {car.make} {car.model}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">{car.year}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-[rgba(201,255,92,0.1)] text-[#c9ff5c] px-2 py-1 rounded">
                        {car.seats} seats
                      </span>
                      <span className="text-xs bg-[rgba(80,223,255,0.1)] text-[#50dfff] px-2 py-1 rounded">
                        {car.transmission}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#c9ff5c]">
                        KES {car.pricePerDay.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400">/day</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-[rgba(201,255,92,0.1)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose AutoHire?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Instant Booking', desc: 'Reserve your car in seconds with our seamless platform' },
              { title: 'Secure Payments', desc: 'M-Pesa, card, and multiple payment options available' },
              { title: 'Premium Fleet', desc: 'Handpicked vehicles maintained to the highest standards' },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-6 hover:border-[rgba(201,255,92,0.3)] transition"
              >
                <h3 className="text-xl font-bold text-[#c9ff5c] mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
