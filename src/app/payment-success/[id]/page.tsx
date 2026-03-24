'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PaymentSuccessPage({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings?id=${params.id}`);
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        console.error('Failed to load booking:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [params.id]);

  if (loading) {
    return (
      <main className="w-full min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#c9ff5c] mx-auto mb-4" />
          <p className="text-gray-400">Processing your payment...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-xl p-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#c9ff5c] to-[#50dfff] rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-400 mb-8 text-lg">
            Your booking has been confirmed. A confirmation email has been sent to {booking?.userEmail}.
          </p>

          {booking && (
            <div className="bg-[rgba(201,255,92,0.05)] border border-[rgba(201,255,92,0.1)] rounded-lg p-6 mb-8 text-left">
              <h2 className="font-bold mb-4">Booking Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Booking ID</span>
                  <span className="font-mono font-bold">#{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Car</span>
                  <span className="font-bold">Car #{booking.carId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pickup Date</span>
                  <span className="font-bold">{new Date(booking.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Return Date</span>
                  <span className="font-bold">{new Date(booking.endDate).toLocaleDateString()}</span>
                </div>
                <div className="border-t border-[rgba(201,255,92,0.1)] pt-3 flex justify-between">
                  <span className="text-gray-400">Total Paid</span>
                  <span className="text-[#c9ff5c] font-bold">KES {booking.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-gray-400 text-sm">
              You will receive a pickup confirmation email 24 hours before your rental date.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="flex-1 px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition">
                Back to Home
              </Link>
              <Link href="/cars" className="flex-1 px-6 py-3 border border-[rgba(201,255,92,0.3)] text-[#c9ff5c] font-bold rounded-lg hover:border-[rgba(201,255,92,0.6)] transition">
                Browse More Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
