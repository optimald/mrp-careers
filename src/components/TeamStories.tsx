import { useState } from 'react'
import type { TeamStory } from '../types'

interface TeamStoriesProps {
  teamStories: TeamStory[]
}

export default function TeamStories({ teamStories }: TeamStoriesProps) {
  const [currentStory, setCurrentStory] = useState(0)

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % teamStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + teamStories.length) % teamStories.length)
  }

  if (teamStories.length === 0) return null

  const story = teamStories[currentStory]

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-mrp-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Our Team Loves Working at MRP
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who make our mission possible
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-mrp-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {story.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {story.name}
              </h3>
              <p className="text-mrp-600 font-medium">
                {story.role} • {story.department}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {story.location} • {story.tenure}
              </p>
            </div>

            <blockquote className="text-xl text-gray-700 text-center mb-8 italic">
              "{story.quote}"
            </blockquote>

            <p className="text-gray-600 text-center">
              {story.story}
            </p>

            {/* Navigation */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={prevStory}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                aria-label="Previous story"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex space-x-2">
                {teamStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStory ? 'bg-mrp-600' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to story ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextStory}
                className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                aria-label="Next story"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
