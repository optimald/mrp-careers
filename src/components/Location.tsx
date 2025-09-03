export default function Location() {
  return (
    <section id="location" className="py-16 bg-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Our Amazing Location</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Located in the heart of Utah's Wasatch Mountains, our Park City headquarters offers the perfect blend of outdoor adventure and professional opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Location Info */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Our Address
              </h3>
              <div className="dark-card rounded-lg p-6 shadow-dark-lg mb-6">
                <p className="text-lg font-semibold text-white mb-2">2720 Rasmussen Rd A3</p>
                <p className="text-lg text-gray-300 mb-4">Park City, UT 84098</p>
                <a
                  href="https://maps.google.com/?q=2720+Rasmussen+Rd+A3,+Park+City,+UT+84098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-400 transition-all duration-300 shadow-glow-orange"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on Google Maps
                </a>
              </div>
              
              {/* Embedded Map */}
              <div className="dark-card rounded-lg overflow-hidden shadow-dark-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.123456789!2d-111.456789!3d40.654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM5JzE1LjYiTiAxMTHCsDI3JzI0LjQiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ 
                    border: 0,
                    filter: 'invert(0.9) hue-rotate(180deg) contrast(1.2) brightness(0.8)'
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MRP Location - 2720 Rasmussen Rd A3, Park City, UT 84098"
                ></iframe>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Perfectly Positioned
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="dark-card rounded-lg p-4 shadow-dark text-center">
                  <div className="text-2xl font-bold text-accent-500 mb-1">30 min</div>
                  <div className="text-sm text-gray-300">to Salt Lake City</div>
                </div>
                <div className="dark-card rounded-lg p-4 shadow-dark text-center">
                  <div className="text-2xl font-bold text-accent-500 mb-1">15 min</div>
                  <div className="text-sm text-gray-300">to Park City Resort</div>
                </div>
                <div className="dark-card rounded-lg p-4 shadow-dark text-center">
                  <div className="text-2xl font-bold text-accent-500 mb-1">45 min</div>
                  <div className="text-sm text-gray-300">to SLC Airport</div>
                </div>
                <div className="dark-card rounded-lg p-4 shadow-dark text-center">
                  <div className="flex justify-center mb-1">
                    <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-300">Outdoor Adventures</div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Park City is Amazing */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Why Park City is Amazing</h3>
            <div className="space-y-6">
              <div className="dark-card rounded-lg p-6 shadow-dark-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-accent-500/30">
                    <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Mountain Paradise</h4>
                    <p className="text-gray-300">
                      Just 30 minutes from Salt Lake City's thriving tech scene and 15 minutes from world-class ski resorts. 
                      The area's natural beauty creates an inspiring work environment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="dark-card rounded-lg p-6 shadow-dark-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-accent-500/30">
                    <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Year-Round Recreation</h4>
                    <p className="text-gray-300">
                      World-class skiing and snowboarding in winter, hiking, mountain biking, and fly fishing in summer. 
                      Perfect for promoting work-life balance and team bonding.
                    </p>
                  </div>
                </div>
              </div>

              <div className="dark-card rounded-lg p-6 shadow-dark-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-accent-500/30">
                    <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Vibrant Community</h4>
                    <p className="text-gray-300">
                      Park City's vibrant downtown, excellent restaurants, and cultural events make it an ideal place to live and work. 
                      Plus, convenient travel with SLC's international airport nearby.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-white text-center mb-8">What Makes This Location Special</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="dark-card rounded-lg p-6 shadow-dark-lg text-center">
              <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-500/30">
                <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Tech Hub Access</h4>
              <p className="text-gray-300 text-sm">
                Close to Salt Lake City's thriving tech scene with networking opportunities and industry events.
              </p>
            </div>
            <div className="dark-card rounded-lg p-6 shadow-dark-lg text-center">
              <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-500/30">
                <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Outdoor Lifestyle</h4>
              <p className="text-gray-300 text-sm">
                World-class skiing, hiking, mountain biking, and year-round outdoor recreation opportunities.
              </p>
            </div>
            <div className="dark-card rounded-lg p-6 shadow-dark-lg text-center">
              <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-500/30">
                <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Easy Travel</h4>
              <p className="text-gray-300 text-sm">
                Salt Lake City International Airport just 45 minutes away for convenient business and leisure travel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
