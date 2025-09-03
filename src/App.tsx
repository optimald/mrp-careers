import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import JobListings from './components/JobListings'
import WhyMRP from './components/WhyMRP'
import Testimonials from './components/Testimonials'
import Benefits from './components/Benefits'
import HiringProcess from './components/HiringProcess'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import JobDetail from './components/JobDetail'
import type { Job, Company, Review, Testimonial } from './types'

function App() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [company, setCompany] = useState<Company | null>(null)
  const [, setReviews] = useState<Review[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    // Load data
    import('./data/jobs.json').then(module => setJobs(module.default))
    import('./data/company.json').then(module => setCompany(module.default))
    import('./data/reviews.json').then(module => setReviews(module.default))
    import('./data/testimonials.json').then(module => setTestimonials(module.default))
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero company={company} />
              <Testimonials testimonials={testimonials} />
              <JobListings jobs={jobs} />
              <WhyMRP company={company} />
              <Benefits company={company} />
              <HiringProcess company={company} />
              <FAQ company={company} />
            </>
          } />
          <Route path="/careers/:id" element={<JobDetail jobs={jobs} company={company} />} />
        </Routes>
        <Footer company={company} />
      </div>
    </Router>
  )
}

export default App