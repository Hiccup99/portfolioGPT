import type { AwardsSection } from '../../types/portfolio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy } from 'lucide-react'
import { getDesignTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'

interface Props {
  data: AwardsSection
}

export default function Awards({ data }: Props) {
  const { content, design_intent } = data
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)

  if (!content.awards || content.awards.length === 0) return null

  return (
    <section className="py-16">
      <div className={cn('container mx-auto px-4', tokens.containerWidth)}>
        <h2 className={cn(tokens.headingStyle, tokens.headingColor, 'text-center mb-12')}>
          Awards & Recognition
        </h2>

        <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6')}>
          {content.awards.map((award, idx) => (
            <Card key={idx} className={cn(tokens.cardStyle)}>
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                <div className={cn('p-3 rounded-lg', tokens.surfaceBackground)}>
                  <Trophy className={cn('w-6 h-6', tokens.accentColor)} />
                </div>
                <div className="flex-1">
                  <CardTitle className={cn('text-lg', tokens.headingColor)}>
                    {award.title}
                  </CardTitle>
                  {(award.issuer || award.date) && (
                    <CardDescription className={cn(tokens.mutedColor, 'mt-1')}>
                      {award.issuer}
                      {award.issuer && award.date && ' • '}
                      {award.date}
                    </CardDescription>
                  )}
                </div>
              </CardHeader>

              {award.interpretation && (
                <CardContent className="pt-0">
                  <p className={cn(tokens.bodyColor, 'leading-relaxed')}>{award.interpretation}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
