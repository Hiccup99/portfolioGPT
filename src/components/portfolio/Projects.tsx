import type { ProjectsSection } from '../../types/portfolio'

interface Props {
  data: ProjectsSection
}

export default function Projects({ data }: Props) {
  const { projects } = data.content

  return (
    <section>
      <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
        Projects
      </h2>
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.title} className="border-b border-neutral-100 pb-8 last:border-0 last:pb-0">
            <h3 className="text-lg font-medium text-black mb-2">
              {project.title}
            </h3>
            <p className="text-neutral-600 mb-4">
              {project.description}
            </p>

            {project.outcomes && project.outcomes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {project.outcomes.map((outcome, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded"
                  >
                    {outcome}
                  </span>
                ))}
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <p className="text-sm text-neutral-400">
                {project.technologies.join(' · ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
