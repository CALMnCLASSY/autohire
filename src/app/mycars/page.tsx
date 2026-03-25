'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Booking {
  id: number;
  car: {
    id: number;
    make: string;
    model: string;
    year: number;
    imageUrls: string[];
  };
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  intaSendRef?: string;
  createdAt: string;
}

export default function MyCarsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Get email from localStorage or prompt user
    const email = localStorage.getItem('userEmail') || '';
    if (email) {
      setUserEmail(email);
      fetchBookings(email);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchBookings = async (email: string) => {
    try {
      const response = await fetch(`/api/bookings?userEmail=${email}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
      setLoading(true);
      fetchBookings(userEmail);
    }
  };

  const handleExtendBooking = async (bookingId: number) => {
    const newEndDate = prompt('Enter new end date (YYYY-MM-DD):');
    if (!newEndDate) return;

    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      const daysDiff = Math.ceil(
        (new Date(newEndDate).getTime() - new Date(booking.endDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysDiff <= 0) {
        alert('New end date must be after current end date');
        return;
      }

      const additionalAmount = daysDiff * (booking.totalAmount / 
        Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))
      );

      const response = await fetch(`/api/bookings/${bookingId}/extend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newEndDate,
          additionalAmount,
        }),
      });

      if (response.ok) {
        fetchBookings(userEmail);
        alert('Booking extended successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to extend booking');
      }
    } catch (error) {
      console.error('Error extending booking:', error);
      alert('Failed to extend booking');
    }
  };

  if (!userEmail) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0d0f18] via-[#1a1f2e] to-[#0d0f18] px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#c9ff5c] to-[#50dfff] bg-clip-text text-transparent">
              My Cars Dashboard
            </h1>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition"
              >
                View My Bookings
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0d0f18] via-[#1a1f2e] to-[#0d0f18] px-4 py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9ff5c] mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading your bookings...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0d0f18] via-[#1a1f2e] to-[#0d0f18] px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#c9ff5c] to-[#50dfff] bg-clip-text text-transparent">
            My Cars Dashboard
          </h1>
          <p className="text-gray-300">Manage your car rentals and bookings</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-semibold mb-4">No Bookings Found</h2>
              <p className="text-gray-300 mb-6">You haven't made any bookings yet.</p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition"
              >
                Browse Cars
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-6 backdrop-blur-xl shadow-2xl"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4">
                    {booking.car.imageUrls?.[0] && (
                      <img
                        src={booking.car.imageUrls[0]}
                        alt={`${booking.car.make} ${booking.car.model}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="md:w-3/4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {booking.car.make} {booking.car.model} ({booking.car.year})
                        </h3>
                        <p className="text-gray-300">
                          Booking #{booking.id} • {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'PAID'
                            ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                            : booking.status === 'PENDING'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                            : 'bg-red-500/20 text-red-400 border border-red-400/30'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Pickup Date</p>
                        <p className="font-medium">{new Date(booking.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Return Date</p>
                        <p className="font-medium">{new Date(booking.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Amount</p>
                        <p className="font-medium">KES {booking.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {booking.status === 'PAID' && (
                        <button
                          onClick={() => handleExtendBooking(booking.id)}
                          className="px-4 py-2 bg-[rgba(201,255,92,0.1)] border border-[rgba(201,255,92,0.3)] text-[#c9ff5c] rounded-lg hover:bg-[rgba(201,255,92,0.2)] transition"
                        >
                          Extend Booking
                        </button>
                      )}
                      {booking.status === 'PENDING' && (
                        <Link
                          href={`/checkout/${booking.id}`}
                          className="px-4 py-2 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition"
                        >
                          Complete Payment
                        </Link>
                      )}
                      <Link
                        href={`/cars/${booking.car.id}`}
                        className="px-4 py-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white rounded-lg hover:bg-[rgba(255,255,255,0.2)] transition"
                      >
                        View Car
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
