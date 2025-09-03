import { useState } from 'react'
import type { Company, Job } from '../types'
import ReferralModal from './ReferralModal'

interface HeroProps {
  company: Company | null
  jobs: Job[]
}

export default function Hero({ jobs }: HeroProps) {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  return (
    <section className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 py-20 overflow-hidden">
      {/* Background building image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/mrp-building-wide-optimized.webp" type="image/webp" />
          <img 
            src="/images/mrp-building-wide-optimized.jpg" 
            alt="MRP Building" 
            className="w-full h-full object-cover opacity-20"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/80 via-dark-800/60 to-dark-700/80"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sell, train, and transport the devices that transform practices.{' '}
            <span className="text-accent-500 bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">Join MRP.</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We're the trusted partner for medical aesthetic professionals. We sell the devices, provide the training, 
            and ensure safe delivery to clinics across North America.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#jobs"
              className="bg-accent-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-400 transition-all duration-300 shadow-glow-orange hover:shadow-glow-orange"
            >
              See open roles
            </a>
            <button
              onClick={() => setIsReferralModalOpen(true)}
              className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-600 hover:text-white transition-all duration-300"
            >
              Refer a candidate
            </button>
          </div>

          {/* Building Image */}
          <div className="mt-16 mb-12">
            <div className="max-w-6xl mx-auto">
              <img 
                src="/images/mrp-building-optimized.jpg" 
                alt="MRP Building - Park City, Utah" 
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-dark-lg border border-dark-600"
              />
            </div>
          </div>

          {/* Proof points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center dark-card p-6 rounded-xl">
              <div className="text-3xl font-bold text-accent-500 mb-2">Largest</div>
              <div className="text-gray-300">Private delivery network in aesthetics</div>
            </div>
            <div className="text-center dark-card p-6 rounded-xl">
              <div className="text-3xl font-bold text-accent-500 mb-2">Lowest</div>
              <div className="text-gray-300">Failure rate in the industry</div>
            </div>
            <div className="text-center dark-card p-6 rounded-xl">
              <div className="text-3xl font-bold text-accent-500 mb-2">Trusted</div>
              <div className="text-gray-300">By clinics across North America</div>
            </div>
          </div>
        </div>
      </div>

      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        jobs={jobs}
      />
    </section>
  )
}
