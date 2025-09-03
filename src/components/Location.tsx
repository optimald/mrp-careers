import type { Company } from '../types'

interface LocationProps {
  company: Company | null
}

export default function Location({ company }: LocationProps) {
  return (
    <section id="location" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Amazing Location</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Located in the heart of Utah's Wasatch Mountains, our Park City headquarters offers the perfect blend of outdoor adventure and professional opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Location Info */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">📍 Our Address</h3>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <p className="text-lg font-semibold text-gray-900 mb-2">2720 Rasmussen Rd A3</p>
                <p className="text-lg text-gray-700 mb-4">Park City, UT 84098</p>
                <a
                  href="https://maps.google.com/?q=2720+Rasmussen+Rd+A3,+Park+City,+UT+84098"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-mrp-600 text-white rounded-lg hover:bg-mrp-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">🚗 Perfectly Positioned</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-mrp-600 mb-1">30 min</div>
                  <div className="text-sm text-gray-600">to Salt Lake City</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-mrp-600 mb-1">15 min</div>
                  <div className="text-sm text-gray-600">to Park City Resort</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-mrp-600 mb-1">45 min</div>
                  <div className="text-sm text-gray-600">to SLC Airport</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                  <div className="text-2xl font-bold text-mrp-600 mb-1">∞</div>
                  <div className="text-sm text-gray-600">Outdoor Adventures</div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Park City is Amazing */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Park City is Amazing</h3>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-mrp-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-mrp-600 font-bold">🏔️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mountain Paradise</h4>
                    <p className="text-gray-600">
                      Just 30 minutes from Salt Lake City's thriving tech scene and 15 minutes from world-class ski resorts. 
                      The area's natural beauty creates an inspiring work environment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-mrp-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-mrp-600 font-bold">🎿</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Year-Round Recreation</h4>
                    <p className="text-gray-600">
                      World-class skiing and snowboarding in winter, hiking, mountain biking, and fly fishing in summer. 
                      Perfect for promoting work-life balance and team bonding.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-mrp-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-mrp-600 font-bold">🏙️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Vibrant Community</h4>
                    <p className="text-gray-600">
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
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">What Makes This Location Special</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-mrp-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Tech Hub Access</h4>
              <p className="text-gray-600 text-sm">
                Close to Salt Lake City's thriving tech scene with networking opportunities and industry events.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-mrp-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⛷️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Outdoor Lifestyle</h4>
              <p className="text-gray-600 text-sm">
                World-class skiing, hiking, mountain biking, and year-round outdoor recreation opportunities.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-mrp-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✈️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Easy Travel</h4>
              <p className="text-gray-600 text-sm">
                Salt Lake City International Airport just 45 minutes away for convenient business and leisure travel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
