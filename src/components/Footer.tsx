import type { Company } from '../types'

interface FooterProps {
  company: Company | null
}

export default function Footer({ company }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-mrp-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MRP</span>
              </div>
              <span className="text-xl font-semibold">
                Powered by People
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {company?.description || 'Building the future of medical aesthetics through technology-first solutions.'}
            </p>
            <div className="flex space-x-4">
              <a
                href={company?.website || 'http://www.mrp.io'}
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
              <a
                href="https://linkedin.com/company/poweredbymrp"
                className="text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#jobs" className="text-gray-300 hover:text-white transition-colors">
                  Open Roles
                </a>
              </li>
              <li>
                <a href="#why-mrp" className="text-gray-300 hover:text-white transition-colors">
                  Why MRP
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Team Stories
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#hiring" className="text-gray-300 hover:text-white transition-colors">
                  How We Hire
                </a>
              </li>
              <li>
                <a href="#location" className="text-gray-300 hover:text-white transition-colors">
                  Our Location
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${company?.contact.careers_email || 'careers@mrp.io'}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {company?.contact.careers_email || 'careers@mrp.io'}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company?.contact.training_email || 'training@mrp.io'}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {company?.contact.training_email || 'training@mrp.io'}
                </a>
              </li>
              <li className="text-gray-300">
                {company?.contact.phone || '435-704-9688'}
              </li>
              <li className="text-gray-300">
                2720 Rasmussen Rd A3<br />
                Park City, UT 84098
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Powered by People. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
