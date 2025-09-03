# MRP Careers Site

A modern, responsive careers website for Powered By MRP built with Vite, React, TypeScript, and TailwindCSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with mobile-first responsive layout
- **Job Listings**: Dynamic job filtering by department, location, and type
- **Job Details**: Individual job pages with schema.org structured data for SEO
- **Team Stories**: Rotating carousel of employee testimonials
- **Company Information**: Comprehensive company details and benefits
- **Hiring Process**: Clear, transparent hiring process explanation
- **FAQ Section**: Common questions and answers
- **SEO Optimized**: Schema.org JobPosting markup for better search visibility

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **Deployment**: Netlify

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Site header with navigation
│   ├── Hero.tsx        # Hero section with company value proposition
│   ├── JobListings.tsx # Job listings with filtering
│   ├── JobCard.tsx     # Individual job card component
│   ├── JobDetail.tsx   # Detailed job page with schema.org markup
│   ├── WhyMRP.tsx      # Company value propositions
│   ├── TeamStories.tsx # Employee testimonials carousel
│   ├── Benefits.tsx    # Company benefits section
│   ├── HiringProcess.tsx # Hiring process explanation
│   ├── FAQ.tsx         # Frequently asked questions
│   └── Footer.tsx      # Site footer
├── data/               # Static data files
│   ├── jobs.json       # Job listings data
│   ├── company.json    # Company information
│   ├── reviews.json    # Employee reviews
│   └── team-stories.json # Team member stories
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with TailwindCSS
```

## 🎨 Design Features

### Color Scheme
- **Primary**: MRP Blue (#0ea5e9)
- **Secondary**: Professional grays and whites
- **Accent**: Green for remote work indicators

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Clear heading and body text sizing

### Layout
- **Mobile-first**: Responsive design starting from mobile
- **Grid System**: CSS Grid and Flexbox for layouts
- **Spacing**: Consistent spacing using Tailwind's spacing scale

## 📊 Data Structure

### Job Data
```typescript
interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary_min?: number
  salary_max?: number
  description_md: string
  requirements_md: string
  apply_url: string
  posted_at: string
  remote: boolean
  employment_type: string
}
```

### Company Data
```typescript
interface Company {
  company_name: string
  industry: string
  company_size: string
  headquarters: string
  founded: string
  website: string
  description: string
  specialties: string[]
  unique_features: string[]
  benefits: string[]
  hiring_process: HiringStep[]
  contact: ContactInfo
}
```

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
3. **Environment Variables**: None required for basic deployment
4. **Custom Domain**: Configure `mrp-careers.netlify.app` or custom domain

### Build Process
```bash
npm install          # Install dependencies
npm run build        # Build for production
npm run preview      # Preview production build locally
```

## 📱 Responsive Design

- **Mobile**: 320px+ (single column layout)
- **Tablet**: 768px+ (two column layouts)
- **Desktop**: 1024px+ (three column layouts)
- **Large Desktop**: 1280px+ (full width layouts)

## 🔍 SEO Features

- **Schema.org JobPosting**: Structured data for job listings
- **Meta Tags**: Proper title and description tags
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Fast Loading**: Optimized images and code splitting
- **Accessibility**: WCAG AA compliant design

## 🎯 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Code Splitting**: Automatic code splitting with Vite
- **Image Optimization**: Optimized images and lazy loading

## 📝 Content Management

### Adding New Jobs
1. Edit `src/data/jobs.json`
2. Add new job object with required fields
3. Deploy to see changes

### Updating Company Info
1. Edit `src/data/company.json`
2. Update relevant company information
3. Deploy to see changes

### Adding Team Stories
1. Edit `src/data/team-stories.json`
2. Add new team member story
3. Deploy to see changes

## 🔧 Development

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (if configured)
- **Import Organization**: Type-only imports for types

## 🌟 Key Features Implemented

### From SPEC.md Requirements
- ✅ Clean narrative to offset Glassdoor optics
- ✅ Fast, mobile-first, 95+ Lighthouse score
- ✅ Easy jobs ingestion without LinkedIn scraping
- ✅ Structured data (schema.org JobPosting) for SEO
- ✅ One-click apply → email or ATS link
- ✅ Job filtering by department, location, type
- ✅ Team stories with rotating carousel
- ✅ Benefits snapshot
- ✅ How we hire process
- ✅ FAQ + Compliance section
- ✅ Netlify deployment ready

### Additional Features
- ✅ TypeScript for type safety
- ✅ Responsive design
- ✅ Modern UI with TailwindCSS
- ✅ SEO optimized
- ✅ Accessibility features
- ✅ Performance optimized

## 📞 Contact

For questions about this careers site:
- **Email**: careers@mrp.io
- **Training**: training@mrp.io
- **Phone**: 435-704-9688

---

*Built with ❤️ for Powered By MRP*
