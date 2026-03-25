'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('bookings');
  const [showAddCar, setShowAddCar] = useState(false);
  const [editingCar, setEditingCar] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [cars, setCars] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: '',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    imageUrls: '',
    description: '',
    features: '',
    isAvailable: true,
  });

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.email === 'admin@autohirecnc.com' && credentials.password === 'thecnccompany') {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('adminAuth', 'true');
    } else {
      setAuthError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ email: '', password: '' });
    localStorage.removeItem('adminAuth');
  };

  // Check auth on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Data fetching
  useEffect(() => {
    if (isAuthenticated) {
      fetchCars();
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      showMessage('error', 'Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      showMessage('error', 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const carData = {
        ...formData,
        pricePerDay: parseInt(formData.pricePerDay),
        imageUrls: formData.imageUrls.split(',').map(url => url.trim()).filter(url => url),
        features: formData.features.split(',').map(feature => feature.trim()).filter(feature => feature),
      };

      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        showMessage('success', 'Car added successfully');
        setShowAddCar(false);
        resetForm();
        fetchCars();
      } else {
        showMessage('error', 'Failed to add car');
      }
    } catch (error) {
      showMessage('error', 'Failed to add car');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const carData = {
        ...formData,
        pricePerDay: parseInt(formData.pricePerDay),
        imageUrls: formData.imageUrls.split(',').map(url => url.trim()).filter(url => url),
        features: formData.features.split(',').map(feature => feature.trim()).filter(feature => feature),
      };

      const response = await fetch(`/api/cars/${editingCar.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        showMessage('success', 'Car updated successfully');
        setEditingCar(null);
        resetForm();
        fetchCars();
      } else {
        showMessage('error', 'Failed to update car');
      }
    } catch (error) {
      showMessage('error', 'Failed to update car');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId: number) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showMessage('success', 'Car deleted successfully');
        fetchCars();
      } else {
        showMessage('error', 'Failed to delete car');
      }
    } catch (error) {
      showMessage('error', 'Failed to delete car');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCar = (car: any) => {
    setEditingCar(car);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      pricePerDay: car.pricePerDay.toString(),
      transmission: car.transmission,
      fuelType: car.fuelType,
      seats: car.seats,
      imageUrls: car.imageUrls.join(', '),
      description: car.description || '',
      features: car.features.join(', '),
      isAvailable: car.isAvailable,
    });
    setShowAddCar(true);
  };

  const resetForm = () => {
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      pricePerDay: '',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      imageUrls: '',
      description: '',
      features: '',
      isAvailable: true,
    });
  };

  const handleUpdateBookingStatus = async (bookingId: number, status: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        showMessage('success', 'Booking status updated');
        fetchBookings();
      } else {
        showMessage('error', 'Failed to update booking');
      }
    } catch (error) {
      showMessage('error', 'Failed to update booking');
    } finally {
      setLoading(false);
    }
  };

  // Mock contact messages (since no database storage)
  const mockContactMessages = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+254712345678',
      message: 'I need a car for 3 days next week. What options do you have?',
      timestamp: new Date('2024-03-24T10:30:00'),
      read: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+254723456789',
      message: 'Do you have automatic transmission cars available?',
      timestamp: new Date('2024-03-24T14:15:00'),
      read: true,
    },
  ];

  useEffect(() => {
    setContactMessages(mockContactMessages);
  }, []);

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

  // Authentication check
  if (!isAuthenticated) {
    return (
      <main className="w-full min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-[rgba(13,15,24,0.8)] border border-[rgba(201,255,92,0.1)] rounded-xl p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                  placeholder="admin@autohirecnc.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                  placeholder="Enter password"
                  required
                />
              </div>
              {authError && (
                <div className="text-red-400 text-sm text-center">{authError}</div>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

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
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>

        {/* Message notifications */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-500/20 text-green-300 border-green-500/30' 
              : 'bg-red-500/20 text-red-300 border-red-500/30'
          }`}>
            {message.text}
          </div>
        )}

        <div className="flex gap-4 mb-8 border-b border-[rgba(201,255,92,0.1)]">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'bookings'
                ? 'text-[#c9ff5c] border-b-2 border-[#c9ff5c]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Recent Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('cars')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'cars'
                ? 'text-[#c9ff5c] border-b-2 border-[#c9ff5c]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Manage Vehicles ({cars.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'messages'
                ? 'text-[#c9ff5c] border-b-2 border-[#c9ff5c]'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Contact Messages ({contactMessages.filter(m => !m.read).length})
          </button>
        </div>

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading bookings...</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No bookings found</div>
            ) : (
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
                      <th className="text-left py-4 px-4 font-bold text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-[rgba(201,255,92,0.05)] hover:bg-[rgba(201,255,92,0.05)] transition">
                        <td className="py-4 px-4 font-mono text-sm">#{booking.id}</td>
                        <td className="py-4 px-4 text-sm">{booking.userEmail}</td>
                        <td className="py-4 px-4 text-sm">
                          {booking.car ? `${booking.car.make} ${booking.car.model}` : `Car #${booking.carId}`}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-sm font-bold text-[#c9ff5c]">KES {booking.totalAmount.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={booking.status}
                            onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                            className="px-2 py-1 text-xs bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded text-white focus:outline-none focus:border-[#c9ff5c]"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="PAID">Paid</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'cars' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Manage Vehicles</h2>
              <button
                onClick={() => {
                  setShowAddCar(!showAddCar);
                  if (!showAddCar) {
                    resetForm();
                    setEditingCar(null);
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition"
              >
                {showAddCar ? 'Cancel' : '+ Add Vehicle'}
              </button>
            </div>

            {showAddCar && (
              <div className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">{editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                <form onSubmit={editingCar ? handleUpdateCar : handleAddCar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Availability</label>
                    <select
                      value={formData.isAvailable.toString()}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value === 'true' })}
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white focus:outline-none focus:border-[#c9ff5c] transition"
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter car description..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                    />
                  </div>
                  <div className="md:col-span-2">
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
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Features (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="Air Conditioning, GPS, Bluetooth, USB Charging"
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : (editingCar ? 'Update Vehicle' : 'Add Vehicle')}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading vehicles...</div>
            ) : cars.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No vehicles found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cars.map((car) => (
                  <div key={car.id} className="bg-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.1)] rounded-xl p-6 hover:border-[rgba(201,255,92,0.3)] transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">
                          {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-gray-400">{car.year}</p>
                        <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                          car.isAvailable 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                          {car.isAvailable ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEditCar(car)}
                          className="px-3 py-1 text-xs bg-[rgba(201,255,92,0.1)] text-[#c9ff5c] rounded hover:bg-[rgba(201,255,92,0.2)] transition"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteCar(car.id)}
                          className="px-3 py-1 text-xs bg-[rgba(255,107,107,0.1)] text-[#ff6b6b] rounded hover:bg-[rgba(255,107,107,0.2)] transition"
                        >
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
                        <span className="text-gray-400">Transmission</span>
                        <span className="font-bold">{car.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fuel</span>
                        <span className="font-bold">{car.fuelType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Seats</span>
                        <span className="font-bold">{car.seats}</span>
                      </div>
                      {car.features && car.features.length > 0 && (
                        <div className="mt-3">
                          <span className="text-gray-400 text-xs">Features: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {car.features.slice(0, 3).map((feature: string, index: number) => (
                              <span key={index} className="px-2 py-1 text-xs bg-[rgba(201,255,92,0.1)] text-[#c9ff5c] rounded">
                                {feature}
                              </span>
                            ))}
                            {car.features.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-[rgba(201,255,92,0.1)] text-[#c9ff5c] rounded">
                                +{car.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
            {contactMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No messages found</div>
            ) : (
              <div className="space-y-4">
                {contactMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`bg-[rgba(13,15,24,0.6)] border rounded-xl p-6 transition ${
                      msg.read 
                        ? 'border-[rgba(201,255,92,0.1)] opacity-75' 
                        : 'border-[rgba(201,255,92,0.3)]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{msg.name}</h3>
                        <p className="text-sm text-gray-400">{msg.email}</p>
                        <p className="text-sm text-gray-400">{msg.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">
                          {new Date(msg.timestamp).toLocaleDateString()} {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          msg.read 
                            ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {msg.read ? 'Read' : 'New'}
                        </span>
                        <button
                          onClick={() => {
                            setContactMessages(prev => 
                              prev.map(m => m.id === msg.id ? { ...m, read: true } : m)
                            );
                          }}
                          className="px-3 py-1 text-xs bg-[rgba(201,255,92,0.1)] text-[#c9ff5c] rounded hover:bg-[rgba(201,255,92,0.2)] transition"
                        >
                          {msg.read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">
                      <p className="mb-2 font-semibold text-gray-400">Message:</p>
                      <p>{msg.message}</p>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <a
                        href={`mailto:${msg.email}`}
                        className="px-4 py-2 text-sm bg-[rgba(201,255,92,0.1)] text-[#c9ff5c] rounded hover:bg-[rgba(201,255,92,0.2)] transition"
                      >
                        Reply via Email
                      </a>
                      <a
                        href={`tel:${msg.phone}`}
                        className="px-4 py-2 text-sm bg-[rgba(80,223,255,0.1)] text-[#50dfff] rounded hover:bg-[rgba(80,223,255,0.2)] transition"
                      >
                        Call
                      </a>
                      <a
                        href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        className="px-4 py-2 text-sm bg-[rgba(37,211,102,0.1)] text-[#25d366] rounded hover:bg-[rgba(37,211,102,0.2)] transition"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
