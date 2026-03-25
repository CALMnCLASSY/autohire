'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const bookingId = resolvedParams.id;
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/bookings?id=${bookingId}`);
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!phoneNumber && paymentMethod === 'mpesa') {
      setError('Please enter your phone number');
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch('/api/payments/intasend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: parseInt(bookingId),
          amount: booking.totalAmount,
          email: booking.userEmail,
          phoneNumber: paymentMethod === 'mpesa' ? phoneNumber : undefined,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Payment initiation failed');
        return;
      }

      setSuccess('Payment initiated! Redirecting...');
      if (data.redirectUrl) {
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 1500);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <main className="w-full min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#c9ff5c] mx-auto mb-4" />
          <p className="text-gray-400">Loading booking details...</p>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="w-full min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Booking not found</h1>
          <Link href="/" className="text-[#c9ff5c] hover:text-[#a8ff00]">
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#c9ff5c] hover:text-[#a8ff00] transition mb-8 inline-block">
          ← Back to home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-8 mb-8">
              <h1 className="text-3xl font-bold mb-6">Payment Details</h1>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between pb-4 border-b border-[rgba(201,255,92,0.1)]">
                  <span className="text-gray-400">Booking ID</span>
                  <span className="font-bold">#{booking.id}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[rgba(201,255,92,0.1)]">
                  <span className="text-gray-400">Car</span>
                  <span className="font-bold">Car #{booking.carId}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[rgba(201,255,92,0.1)]">
                  <span className="text-gray-400">Email</span>
                  <span className="font-bold">{booking.userEmail}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[rgba(201,255,92,0.1)]">
                  <span className="text-gray-400">Pickup</span>
                  <span className="font-bold">{new Date(booking.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[rgba(201,255,92,0.1)]">
                  <span className="text-gray-400">Return</span>
                  <span className="font-bold">{new Date(booking.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between pt-4">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-3xl font-bold text-[#c9ff5c]">KES {booking.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6">Choose Payment Method</h2>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-[rgba(201,255,92,0.2)] rounded-lg cursor-pointer hover:border-[rgba(201,255,92,0.4)] transition" htmlFor="mpesa">
                    <input
                      id="mpesa"
                      type="radio"
                      name="payment"
                      value="mpesa"
                      checked={paymentMethod === 'mpesa'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 accent-[#c9ff5c]"
                    />
                    <div className="ml-4">
                      <p className="font-bold">M-Pesa</p>
                      <p className="text-sm text-gray-400">Pay via M-Pesa on your phone</p>
                    </div>
                  </label>

                  {paymentMethod === 'mpesa' && (
                    <div className="ml-8 mb-4">
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="254712345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                      />
                    </div>
                  )}

                  <label className="flex items-center p-4 border border-[rgba(201,255,92,0.2)] rounded-lg cursor-pointer hover:border-[rgba(201,255,92,0.4)] transition" htmlFor="card">
                    <input
                      id="card"
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 accent-[#c9ff5c]"
                    />
                    <div className="ml-4">
                      <p className="font-bold">Debit/Credit Card</p>
                      <p className="text-sm text-gray-400">Visa, Mastercard, or other cards</p>
                    </div>
                  </label>
                </div>

                {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">{error}</div>}
                {success && <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-2 rounded-lg text-sm">{success}</div>}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {processing ? 'Processing...' : `Pay KES ${booking.totalAmount.toLocaleString()}`}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-6 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>KES {booking.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax (0%)</span>
                  <span>KES 0</span>
                </div>
                <div className="border-t border-[rgba(201,255,92,0.1)] pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#c9ff5c]">KES {booking.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[rgba(201,255,92,0.05)] border border-[rgba(201,255,92,0.1)] rounded-lg">
                <p className="text-xs text-gray-400 mb-2">🔒 Secure Payment</p>
                <p className="text-xs text-gray-300">Your payment is encrypted and secure. We never store your card details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
