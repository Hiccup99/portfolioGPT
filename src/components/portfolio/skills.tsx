import type { SkillsSection } from '../../types/portfolio'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getDesignTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'

interface Props {
  data: SkillsSection
}

export default function Skills({ data }: Props) {
  const { content, design_intent } = data
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)

  if (!content.groups || content.groups.length === 0) return null

  return (
    <section className="py-16">
      <div className={cn('container mx-auto px-4', tokens.containerWidth)}>
        <h2 className={cn(tokens.headingStyle, tokens.headingColor, 'text-center mb-12')}>
          Skills
        </h2>

        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6')}>
          {content.groups.map((group, idx) => (
            <Card key={idx} className={cn(tokens.cardStyle)}>
              <CardHeader className="pb-4">
                <CardTitle className={cn('text-lg', tokens.headingColor)}>
                  {group.category}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <Badge
                      key={sIdx}
                      variant="outline"
                      className={cn(tokens.badgeStyle, 'flex items-center gap-2')}
                    >
                      {skill.logo_url && (
                        <img
                          src={skill.logo_url}
                          alt=""
                          className="w-4 h-4"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      )}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
