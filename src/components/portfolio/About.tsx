import type { AboutSection } from '../../types/portfolio'

interface Props {
  data: AboutSection
}

export default function About({ data }: Props) {
  const { text } = data.content

  return (
    <section>
      <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">
        About
      </h2>
      <p className="text-lg text-neutral-600 leading-relaxed">
        {text}
      </p>
    </section>
  )
}
