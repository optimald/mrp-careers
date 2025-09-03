import type { Company } from '../types'

interface WhyMRPProps {
  company: Company | null
}

export default function WhyMRP({ company }: WhyMRPProps) {
  const features = [
    {
      title: "Sell with purpose",
      description: "We don't just sell devices - we match clinics with the right solutions",
      icon: "💼"
    },
    {
      title: "Train for success",
      description: "Comprehensive training ensures every device delivers results",
      icon: "🎓"
    },
    {
      title: "Transport safely",
      description: "Lowest failure rate in the industry with our private delivery network",
      icon: "🚚"
    },
    {
      title: "Support always",
      description: "Ongoing support from sale through training to delivery",
      icon: "🤝"
    }
  ]

  return (
    <section id="why-mrp" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why MRP?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're the complete solution for medical aesthetic professionals - selling the right devices, providing expert training, and ensuring safe delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Company unique features */}
        {company?.unique_features && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              What makes us different
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.unique_features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-mrp-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
