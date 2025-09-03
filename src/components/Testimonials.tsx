import type { Testimonial } from '../types'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  // Group testimonials by category
  const executives = testimonials.filter(t => t.category === 'executives')
  const sales = testimonials.filter(t => t.category === 'sales')
  const operations = testimonials.filter(t => t.category === 'operations')
  const it = testimonials.filter(t => t.category === 'it')
  const hr = testimonials.filter(t => t.category === 'hr')
  const biomed = testimonials.filter(t => t.category === 'biomedical')
  const logistics = testimonials.filter(t => t.category === 'logistics')
  const accounting = testimonials.filter(t => t.category === 'accounting')
  const service = testimonials.filter(t => t.category === 'service')
  const training = testimonials.filter(t => t.category === 'training')
  const procurement = testimonials.filter(t => t.category === 'procurement')
  const marketing = testimonials.filter(t => t.category === 'marketing')
  const legal = testimonials.filter(t => t.category === 'legal')
  const unknown = testimonials.filter(t => t.category === 'unknown')

  const TestimonialCard = ({ testimonial, size = 'medium' }: { testimonial: Testimonial, size?: 'small' | 'medium' | 'large' }) => {
    const sizeClasses = {
      small: 'p-4 text-sm',
      medium: 'p-6 text-base',
      large: 'p-8 text-lg'
    }

    const renderStars = (rating: number) => {
      const stars = []
      const fullStars = Math.floor(rating)
      const hasHalfStar = rating % 1 !== 0
      
      for (let i = 0; i < fullStars; i++) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        )
      }
      
      if (hasHalfStar) {
        stars.push(
          <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="currentColor"/>
                <stop offset="50%" stopColor="transparent"/>
              </linearGradient>
            </defs>
            <path fill="url(#half-star)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        )
      }
      
      return stars
    }

    return (
      <div className={`bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${sizeClasses[size]}`}>
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 bg-mrp-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <span className="text-white font-bold text-lg">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
            <p className="text-mrp-600 font-medium">{testimonial.role}</p>
            <p className="text-gray-500 text-sm">{testimonial.tenure}</p>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {renderStars(testimonial.rating)}
              </div>
              <span className="ml-2 text-sm text-gray-600">{testimonial.rating}/5</span>
            </div>
          </div>
        </div>
        
        <blockquote className="text-gray-700 italic mb-4">
          "{testimonial.quote}"
        </blockquote>
        
        <div className="border-t pt-4">
          <div className="mb-3">
            <h5 className="text-sm font-semibold text-green-600 mb-2">Strengths:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {testimonial.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-orange-600 mb-2">Growth Area:</h5>
            <p className="text-sm text-gray-600 flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              {testimonial.con}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  )

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Voices from Our Team" 
          subtitle="Real stories from real people who make MRP's mission possible"
        />

        {/* Executive Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executives.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="large" />
            ))}
          </div>
        </div>

        {/* Sales Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Sales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sales.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                size={index % 3 === 0 ? 'large' : 'small'} 
              />
            ))}
          </div>
        </div>

        {/* Operations Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Operations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operations.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="medium" />
            ))}
          </div>
        </div>

        {/* IT Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From IT & Technology</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {it.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="medium" />
            ))}
          </div>
        </div>

        {/* HR Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From HR</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hr.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="large" />
            ))}
          </div>
        </div>

        {/* Biomedical Engineering Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Biomedical Engineering</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biomed.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="medium" />
            ))}
          </div>
        </div>

        {/* Logistics Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Logistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {logistics.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="large" />
            ))}
          </div>
        </div>

        {/* Accounting Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Accounting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounting.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="large" />
            ))}
          </div>
        </div>

        {/* Service Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="medium" />
            ))}
          </div>
        </div>

        {/* Training Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Training</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {training.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="large" />
            ))}
          </div>
        </div>

        {/* Procurement Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Procurement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {procurement.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="large" />
            ))}
          </div>
        </div>

        {/* Marketing & Legal Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Marketing & Legal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...marketing, ...legal].map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="large" />
            ))}
          </div>
        </div>

        {/* Other Team Members Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">From Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unknown.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} size="medium" />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Team?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of a company where your voice matters, your work has impact, and your growth is supported.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#jobs"
              className="bg-mrp-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-mrp-700 transition-colors"
            >
              View Open Positions
            </a>
            <a
              href="mailto:careers@mrp.io?subject=General%20Inquiry"
              className="border-2 border-mrp-600 text-mrp-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-mrp-50 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
