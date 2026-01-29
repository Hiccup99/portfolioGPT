import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PortfolioData } from '../types/portfolio'
import ProfilePicture from '../components/portfolio/ProfilePicture'
import Introduction from '../components/portfolio/Introduction'
import About from '../components/portfolio/About'
import Skills from '../components/portfolio/Skills'
import Projects from '../components/portfolio/Projects'
import WorkExperience from '../components/portfolio/WorkExperience'
import Awards from '../components/portfolio/Awards'
import GetInTouch from '../components/portfolio/GetInTouch'

export default function PortfolioPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<PortfolioData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('portfolioData')
    if (stored) {
      setData(JSON.parse(stored))
    } else {
      navigate('/')
    }
  }, [navigate])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-6 w-6 border-2 border-black border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="max-w-2xl mx-auto px-6 pt-20 pb-16">
        <ProfilePicture data={data.profile_picture} />
        <Introduction data={data.introduction} />
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pb-24 space-y-20">
        <About data={data.about} />
        <Skills data={data.skills} />
        <Projects data={data.projects} />
        <WorkExperience data={data.work_experience} />
        {data.awards.content.awards.length > 0 && <Awards data={data.awards} />}
        <GetInTouch data={data.get_in_touch} />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-100 py-8">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-neutral-400 hover:text-black transition-colors"
          >
            ← Back
          </button>
          <p className="text-sm text-neutral-400">
            Built with PortfolioGPT
          </p>
        </div>
      </footer>
    </div>
  )
}
