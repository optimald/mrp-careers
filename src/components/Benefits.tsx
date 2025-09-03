import type { Company } from '../types'

interface BenefitsProps {
  company: Company | null
}

export default function Benefits({ company }: BenefitsProps) {
  const benefits = company?.benefits || [
    "Medical/Dental/Vision",
    "401(k) match",
    "Generous PTO",
    "Remote stipend",
    "Learning budget",
    "Top-tier hardware"
  ]

  return (
    <section id="benefits" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Benefits Snapshot
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We invest in our team's health, growth, and success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="dark-card rounded-lg p-6 shadow-dark-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent-500/20 rounded-full flex items-center justify-center border border-accent-500/30">
                  <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-medium">{benefit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#hiring"
            className="text-accent-400 hover:text-accent-300 font-medium transition-colors"
          >
            Learn more about our hiring process →
          </a>
        </div>
      </div>
    </section>
  )
}
