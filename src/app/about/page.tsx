export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0d0f18] via-[#1a1f2e] to-[#0d0f18] px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#c9ff5c] to-[#50dfff] bg-clip-text text-transparent">
            About AutoHire
          </h1>
          <p className="text-lg text-gray-300">
            Kenya's premier car rental marketplace connecting you with quality vehicles
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-[#c9ff5c]">Our Story</h2>
            <p className="text-gray-300 leading-relaxed">
              AutoHire was founded with a simple mission: to make car rental in Kenya seamless, 
              affordable, and accessible to everyone. We recognized the need for a platform that 
              connects car owners with people who need quality vehicles, whether for business, 
              leisure, or special occasions.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              Since our inception, we've grown from a small startup to Kenya's trusted car rental 
              marketplace, serving thousands of customers across the country. Our platform features 
              a diverse fleet of vehicles, from economical sedans to luxury SUVs, all maintained to 
              the highest standards.
            </p>
          </section>

          <section className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-[#c9ff5c]">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To provide Kenyans with access to quality vehicles at competitive prices while 
              creating opportunities for car owners to generate income from their assets. We strive 
              to make car rental as simple as booking a ride, with transparent pricing, secure 
              payments, and exceptional customer service.
            </p>
          </section>

          <section className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-[#c9ff5c]">Why Choose AutoHire?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#50dfff]">Quality Assurance</h3>
                <p className="text-gray-300">
                  All vehicles on our platform undergo rigorous inspection and maintenance checks 
                  to ensure your safety and comfort.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#50dfff]">Transparent Pricing</h3>
                <p className="text-gray-300">
                  No hidden fees or surprise charges. The price you see is the price you pay, 
                  with clear breakdowns of all costs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#50dfff]">Flexible Options</h3>
                <p className="text-gray-300">
                  From daily rentals to long-term leases, we offer flexible rental periods to 
                  suit your needs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#50dfff]">Secure Payments</h3>
                <p className="text-gray-300">
                  Multiple payment options including M-Pesa and card payments, all processed 
                  securely through our trusted partners.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-b from-[rgba(13,15,24,0.8)] to-[rgba(13,15,24,0.6)] border border-[rgba(201,255,92,0.2)] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-[#c9ff5c]">Terms & Conditions</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">1. Booking Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Valid driver's license required for all rentals</li>
                  <li>Minimum age: 23 years with 2 years driving experience</li>
                  <li>Valid ID or passport for verification</li>
                  <li>Security deposit may be required for certain vehicle categories</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">2. Rental Terms</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Rental period calculated on a 24-hour basis</li>
                  <li>Late returns subject to additional charges</li>
                  <li>Vehicles must be returned with same fuel level</li>
                  <li>No smoking allowed in rental vehicles</li>
                  <li>Kilometer limits apply to certain rentals</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">3. Payment & Cancellation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Full payment required at booking confirmation</li>
                  <li>Cancellations: 24+ hours notice - full refund</li>
                  <li>Cancellations: Less than 24 hours - 50% refund</li>
                  <li>No-shows - no refund</li>
                  <li>Extensions subject to vehicle availability</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">4. Liability & Insurance</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Renter responsible for damage during rental period</li>
                  <li>Basic insurance included in all rentals</li>
                  <li>Optional comprehensive insurance available</li>
                  <li>Vehicle theft or vandalism requires police report</li>
                  <li>Personal belongings not covered by rental insurance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">5. Prohibited Uses</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>No off-road driving or racing</li>
                  <li>No sub-leasing or unauthorized drivers</li>
                  <li>No carrying of illegal substances</li>
                  <li>No use for commercial purposes without prior approval</li>
                  <li>No crossing international borders</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
