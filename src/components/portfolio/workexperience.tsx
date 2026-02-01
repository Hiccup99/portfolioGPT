import type { WorkExperienceSection } from '../../types/portfolio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Briefcase } from 'lucide-react'
import { getDesignTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'

interface Props {
  data: WorkExperienceSection
}

export default function WorkExperience({ data }: Props) {
  const { content, design_intent } = data
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)

  if (!content.experiences || content.experiences.length === 0) return null

  return (
    <section className="py-16">
      <div className={cn('container mx-auto px-4', tokens.containerWidth)}>
        <h2 className={cn(tokens.headingStyle, tokens.headingColor, 'text-center mb-12')}>
          Work Experience
        </h2>

        <div className="space-y-8">
          {content.experiences.map((exp, idx) => (
            <Card key={idx} className={cn(tokens.cardStyle)}>
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                <div className={cn('p-3 rounded-lg', tokens.surfaceBackground)}>
                  {exp.company_logo_url ? (
                    <img
                      src={exp.company_logo_url}
                      alt={exp.company}
                      className="w-6 h-6"
                    />
                  ) : (
                    <Briefcase className={cn('w-6 h-6', tokens.accentColor)} />
                  )}
                </div>
                <div className="flex-1">
                  <CardTitle className={cn('text-lg', tokens.headingColor)}>
                    {exp.role}
                  </CardTitle>
                  <CardDescription className={cn(tokens.mutedColor, 'mt-1')}>
                    {exp.company}
                    {exp.start_date && ` • ${exp.start_date}`}
                    {exp.end_date && ` - ${exp.end_date}`}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                {exp.description && (
                  <p className={cn(tokens.bodyColor, 'leading-relaxed')}>{exp.description}</p>
                )}

                {exp.highlights && exp.highlights.length > 0 && (
                  <>
                    <Separator className={cn(tokens.separatorStyle)} />
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, hIdx) => (
                        <Badge
                          key={hIdx}
                          variant="outline"
                          className={cn(tokens.badgeStyle)}
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
