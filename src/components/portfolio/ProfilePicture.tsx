import type { ProfilePictureSection } from '../../types/portfolio'

interface Props {
  data: ProfilePictureSection
}

export default function ProfilePicture({ data }: Props) {
  const { image_url } = data.content

  if (!image_url) {
    return null
  }

  return (
    <div className="mb-8">
      <img
        src={image_url}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover"
      />
    </div>
  )
}
