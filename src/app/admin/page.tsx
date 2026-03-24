'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [showAddCar, setShowAddCar] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: '',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    imageUrls: '',
  });

  const mockBookings = [
    {
      id: 1,
      carId: 1,
      userEmail: 'john@example.com',
      startDate: '2024-03-25',
      endDate: '2024-03-28',
      totalAmount: 13500,
      status: 'PAID',
    },
    {
      id: 2,
      carId: 2,
      userEmail: 'jane@example.com',
      startDate: '2024-03-26',
      endDate: '2024-03-30',
      totalAmount: 22000,
      status: 'PENDING',
    },
    {
      id: 3,
      carId: 4,
      userEmail: 'bob@example.com',
      startDate: '2024-03-27',
      endDate: '2024-03-29',
      totalAmount: 17000,
      status: 'PAID',
    },
  ];

  const mockCars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2024, pricePerDay: 4500, seats: 5 },
    { id: 2, make: 'Honda', model: 'CR-V', year: 2024, pricePerDay: 5500, seats: 5 },
    { id: 3, make: 'Nissan', model: 'X-Trail', year: 2023, pricePerDay: 6000, seats: 7 },
    { id: 4, make: 'BMW', model: '3 Series', year: 2024, pricePerDay: 8500, seats: 5 },
  ];

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding car:', formData);
    setShowAddCar(false);
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      pricePerDay: '',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      imageUrls: '',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'CANCELLED':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <main className="w-full min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/" className="text-[#c9ff5c] hover:text-[#a8ff00] transition mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-5xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage vehicles and view bookings</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-[rgba(201,255,92,0.1)]">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'bookings'
                ? 'text-[#c9ff5c] border-b-2 border-[#c9ff5c]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Recent Bookings
          </button>
          <button
            onClick={() => setActiveTab('cars')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'cars'
                ? 'text-[#c9ff5c] border-b-2 border-[#c9ff5c]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Manage Vehicles
          </button>
        </div>

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(201,255,92,0.1)]">
                    <th className="text-left py-4 px-4 font-bold text-gray-400">ID</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-400">Email</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-400">Car</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-400">Dates</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-400">Amount</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-[rgba(201,255,92,0.05)] hover:bg-[rgba(201,255,92,0.05)] transition">
                      <td className="py-4 px-4 font-mono text-sm">#{booking.id}</td>
                      <td className="py-4 px-4 text-sm">{booking.userEmail}</td>
                      <td className="py-4 px-4 text-sm">Car #{booking.carId}</td>
                      <td className="py-4 px-4 text-sm">
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-[#c9ff5c]">KES {booking.totalAmount.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cars' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Manage Vehicles</h2>
              <button
                onClick={() => setShowAddCar(!showAddCar)}
                className="px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition"
              >
                {showAddCar ? 'Cancel' : '+ Add Vehicle'}
              </button>
            </div>

            {showAddCar && (
              <div className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">Add New Vehicle</h3>
                <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Make</label>
                    <input
                      type="text"
                      value={formData.make}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      placeholder="e.g., Toyota"
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Model</label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="e.g., Camry"
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Year</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Price Per Day (KES)</label>
                    <input
                      type="number"
                      value={formData.pricePerDay}
                      onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                      placeholder="e.g., 4500"
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Transmission</label>
                    <select
                      value={formData.transmission}
                      onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Fuel Type</label>
                    <select
                      value={formData.fuelType}
                      onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Seats</label>
                    <input
                      type="number"
                      value={formData.seats}
                      onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Image URLs (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.imageUrls}
                      onChange={(e) => setFormData({ ...formData, imageUrls: e.target.value })}
                      placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition"
                    >
                      Add Vehicle
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockCars.map((car) => (
                <div key={car.id} className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-6 hover:border-[rgba(201,255,92,0.3)] transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">
                        {car.make} {car.model}
                      </h3>
                      <p className="text-sm text-gray-400">{car.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-[rgba(201,255,92,0.1)] text-[#c9ff5c] rounded hover:bg-[rgba(201,255,92,0.2)] transition">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-xs bg-[rgba(255,107,107,0.1)] text-[#ff6b6b] rounded hover:bg-[rgba(255,107,107,0.2)] transition">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price/Day</span>
                      <span className="font-bold text-[#c9ff5c]">KES {car.pricePerDay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Seats</span>
                      <span className="font-bold">{car.seats}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
