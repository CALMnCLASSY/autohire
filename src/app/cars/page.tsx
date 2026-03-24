'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CarsListingPage() {
  const [priceRange, setPriceRange] = useState(10000);

  const allCars = [
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
    {
      id: 5,
      make: 'Mercedes',
      model: 'C-Class',
      year: 2024,
      pricePerDay: 9500,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      image: 'https://source.unsplash.com/featured/?mercedes,luxury',
    },
    {
      id: 6,
      make: 'Hyundai',
      model: 'Tucson',
      year: 2023,
      pricePerDay: 5000,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      image: 'https://source.unsplash.com/featured/?hyundai,suv',
    },
  ];

  const filteredCars = allCars.filter((car) => car.pricePerDay <= priceRange);

  return (
    <main className="w-full min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-[#c9ff5c] hover:text-[#a8ff00] transition mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-2">Available Vehicles</h1>
          <p className="text-gray-400">
            {filteredCars.length} cars matching your criteria
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              <div className="mb-6">
                <label className="text-sm font-medium text-gray-300 mb-3 block">
                  Max Price: KES {priceRange.toLocaleString()}/day
                </label>
                <input
                  type="range"
                  min="3000"
                  max="15000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-[rgba(201,255,92,0.2)] rounded-lg appearance-none cursor-pointer accent-[#c9ff5c]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" id="auto" className="w-4 h-4 accent-[#c9ff5c]" />
                  <label htmlFor="auto" className="ml-2 text-sm text-gray-300">
                    Automatic
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="petrol" className="w-4 h-4 accent-[#c9ff5c]" />
                  <label htmlFor="petrol" className="ml-2 text-sm text-gray-300">
                    Petrol
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="diesel" className="w-4 h-4 accent-[#c9ff5c]" />
                  <label htmlFor="diesel" className="ml-2 text-sm text-gray-300">
                    Diesel
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCars.map((car) => (
                <Link key={car.id} href={`/cars/${car.id}`}>
                  <div className="group cursor-pointer h-full bg-[rgba(13,15,24,0.4)] border border-[rgba(201,255,92,0.1)] rounded-xl overflow-hidden hover:border-[rgba(201,255,92,0.3)] transition">
                    <div className="relative overflow-hidden h-56 bg-gradient-to-br from-[rgba(201,255,92,0.1)] to-[rgba(80,223,255,0.1)]">
                      <img
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-[#c9ff5c] text-black px-3 py-1 rounded-full text-sm font-bold">
                        {car.year}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {car.make} {car.model}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">Premium rental</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-[rgba(201,255,92,0.1)] text-[#c9ff5c] px-2 py-1 rounded">
                          {car.seats} seats
                        </span>
                        <span className="text-xs bg-[rgba(80,223,255,0.1)] text-[#50dfff] px-2 py-1 rounded">
                          {car.transmission}
                        </span>
                        <span className="text-xs bg-[rgba(255,107,107,0.1)] text-[#ff6b6b] px-2 py-1 rounded">
                          {car.fuelType}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[rgba(201,255,92,0.1)]">
                        <div>
                          <p className="text-2xl font-bold text-[#c9ff5c]">
                            KES {car.pricePerDay.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">per day</p>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
