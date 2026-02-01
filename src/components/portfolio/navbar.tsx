import { useState, useEffect } from 'react'
import { Home, Linkedin, FileText, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DesignProfile } from '@/types/portfolio'
import { cn } from '@/lib/utils'

interface NavbarProps {
  designProfile: DesignProfile
  linkedinUrl?: string
  resumeUrl?: string
  name?: string
}

// Navbar styles per design profile - modernized with glassmorphism
const navbarStyles: Record<string, {
  container: string
  text: string
  activeText: string
  logo: string
  pill: string
}> = {
  'technical-minimal': {
    container: 'bg-slate-900/70 backdrop-blur-xl border-slate-700/50 shadow-lg shadow-slate-900/20',
    text: 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10',
    activeText: 'text-emerald-400 bg-emerald-400/10',
    logo: 'text-slate-100 hover:text-emerald-400',
    pill: 'bg-slate-800/50',
  },
  'product-thinker': {
    container: 'bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-lg shadow-slate-200/50',
    text: 'text-slate-500 hover:text-blue-600 hover:bg-blue-50',
    activeText: 'text-blue-600 bg-blue-50',
    logo: 'text-slate-800 hover:text-blue-600',
    pill: 'bg-slate-100/50',
  },
  'product-designer': {
    container: 'bg-white/70 backdrop-blur-xl border-rose-100/50 shadow-lg shadow-rose-100/50',
    text: 'text-stone-500 hover:text-rose-600 hover:bg-rose-50',
    activeText: 'text-rose-600 bg-rose-50',
    logo: 'text-stone-800 hover:text-rose-600',
    pill: 'bg-rose-50/50',
  },
  'executive-clean': {
    container: 'bg-white/70 backdrop-blur-xl border-amber-100/50 shadow-lg shadow-amber-100/50',
    text: 'text-neutral-500 hover:text-amber-700 hover:bg-amber-50',
    activeText: 'text-amber-700 bg-amber-50',
    logo: 'text-neutral-800 hover:text-amber-700',
    pill: 'bg-amber-50/50',
  },
}

export default function Navbar({ designProfile, linkedinUrl, resumeUrl, name }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const styles = navbarStyles[designProfile] || navbarStyles['product-thinker']

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Determine active section based on scroll position
      const contactSection = document.getElementById('contact')
      
      if (contactSection) {
        const contactTop = contactSection.getBoundingClientRect().top
        if (contactTop < window.innerHeight / 2) {
          setActiveSection('contact')
        } else {
          setActiveSection('home')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openLinkedIn = () => {
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const downloadResume = () => {
    if (resumeUrl) {
      // Handle both data URLs and regular URLs
      if (resumeUrl.startsWith('data:')) {
        // Create a download link for data URL
        const link = document.createElement('a')
        link.href = resumeUrl
        link.download = `${name || 'resume'}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // Regular URL - open in new tab
        window.open(resumeUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      onClick: scrollToTop,
      show: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      onClick: openLinkedIn,
      show: !!linkedinUrl,
    },
    {
      id: 'resume',
      label: 'Resume',
      icon: FileText,
      onClick: downloadResume,
      show: !!resumeUrl,
    },
    {
      id: 'contact',
      label: 'Get in Touch',
      icon: Mail,
      onClick: scrollToContact,
      show: true,
    },
  ]

  return (
    <nav
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50',
        'transition-all duration-500 ease-out',
        'border rounded-full',
        'px-2 py-1.5',
        styles.container,
        isScrolled 
          ? 'scale-[0.98] opacity-95' 
          : 'scale-100 opacity-100'
      )}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Logo / Name */}
        <button
          onClick={scrollToTop}
          className={cn(
            'font-semibold text-base tracking-tight transition-all duration-200',
            'px-4 py-1.5 rounded-full',
            styles.logo
          )}
        >
          {name?.split(' ')[0] || 'Portfolio'}
        </button>

        {/* Divider */}
        <div className={cn(
          'w-px h-6 rounded-full',
          designProfile === 'technical-minimal'
            ? 'bg-white/20'
            : 'bg-slate-200/50'
        )} />

        {/* Navigation Items */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.filter(item => item.show).map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={item.onClick}
              className={cn(
                'transition-all duration-200 rounded-full',
                'flex items-center gap-1.5',
                'h-8 px-3',
                activeSection === item.id ? styles.activeText : styles.text,
                item.id !== 'home' && item.id !== 'contact' && 'px-2.5 sm:px-3'
              )}
            >
              <item.icon className="w-4 h-4" />
              <span className={cn(
                'text-sm font-medium',
                (item.id === 'linkedin' || item.id === 'resume') && 'hidden sm:inline'
              )}>
                {item.id === 'home' ? '' : item.id === 'contact' ? 'Contact' : item.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}
