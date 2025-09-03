import { useState, useEffect } from 'react'
import type { Job } from '../types'
import JobCard from './JobCard'

interface JobListingsProps {
  jobs: Job[]
}

export default function JobListings({ jobs }: JobListingsProps) {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedType, setSelectedType] = useState('All')

  const departments = ['All', ...Array.from(new Set(jobs.map(job => job.department)))]
  const locations = ['All', ...Array.from(new Set(jobs.map(job => job.location)))]
  const types = ['All', ...Array.from(new Set(jobs.map(job => job.type)))]

  const handleFilter = () => {
    let filtered = jobs

    if (selectedDepartment !== 'All') {
      filtered = filtered.filter(job => job.department === selectedDepartment)
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(job => job.location === selectedLocation)
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(job => job.type === selectedType)
    }

    setFilteredJobs(filtered)
  }

  // Update filtered jobs when jobs data or filters change
  useEffect(() => {
    if (jobs.length > 0) {
      handleFilter()
    }
  }, [jobs, selectedDepartment, selectedLocation, selectedType])

  return (
    <section id="jobs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Open Roles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our team and help us sell, train, and transport the aesthetic devices that transform practices
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mrp-500 focus:border-mrp-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mrp-500 focus:border-mrp-500"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mrp-500 focus:border-mrp-500"
          >
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs match your current filters.</p>
            <button
              onClick={() => {
                setSelectedDepartment('All')
                setSelectedLocation('All')
                setSelectedType('All')
              }}
              className="mt-4 text-mrp-600 hover:text-mrp-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
