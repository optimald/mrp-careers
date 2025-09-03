export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img 
                src="/images/mrp-logo.jpg" 
                alt="MRP Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-semibold text-gray-900">
                Powered by People
              </span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#jobs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Open Roles
            </a>
            <a href="#why-mrp" className="text-gray-600 hover:text-gray-900 transition-colors">
              Why MRP
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
              Team Stories
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">
              Benefits
            </a>
            <a href="#hiring" className="text-gray-600 hover:text-gray-900 transition-colors">
              How We Hire
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="mailto:careers@mrp.io?subject=Referral"
              className="text-mrp-600 hover:text-mrp-700 font-medium transition-colors"
            >
              Refer a candidate
            </a>
            <a
              href="#jobs"
              className="bg-mrp-600 text-white px-4 py-2 rounded-lg hover:bg-mrp-700 transition-colors"
            >
              See open roles
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
