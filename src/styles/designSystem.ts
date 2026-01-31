import type { DesignProfile } from '../types/portfolio'

/**
 * Design System - Page-level styles based on design profile
 *
 * Portfolio section components now use shadcn primitives with inline styling
 * based on design_profile. This file only exports page-level utilities.
 */

/**
 * Get the page-level styles based on the design profile
 */
export function getPageStyles(profile: DesignProfile): { background: string; text: string } {
  switch (profile) {
    case 'technical-minimal':
      return {
        background: 'bg-zinc-950',
        text: 'text-zinc-100',
      }
    case 'executive-clean':
      return {
        background: 'bg-white',
        text: 'text-slate-900',
      }
    case 'product-thinker':
    default:
      return {
        background: 'bg-white',
        text: 'text-neutral-900',
      }
  }
}
