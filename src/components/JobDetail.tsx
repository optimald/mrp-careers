import { useParams, Link } from 'react-router-dom'
import type { Job, Company } from '../types'

interface JobDetailProps {
  jobs: Job[]
  company: Company | null
}

export default function JobDetail({ jobs, company }: JobDetailProps) {
  const { id } = useParams<{ id: string }>()
  const job = jobs.find(j => j.id === id)

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h1>
          <Link to="/" className="text-mrp-600 hover:text-mrp-700">
            ← Back to all jobs
          </Link>
        </div>
      </div>
    )
  }

  const formatSalary = () => {
    if (job.salary_min && job.salary_max) {
      return `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
    }
    return 'Competitive salary'
  }

  const formatRequirements = (requirements: string) => {
    return requirements.split('\n').filter(req => req.trim())
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/" className="text-mrp-600 hover:text-mrp-700 mb-4 inline-block">
            ← Back to all jobs
          </Link>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="bg-mrp-100 text-mrp-800 px-3 py-1 rounded-full text-sm font-medium">
                  {job.type}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </span>
                {job.remote && (
                  <span className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Remote friendly
                  </span>
                )}
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {formatSalary()}
                </span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <a
                href={job.apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-mrp-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-mrp-700 transition-colors inline-block"
              >
                Apply now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this role</h2>
              <p className="text-gray-700 mb-8">{job.description_md}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-2 mb-8">
                {formatRequirements(job.requirements_md).map((req, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-mrp-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{req.replace(/^-\s*/, '')}</span>
                  </li>
                ))}
              </ul>

              {job.nice_to_haves_md && (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Nice to have</h3>
                  <ul className="space-y-2 mb-8">
                    {formatRequirements(job.nice_to_haves_md).map((req, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{req.replace(/^-\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {job.benefits && (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
                  <ul className="space-y-2 mb-8">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job details</h3>
              
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Department</dt>
                  <dd className="text-gray-900">{job.department}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="text-gray-900">{job.location}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Employment type</dt>
                  <dd className="text-gray-900">{job.employment_type}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Posted</dt>
                  <dd className="text-gray-900">{job.posted_at}</dd>
                </div>

                {job.contact_info && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact</dt>
                    <dd className="text-gray-900">
                      <a href={`mailto:${job.contact_info.email}`} className="text-mrp-600 hover:text-mrp-700">
                        {job.contact_info.email}
                      </a>
                      <br />
                      <a href={`tel:${job.contact_info.phone}`} className="text-mrp-600 hover:text-mrp-700">
                        {job.contact_info.phone}
                      </a>
                    </dd>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-mrp-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-mrp-700 transition-colors text-center block"
                >
                  Apply for this role
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": job.title,
            "description": job.description_md,
            "hiringOrganization": {
              "@type": "Organization",
              "name": company?.company_name || "Powered By MRP",
              "url": company?.website || "http://www.mrp.io"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": job.location
              }
            },
            "employmentType": job.employment_type,
            "datePosted": job.posted_at,
            "baseSalary": job.salary_min && job.salary_max ? {
              "@type": "MonetaryAmount",
              "currency": job.currency || "USD",
              "value": {
                "@type": "QuantitativeValue",
                "minValue": job.salary_min,
                "maxValue": job.salary_max,
                "unitText": "YEAR"
              }
            } : undefined
          })
        }}
      />
    </div>
  )
}
