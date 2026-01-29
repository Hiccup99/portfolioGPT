import type { AwardsSection } from '../../types/portfolio'

interface Props {
  data: AwardsSection
}

export default function Awards({ data }: Props) {
  const { awards } = data.content

  return (
    <section>
      <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-6">
        Recognition
      </h2>
      <div className="space-y-6">
        {awards.map((award, idx) => (
          <div key={idx} className="border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-medium text-black">
                {award.title}
              </h3>
              {award.date && (
                <span className="text-sm text-neutral-400">{award.date}</span>
              )}
            </div>
            {award.issuer && (
              <p className="text-sm text-neutral-500 mb-2">{award.issuer}</p>
            )}
            <p className="text-neutral-600">
              {award.interpretation}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
