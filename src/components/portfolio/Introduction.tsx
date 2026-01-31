import type { IntroductionSection } from '../../types/portfolio'
import { getPageTokens, getDesignTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'

interface Props {
  data: IntroductionSection
}

export default function Introduction({ data }: Props) {
  const { content, design_intent } = data
  const pageTokens = getPageTokens(design_intent.design_profile)
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)

  return (
    <section className="py-12 text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className={cn(
          pageTokens.font, 
          'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
          pageTokens.headingColor, 
          'mb-4 leading-tight'
        )}>
          {content.headline}
        </h1>
        {/* Optional subtitle based on design profile */}
        <p className={cn(
          'text-lg md:text-xl',
          tokens.mutedColor
        )}>
          Welcome to my portfolio
        </p>
      </div>
    </section>
  )
}
