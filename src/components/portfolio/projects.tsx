import type { ProjectsSection } from '../../types/portfolio'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getDesignTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'

interface Props {
  data: ProjectsSection
}

export default function Projects({ data }: Props) {
  const { content, design_intent } = data
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)

  if (!content.projects || content.projects.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className={cn(tokens.headingStyle, tokens.headingColor, 'text-center mb-12')}>
          Projects
        </h2>

        <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', 'max-w-5xl mx-auto')}>
          {content.projects.map((project, idx) => (
            <Card key={idx} className={cn(tokens.cardStyle, 'flex flex-col h-full')}>
              <CardHeader className="pb-4">
                <CardTitle className={cn('text-xl', tokens.headingColor)}>
                  {project.title}
                </CardTitle>
                <CardDescription className={cn(tokens.bodyColor)}>
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col justify-between gap-4">
                {project.outcomes && project.outcomes.length > 0 && (
                  <div className="space-y-2">
                    <p className={cn('text-sm font-medium', tokens.mutedColor)}>
                      Key Outcomes
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      {project.outcomes.map((outcome, oIdx) => (
                        <li key={oIdx} className={cn('text-sm', tokens.accentColor)}>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <>
                    <Separator className={cn(tokens.separatorStyle)} />
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, tIdx) => (
                        <Badge
                          key={tIdx}
                          variant="outline"
                          className={cn(tokens.badgeStyle)}
                        >
                          {tech}
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
