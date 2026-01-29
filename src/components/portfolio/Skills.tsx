import type { SkillsSection } from '../../types/portfolio'

interface Props {
  data: SkillsSection
}

export default function Skills({ data }: Props) {
  const { groups } = data.content

  return (
    <section>
      <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
        Skills
      </h2>
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm text-neutral-500 mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-black bg-neutral-100 rounded-full"
                >
                  {skill.logo_url && (
                    <img
                      src={skill.logo_url}
                      alt=""
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  )}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
