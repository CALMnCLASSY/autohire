'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  transmission: string;
  fuelType: string;
  seats: number;
  imageUrls: string[];
  description: string;
  features: string[];
  isAvailable: boolean;
}

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const carId = parseInt(resolvedParams.id);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [car, setCar] = useState<Car | null>(null);
  const [carLoading, setCarLoading] = useState(true);

  const phoneNumber = '+254752776585';

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${carId}`);
        if (response.ok) {
          const carData = await response.json();
          setCar(carData);
        } else {
          setError('Car not found');
        }
      } catch (err) {
        setError('Failed to load car details');
      } finally {
        setCarLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in renting the ${car?.make} ${car?.model} (${car?.year}). Can you provide more information?`;
    const url = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  if (carLoading) {
    return (
      <main className="w-full min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9ff5c] mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading car details...</p>
        </div>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="w-full min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Car not found</h1>
          <Link href="/" className="text-[#c9ff5c] hover:text-[#a8ff00]">
            ← Back to home
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

      // Store email for MyCars page
      localStorage.setItem('userEmail', userEmail);

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
        <Link href="/" className="text-[#c9ff5c] hover:text-[#a8ff00] transition mb-8 inline-block">
          ← Back to home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-[rgba(201,255,92,0.1)] to-[rgba(80,223,255,0.1)] border border-[rgba(201,255,92,0.15)] h-96">
              {car.imageUrls?.[0] ? (
                <img
                  src={car.imageUrls[0]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[rgba(13,15,24,0.5)]">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {car.imageUrls && car.imageUrls.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {car.imageUrls.map((img: string, i: number) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-[rgba(201,255,92,0.1)] h-24">
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

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
                {car.features?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center text-gray-300">
                    <span className="text-[#c9ff5c] mr-2">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-[#c9ff5c]">Contact Us for More Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#25D366]/50 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </button>
                <button
                  onClick={handlePhoneClick}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-[rgba(201,255,92,0.1)] border border-[rgba(201,255,92,0.3)] text-[#c9ff5c] font-bold rounded-lg hover:bg-[rgba(201,255,92,0.2)] transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call {phoneNumber}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-xl p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Book Now</h2>

              {!car.isAvailable && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm mb-4">
                  This car is currently unavailable for booking
                </div>
              )}

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                    required
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
                  disabled={loading || days <= 0 || !car.isAvailable}
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
