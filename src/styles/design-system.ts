import type { DesignProfile, DesignIntent, SurfacePriority } from '@/types/portfolio'

/**
 * Design System for AI-Generated Portfolios
 *
 * This maps Claude's design decisions to actual Tailwind classes.
 * The AI chooses the profile and intent, this system renders it.
 */

// =============================================================================
// COLOR PALETTES - Modern with gradient backgrounds
// =============================================================================
const palettes = {
  'technical-minimal': {
    bg: {
      page: 'bg-slate-950',
      primary: 'bg-slate-900/60',
      secondary: 'bg-slate-900/40',
      supporting: 'bg-slate-800/20',
    },
    text: {
      heading: 'text-slate-100',
      body: 'text-slate-400',
      muted: 'text-slate-500',
      accent: 'text-emerald-400',
    },
    border: {
      default: 'border-slate-700/50',
      accent: 'border-emerald-500/30',
    },
    accent: 'emerald',
  },
  'product-thinker': {
    bg: {
      page: 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-white',
      primary: 'bg-white/80',
      secondary: 'bg-slate-50/80',
      supporting: 'bg-blue-50/30',
    },
    text: {
      heading: 'text-slate-900',
      body: 'text-slate-600',
      muted: 'text-slate-500',
      accent: 'text-blue-600',
    },
    border: {
      default: 'border-slate-200/50',
      accent: 'border-blue-500/30',
    },
    accent: 'blue',
  },
  'product-designer': {
    bg: {
      page: 'bg-gradient-to-br from-orange-50/50 via-rose-50/50 to-violet-50/50',
      primary: 'bg-white/70',
      secondary: 'bg-white/50',
      supporting: 'bg-rose-50/30',
    },
    text: {
      heading: 'text-stone-900',
      body: 'text-stone-600',
      muted: 'text-stone-500',
      accent: 'text-rose-600',
    },
    border: {
      default: 'border-rose-200/30',
      accent: 'border-rose-500/30',
    },
    accent: 'rose',
  },
  'executive-clean': {
    bg: {
      page: 'bg-gradient-to-b from-neutral-50 to-white',
      primary: 'bg-white/90',
      secondary: 'bg-neutral-50/80',
      supporting: 'bg-amber-50/20',
    },
    text: {
      heading: 'text-neutral-900',
      body: 'text-neutral-600',
      muted: 'text-neutral-500',
      accent: 'text-amber-700',
    },
    border: {
      default: 'border-neutral-200/50',
      accent: 'border-amber-500/30',
    },
    accent: 'amber',
  }
} as const

// =============================================================================
// TYPOGRAPHY
// =============================================================================
const typography = {
  'technical-minimal': {
    font: 'font-mono',
    heading: {
      h1: 'text-4xl md:text-5xl font-bold tracking-tight',
      h2: 'text-2xl md:text-3xl font-bold tracking-tight',
      h3: 'text-lg font-semibold tracking-tight',
    },
    body: 'text-base leading-relaxed',
  },
  'product-thinker': {
    font: 'font-sans',
    heading: {
      h1: 'text-4xl md:text-5xl font-bold tracking-tight',
      h2: 'text-2xl md:text-3xl font-semibold',
      h3: 'text-lg font-medium',
    },
    body: 'text-base leading-relaxed',
  },
  'product-designer': {
    font: 'font-sans',
    heading: {
      h1: 'text-4xl md:text-5xl font-semibold tracking-tight',
      h2: 'text-2xl md:text-3xl font-semibold',
      h3: 'text-lg font-medium',
    },
    body: 'text-base leading-relaxed',
  },
  'executive-clean': {
    font: 'font-serif',
    heading: {
      h1: 'text-4xl md:text-5xl font-medium tracking-normal',
      h2: 'text-2xl md:text-3xl font-medium',
      h3: 'text-lg font-medium',
    },
    body: 'text-base leading-loose',
  },
} as const

// =============================================================================
// COMPONENT STYLES - Modern with generous rounded corners & subtle effects
// =============================================================================
const components = {
  'technical-minimal': {
    card: 'border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-950/50',
    badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-sm rounded-full px-3 py-1',
    button: {
      primary: 'bg-emerald-600 hover:bg-emerald-500 text-white font-mono rounded-full',
      secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-full',
      outline: 'border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-full',
    },
    input: 'bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 rounded-xl',
    avatar: 'border-2 border-emerald-500/30 rounded-full ring-4 ring-emerald-500/10',
    separator: 'bg-slate-800/50',
  },
  'product-thinker': {
    card: 'border border-slate-200/50 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50',
    badge: 'bg-blue-50 text-blue-700 border border-blue-200/50 font-medium text-sm rounded-full px-3 py-1',
    button: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white rounded-full',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full',
      outline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full',
    },
    input: 'bg-white/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 rounded-xl',
    avatar: 'border-2 border-blue-500/30 rounded-full ring-4 ring-blue-500/10',
    separator: 'bg-slate-200/50',
  },
  'product-designer': {
    card: 'border border-rose-200/30 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg shadow-rose-100/50',
    badge: 'bg-gradient-to-r from-rose-50 to-orange-50 text-rose-700 border border-rose-200/50 font-medium text-sm rounded-full px-3 py-1',
    button: {
      primary: 'bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white rounded-full',
      secondary: 'bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full',
      outline: 'border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-full',
    },
    input: 'bg-white/80 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-rose-500 rounded-xl',
    avatar: 'border-2 border-rose-400/30 rounded-full ring-4 ring-rose-400/10',
    separator: 'bg-stone-200/50',
  },
  'executive-clean': {
    card: 'border border-neutral-200/50 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md shadow-neutral-200/30',
    badge: 'bg-amber-50 text-amber-800 border border-amber-200/50 font-medium text-sm rounded-full px-3 py-1',
    button: {
      primary: 'bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl',
      secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl',
      outline: 'border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-xl',
    },
    input: 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 rounded-xl',
    avatar: 'border-2 border-amber-400/30 rounded-full ring-4 ring-amber-400/10',
    separator: 'bg-neutral-200/50',
  }
} as const

// =============================================================================
// SPACING & LAYOUT (based on visual_density)
// =============================================================================
const spacing = {
  low: {
    section: 'py-24',
    container: 'max-w-3xl',
    gap: 'gap-8',
    padding: 'p-8',
  },
  medium: {
    section: 'py-16',
    container: 'max-w-4xl',
    gap: 'gap-6',
    padding: 'p-6',
  },
  high: {
    section: 'py-12',
    container: 'max-w-5xl',
    gap: 'gap-4',
    padding: 'p-4',
  },
} as const

// =============================================================================
// MAIN API
// =============================================================================

export interface DesignTokens {
  // Page-level
  pageBackground: string
  font: string

  // Section-level
  sectionPadding: string
  containerWidth: string

  // Card/Surface
  cardStyle: string
  surfaceBackground: string

  // Typography
  headingStyle: string
  headingColor: string
  bodyStyle: string
  bodyColor: string
  mutedColor: string
  accentColor: string

  // Components
  badgeStyle: string
  buttonPrimary: string
  buttonSecondary: string
  buttonOutline: string
  inputStyle: string
  avatarStyle: string
  separatorStyle: string
  borderColor: string

  // Spacing
  gap: string
  padding: string
}

/**
 * Get design tokens for a specific section based on its design intent
 */
export function getDesignTokens(
  profile: DesignProfile,
  intent: DesignIntent
): DesignTokens {
  const palette = palettes[profile]
  const typo = typography[profile]
  const comp = components[profile]
  const space = spacing[intent.visual_density]

  // Surface background based on priority
  const surfaceBgMap: Record<SurfacePriority, string> = {
    primary: palette.bg.primary,
    secondary: palette.bg.secondary,
    supporting: palette.bg.supporting,
  }

  return {
    // Page-level
    pageBackground: palette.bg.page,
    font: typo.font,

    // Section-level
    sectionPadding: space.section,
    containerWidth: space.container,

    // Card/Surface
    cardStyle: comp.card,
    surfaceBackground: surfaceBgMap[intent.surface_priority],

    // Typography
    headingStyle: typo.heading.h2,
    headingColor: palette.text.heading,
    bodyStyle: typo.body,
    bodyColor: palette.text.body,
    mutedColor: palette.text.muted,
    accentColor: palette.text.accent,

    // Components
    badgeStyle: comp.badge,
    buttonPrimary: comp.button.primary,
    buttonSecondary: comp.button.secondary,
    buttonOutline: comp.button.outline,
    inputStyle: comp.input,
    avatarStyle: comp.avatar,
    separatorStyle: comp.separator,
    borderColor: palette.border.default,

    // Spacing
    gap: space.gap,
    padding: space.padding,
  }
}

/**
 * Get page-level tokens (for layout wrapper)
 */
export function getPageTokens(profile: DesignProfile) {
  const palette = palettes[profile]
  const typo = typography[profile]

  return {
    background: palette.bg.page,
    font: typo.font,
    headingH1: typo.heading.h1,
    headingColor: palette.text.heading,
  }
}
