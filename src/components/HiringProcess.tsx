import type { Company } from '../types'

interface HiringProcessProps {
  company: Company | null
}

export default function HiringProcess({ company }: HiringProcessProps) {
  const process = company?.hiring_process || [
    {
      step: 1,
      title: "Intro",
      duration: "30 min",
      description: "Initial conversation to understand your background and interests"
    },
    {
      step: 2,
      title: "Technical/Role Deep Dive",
      duration: "60–90 min",
      description: "Role-specific technical assessment and skills evaluation"
    },
    {
      step: 3,
      title: "Team Panel",
      duration: "60 min",
      description: "Meet the team and discuss culture fit"
    }
  ]

  return (
    <section id="hiring" className="py-20 bg-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How We Hire
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Simple, transparent process. Offer within 5 business days.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-accent-400 font-medium mb-3">
                  {step.duration}
                </p>
                <p className="text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="dark-card rounded-lg p-6 max-w-2xl mx-auto shadow-dark-lg">
              <h3 className="text-lg font-semibold text-white mb-2">
                Quick turnaround
              </h3>
              <p className="text-gray-300">
                We respect your time. Expect to hear back within 5 business days after your final interview.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
