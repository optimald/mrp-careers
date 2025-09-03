import { useState } from 'react'
import type { Job } from '../types'

interface ReferralModalProps {
  isOpen: boolean
  onClose: () => void
  jobs: Job[]
  selectedJobId?: string
}

export default function ReferralModal({ isOpen, onClose, jobs, selectedJobId }: ReferralModalProps) {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    position: selectedJobId || '',
    relationship: '',
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create email content
    const selectedJob = jobs.find(job => job.id === formData.position)
    const jobTitle = selectedJob ? selectedJob.title : 'General Opportunity'
    
    const emailSubject = `Candidate Referral: ${formData.candidateName} for ${jobTitle}`
    const emailBody = `
Referrer Information:
- Name: ${formData.referrerName}
- Email: ${formData.referrerEmail}

Candidate Information:
- Name: ${formData.candidateName}
- Email: ${formData.candidateEmail}
- Phone: ${formData.candidatePhone}

Position: ${jobTitle}
Relationship: ${formData.relationship}

Additional Notes:
${formData.notes}

---
This referral was submitted through the MRP Careers website.
    `.trim()

    // Create mailto link
    const mailtoLink = `mailto:careers@mrp.io?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    
    // Open email client
    window.location.href = mailtoLink
    
    // Simulate submission success
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleClose = () => {
    setFormData({
      referrerName: '',
      referrerEmail: '',
      candidateName: '',
      candidateEmail: '',
      candidatePhone: '',
      position: selectedJobId || '',
      relationship: '',
      notes: ''
    })
    setIsSubmitted(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Refer a Candidate</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isSubmitted ? (
            // Success State
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Referral Submitted!</h3>
              <p className="text-gray-300 mb-6">
                Thank you for referring {formData.candidateName}. We'll review their information and reach out if there's a good fit.
              </p>
              <button
                onClick={handleClose}
                className="bg-accent-500 text-white px-6 py-3 rounded-lg hover:bg-accent-400 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Referrer Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="referrerName"
                      value={formData.referrerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="referrerEmail"
                      value={formData.referrerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              {/* Candidate Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Candidate Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Candidate Name *
                    </label>
                    <input
                      type="text"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                      placeholder="Enter candidate's name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Candidate Email *
                    </label>
                    <input
                      type="email"
                      name="candidateEmail"
                      value={formData.candidateEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                      placeholder="Enter candidate's email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Candidate Phone
                    </label>
                    <input
                      type="tel"
                      name="candidatePhone"
                      value={formData.candidatePhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                      placeholder="Enter candidate's phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Relationship *
                    </label>
                    <select
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    >
                      <option value="">Select relationship</option>
                      <option value="colleague">Colleague</option>
                      <option value="friend">Friend</option>
                      <option value="former-coworker">Former Coworker</option>
                      <option value="mentor">Mentor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Position *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                >
                  <option value="">Select a position</option>
                  <option value="general">General Opportunity</option>
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.title} - {job.department}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-600 border border-dark-500 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Tell us why this candidate would be a great fit for MRP..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Referral'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
