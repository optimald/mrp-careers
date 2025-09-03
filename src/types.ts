export interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary_min?: number
  salary_max?: number
  currency?: string
  description_md: string
  requirements_md: string
  nice_to_haves_md?: string
  apply_url: string
  posted_at: string
  remote: boolean
  locations: string[]
  employment_type: string
  benefits?: string[]
  contact_info?: {
    email: string
    phone: string
  }
}

export interface Company {
  company_name: string
  industry: string
  company_size: string
  headquarters: string
  founded: string
  website: string
  description: string
  specialties: string[]
  funding: {
    last_round: string
    date: string
    investors: string[]
  }
  unique_features: string[]
  benefits: string[]
  hiring_process: {
    step: number
    title: string
    duration: string
    description: string
  }[]
  contact: {
    careers_email: string
    training_email: string
    phone: string
  }
}

export interface Review {
  id: string
  name: string
  role: string
  location: string
  rating: number
  quote: string
  department: string
  tenure: string
}

export interface TeamStory {
  id: string
  name: string
  role: string
  department: string
  photo: string
  quote: string
  story: string
  location: string
  tenure: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  department: string
  quote: string
  category: string
  rating: number
  tenure: string
  image: string
  pros: string[]
  con: string
}
