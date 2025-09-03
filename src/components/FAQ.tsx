import { useState } from 'react'
import type { Company } from '../types'

interface FAQProps {
  company: Company | null
}

export default function FAQ({ company }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Do you sponsor visas?",
      answer: "We're open to sponsoring visas for exceptional candidates. Please mention your visa status in your application."
    },
    {
      question: "What's your remote work policy?",
      answer: "We offer flexible remote work options. Most roles can be done remotely, with some requiring occasional travel to our Park City headquarters."
    },
    {
      question: "Do you cover interview travel costs?",
      answer: "Yes, we cover all reasonable travel expenses for in-person interviews, including flights, accommodation, and meals."
    },
    {
      question: "What's the company culture like?",
      answer: "We're a collaborative, results-driven team focused on building the marketplace that connects medical aesthetic professionals with the right devices and support. We value autonomy, ownership, and continuous learning."
    },
    {
      question: "How do you handle equity?",
      answer: "We offer competitive equity packages for full-time employees. Details are discussed during the offer process."
    },
    {
      question: "What's the growth trajectory?",
      answer: "We're a fast-growing Series A company with significant funding and expansion plans. There are many opportunities for career growth and advancement."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FAQ
          </h2>
          <p className="text-xl text-gray-600">
            Common questions about working at MRP
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Reach out to our team at{' '}
              <a
                href={`mailto:${company?.contact.careers_email || 'careers@mrp.io'}`}
                className="text-mrp-600 hover:text-mrp-700 font-medium"
              >
                {company?.contact.careers_email || 'careers@mrp.io'}
              </a>
            </p>
            <p className="text-sm text-gray-500">
              MRP is an Equal Opportunity Employer committed to diversity and inclusion.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
