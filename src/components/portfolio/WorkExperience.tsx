import type { WorkExperienceSection } from '../../types/portfolio'

interface Props {
  data: WorkExperienceSection
}

export default function WorkExperience({ data }: Props) {
  const { experiences } = data.content

  return (
    <section>
      <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
        Experience
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="border-b border-neutral-100 pb-8 last:border-0 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-medium text-black">
                  {exp.role}
                </h3>
                <p className="text-neutral-600">
                  {exp.company}
                </p>
              </div>
              <p className="text-sm text-neutral-400">
                {exp.start_date} – {exp.end_date}
              </p>
            </div>

            <p className="text-neutral-600 mt-3">
              {exp.description}
            </p>

            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mt-3 space-y-1">
                {exp.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="text-sm text-neutral-500">
                    · {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
