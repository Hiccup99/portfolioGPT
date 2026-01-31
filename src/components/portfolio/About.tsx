import type { AboutSection } from '../../types/portfolio'
import { Card, CardContent } from '@/components/ui/card'
import { getDesignTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'

interface Props {
  data: AboutSection
}

export default function About({ data }: Props) {
  const { content, design_intent } = data
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)

  if (!content.text) return null

  return (
    <section className="py-16">
      <div className={cn('container mx-auto px-4', tokens.containerWidth)}>
        <h2 className={cn(tokens.headingStyle, tokens.headingColor, 'text-center mb-12')}>
          About Me
        </h2>

        <Card className={cn(tokens.cardStyle)}>
          <CardContent className="p-6 md:p-8">
            <p className={cn(tokens.bodyStyle, tokens.bodyColor, 'leading-relaxed')}>
              {content.text}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
