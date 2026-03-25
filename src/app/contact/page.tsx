'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const phoneNumber = '+254752776585';
  const whatsappMessage = 'Hi! I\'m interested in renting a car from AutoHire. Can you provide more information?';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0d0f18] via-[#1a1f2e] to-[#0d0f18] px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#c9ff5c] to-[#50dfff] bg-clip-text text-transparent">
            Contact AutoHire
          </h1>
          <p className="text-lg text-gray-300">
            Get in touch with us for inquiries, support, or partnership opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-[#c9ff5c]">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#c9ff5c] to-[#50dfff] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <button
                      onClick={handlePhoneClick}
                      className="text-[#50dfff] hover:underline"
                    >
                      {phoneNumber}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#c9ff5c] to-[#50dfff] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                    <button
                      onClick={handleWhatsAppClick}
                      className="text-[#50dfff] hover:underline"
                    >
                      {phoneNumber}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#c9ff5c] to-[#50dfff] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <p className="text-[#50dfff]">info@autohire.co.ke</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#c9ff5c] to-[#50dfff] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Business Hours</h3>
                    <p className="text-gray-300">Mon - Fri: 6:00 AM - 8:00 PM</p>
                    <p className="text-gray-300">Sat - Sun: 7:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#25D366]/50 transition flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-[#c9ff5c]">Quick Links</h2>
              <div className="space-y-3">
                <a href="/about" className="block text-gray-300 hover:text-[#c9ff5c] transition">
                  About AutoHire
                </a>
                <a href="/mycars" className="block text-gray-300 hover:text-[#c9ff5c] transition">
                  My Bookings
                </a>
                <a href="/admin" className="block text-gray-300 hover:text-[#c9ff5c] transition">
                  Admin Portal
                </a>
                <a href="/" className="block text-gray-300 hover:text-[#c9ff5c] transition">
                  Browse Cars
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-[#c9ff5c]">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition"
                  placeholder="+254 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(201,255,92,0.15)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9ff5c] transition resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#c9ff5c] to-[#a8ff00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#c9ff5c]/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {submitMessage && (
              <div className={`mt-4 p-4 rounded-lg text-center ${
                submitMessage.includes('Thank you') 
                  ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-400/30'
              }`}>
                {submitMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
