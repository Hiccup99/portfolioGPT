import type { ProfilePictureSection } from '../../types/portfolio'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getDesignTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'

interface Props {
  data: ProfilePictureSection
  name?: string
}

export default function ProfilePicture({ data, name = 'User' }: Props) {
  const { content, design_intent } = data
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex justify-center py-8">
      <div className="relative">
        {/* Decorative gradient ring */}
        <div className={cn(
          'absolute -inset-1.5 rounded-full blur-md opacity-60',
          design_intent.design_profile === 'technical-minimal' && 'bg-gradient-to-br from-emerald-400 to-cyan-500',
          design_intent.design_profile === 'product-thinker' && 'bg-gradient-to-br from-blue-400 to-indigo-500',
          design_intent.design_profile === 'product-designer' && 'bg-gradient-to-br from-rose-400 to-orange-400',
          design_intent.design_profile === 'executive-clean' && 'bg-gradient-to-br from-amber-400 to-orange-400'
        )} />
        <Avatar className={cn('w-32 h-32 relative', tokens.avatarStyle)}>
          {content.image_url && (
            <AvatarImage src={content.image_url} alt={name} className="object-cover" />
          )}
          <AvatarFallback
            className={cn(
              'text-3xl font-bold',
              tokens.surfaceBackground,
              tokens.headingColor
            )}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
