import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Job } from '../types'
import ReferralModal from './ReferralModal'

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)
  const formatSalary = () => {
    if (job.salary_min && job.salary_max) {
      return `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
    }
    return 'Competitive salary'
  }

  return (
    <div className="dark-card rounded-lg p-6 hover:shadow-dark-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-xl font-semibold text-white mb-2">
            <Link 
              to={`/careers/${job.id}`}
              className="hover:text-accent-400 transition-colors"
            >
              {job.title}
            </Link>
          </h3>
          <p className="text-gray-300">{job.department}</p>
        </div>
        <span className="bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full text-sm font-medium border border-accent-500/30 flex-shrink-0 whitespace-nowrap">
          {job.type}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>
        
        {job.remote && (
          <div className="flex items-center text-green-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Remote friendly
          </div>
        )}

        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          {formatSalary()}
        </div>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-3">
        {job.description_md}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Posted {job.posted_at}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsReferralModalOpen(true)}
            className="border border-gray-600 text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-300 text-sm"
          >
            Refer
          </button>
          <a
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-400 transition-all duration-300 shadow-glow-orange"
          >
            Apply now
          </a>
        </div>
      </div>

      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        jobs={[job]}
        selectedJobId={job.id}
      />
    </div>
  )
}
