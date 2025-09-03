import type { Company } from '../types'

interface HeroProps {
  company: Company | null
}

export default function Hero({ }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-mrp-50 to-blue-50 py-20 overflow-hidden">
      {/* Background building image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/mrp-building-wide-optimized.webp" type="image/webp" />
          <img 
            src="/images/mrp-building-wide-optimized.jpg" 
            alt="MRP Building" 
            className="w-full h-full object-cover opacity-30"
          />
        </picture>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sell, train, and transport the devices that transform practices.{' '}
            <span className="text-mrp-600">Join MRP.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're the trusted partner for medical aesthetic professionals. We sell the devices, provide the training, 
            and ensure safe delivery to clinics across North America.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#jobs"
              className="bg-mrp-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-mrp-700 transition-colors"
            >
              See open roles
            </a>
            <a
              href="mailto:careers@mrp.io?subject=Referral"
              className="border-2 border-mrp-600 text-mrp-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-mrp-50 transition-colors"
            >
              Refer a candidate
            </a>
          </div>

          {/* Building Image */}
          <div className="mt-16 mb-12">
            <div className="max-w-6xl mx-auto">
              <img 
                src="/images/mrp-building-optimized.jpg" 
                alt="MRP Building - Park City, Utah" 
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Proof points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-mrp-600 mb-2">Largest</div>
              <div className="text-gray-600">Private delivery network in aesthetics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mrp-600 mb-2">Lowest</div>
              <div className="text-gray-600">Failure rate in the industry</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mrp-600 mb-2">Trusted</div>
              <div className="text-gray-600">By clinics across North America</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
