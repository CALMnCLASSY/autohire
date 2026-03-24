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
      image: 'https://source.unsplash.com/featured/?toyota,sedan',
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
      image: 'https://source.unsplash.com/featured/?honda,suv',
    },
    {
      id: 3,
      make: 'Nissan',
      model: 'X-Trail',
      year: 2023,
      pricePerDay: 6000,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 7,
      image: 'https://source.unsplash.com/featured/?nissan,suv',
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
      image: 'https://source.unsplash.com/featured/?bmw,luxury',
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
          <h2 className="text-4xl font-bold mb-6">Why Choose Classy?</h2>
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
