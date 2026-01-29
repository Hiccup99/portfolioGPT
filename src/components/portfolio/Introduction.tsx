import type { IntroductionSection } from '../../types/portfolio'

interface Props {
  data: IntroductionSection
}

export default function Introduction({ data }: Props) {
  const { headline } = data.content

  return (
    <h1 className="text-3xl md:text-4xl font-semibold text-black leading-tight tracking-tight">
      {headline}
    </h1>
  )
}
