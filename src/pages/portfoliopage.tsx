import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PortfolioData } from '../types/portfolio'
import { DEMO_PORTFOLIOS, type DemoPersona, getPortfolioDesignProfile } from '../data/mockPortfolios'
import { getPageTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'
import ProfilePicture from '../components/portfolio/profilepicture'
import Introduction from '../components/portfolio/introduction'
import About from '../components/portfolio/about'
import Skills from '../components/portfolio/skills'
import Projects from '../components/portfolio/projects'
import WorkExperience from '../components/portfolio/workexperience'
import Awards from '../components/portfolio/awards'
import Testimonials from '../components/portfolio/testimonials'
import GetInTouch from '../components/portfolio/getintouch'
import Navbar from '../components/portfolio/navbar'

const PERSONA_INFO: Record<DemoPersona, { label: string; description: string; color: string }> = {
  finance: {
    label: 'Executive',
    description: 'Clean, structured, professional',
    color: 'from-slate-600 to-slate-800'
  },
  developer: {
    label: 'Developer',
    description: 'Monospace, minimal, tech-focused',
    color: 'from-emerald-500 to-emerald-700'
  },
  product: {
    label: 'Product',
    description: 'Balanced, modern, approachable',
    color: 'from-blue-500 to-cyan-500'
  },
  designer: {
    label: 'Designer',
    description: 'Visual, warm, structured creativity',
    color: 'from-rose-500 to-orange-500'
  }
}

export default function PortfolioPage() {
  const navigate = useNavigate()
  const [data, setData] = useState<PortfolioData | null>(null)
  const [demoMode, setDemoMode] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<DemoPersona>('product')

  useEffect(() => {
    window.scrollTo(0, 0)
    const stored = sessionStorage.getItem('portfolioData')

    // Check if we should use demo mode
    const urlParams = new URLSearchParams(window.location.search)
    const demo = urlParams.get('demo')

    if (demo === 'true') {
      setDemoMode(true)
      setData(DEMO_PORTFOLIOS.product)
    } else if (stored) {
      setData(JSON.parse(stored))
    } else {
      // If no data and not demo mode, show demo mode anyway
      setDemoMode(true)
      setData(DEMO_PORTFOLIOS.product)
    }
  }, [navigate])

  const handlePersonaChange = (persona: DemoPersona) => {
    setSelectedPersona(persona)
    setData(DEMO_PORTFOLIOS[persona])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-6 w-6 border-2 border-black border-t-transparent rounded-full" />
      </div>
    )
  }

  // Get page-level styles based on design profile
  const designProfile = getPortfolioDesignProfile(data)
  const pageTokens = getPageTokens(designProfile)
  const isDark = designProfile === 'technical-minimal'

  return (
    <div id="home" className={cn('min-h-screen', pageTokens.background, pageTokens.font)}>
      {/* Portfolio Navbar */}
      <Navbar
        designProfile={designProfile}
        linkedinUrl={data.meta?.linkedin_url}
        resumeUrl={data.meta?.resume_url}
        name={data.meta?.name}
      />

      {/* Demo Persona Switcher */}
      {demoMode && (
        <div className={`fixed top-14 left-0 right-0 z-40 backdrop-blur-lg border-b shadow-sm ${isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-neutral-200'}`}>
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-neutral-500'}`}>
                  Demo
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDark ? 'bg-emerald-900 text-emerald-400' : 'bg-blue-100 text-blue-700'}`}>
                  Switch personas
                </span>
              </div>
              <div className="flex gap-2">
                {(Object.keys(PERSONA_INFO) as DemoPersona[]).map((persona) => (
                  <button
                    key={persona}
                    onClick={() => handlePersonaChange(persona)}
                    className={`
                      relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                      ${selectedPersona === persona
                        ? `bg-gradient-to-r ${PERSONA_INFO[persona].color} text-white shadow-lg`
                        : isDark
                          ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }
                    `}
                  >
                    {PERSONA_INFO[persona].label}
                  </button>
                ))}
              </div>
            </div>
            <p className={`text-xs mt-2 ${isDark ? 'text-zinc-500' : 'text-neutral-500'}`}>
              {PERSONA_INFO[selectedPersona].description} — Same components, styling from design_profile
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={cn(
        "max-w-2xl mx-auto px-6 pb-16",
        demoMode ? "pt-32" : "pt-20"
      )}>
        <ProfilePicture data={data.profile_picture} />
        <Introduction data={data.introduction} />
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pb-24 space-y-24">
        <About data={data.about} />
        <Skills data={data.skills} />
        <Projects data={data.projects} />
        <WorkExperience data={data.work_experience} />
        {data.awards.content.awards.length > 0 && <Awards data={data.awards} />}
        {data.testimonials?.content.testimonials.length > 0 && <Testimonials data={data.testimonials} />}
        <div id="contact">
          <GetInTouch data={data.get_in_touch} />
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 ${isDark ? 'border-zinc-800' : 'border-neutral-100'}`}>
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className={`text-sm transition-colors ${isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-neutral-400 hover:text-black'}`}
          >
            ← Back
          </button>
          <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-neutral-400'}`}>
            Designed and developed with <span className="text-red-500">❤️</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
