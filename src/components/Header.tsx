import { useState } from 'react'
import ReferralModal from './ReferralModal'
import type { Job } from '../types'

interface HeaderProps {
  jobs: Job[]
}

export default function Header({ jobs }: HeaderProps) {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)

  return (
    <>
      <header className="bg-dark-800/95 backdrop-blur-sm border-b border-dark-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex flex-col items-start">
                <img 
                  src="/mrp-logo-white-header.png" 
                  alt="MRP Logo" 
                  className="h-8 w-auto mb-1"
                />
                <span className="text-sm font-medium text-gray-300">
                  Powered by People
                </span>
              </a>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#jobs" className="text-gray-300 hover:text-white transition-colors">
                Open Roles
              </a>
              <a href="#why-mrp" className="text-gray-300 hover:text-white transition-colors">
                Why MRP
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                Team Stories
              </a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">
                Benefits
              </a>
              <a href="#hiring" className="text-gray-300 hover:text-white transition-colors">
                How We Hire
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsReferralModalOpen(true)}
                className="text-gray-300 hover:text-white font-medium transition-colors"
              >
                Refer a candidate
              </button>
              <a
                href="#jobs"
                className="bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-400 transition-all duration-300 shadow-glow-orange"
              >
                See open roles
              </a>
            </div>
          </div>
        </div>
      </header>

      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        jobs={jobs}
      />
    </>
  )
}
