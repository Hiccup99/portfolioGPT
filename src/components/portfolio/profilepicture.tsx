import type { ProfilePictureSection } from '../../types/portfolio'
import { Avatar, AvatarImage, AvatarFallback, type AvatarShape, getAvatarShapeStyles } from '@/components/ui/avatar'
import { getDesignTokens } from '@/styles/design-system'
import type { DesignProfile } from '@/types/portfolio'
import { cn } from '@/lib/utils'

interface Props {
  data: ProfilePictureSection
  name?: string
}

// Map design profiles to avatar shapes
const profileShapeMap: Record<DesignProfile, AvatarShape> = {
  'technical-minimal': 'rounded-square',    // Clean, geometric
  'product-thinker': 'circle',              // Classic, professional
  'product-designer': 'blob-2',             // Creative, organic
  'executive-clean': 'squircle',            // Refined, modern
}

// Gradient colors for the decorative ring
const profileGradients: Record<DesignProfile, string> = {
  'technical-minimal': 'bg-gradient-to-br from-emerald-400 to-cyan-500',
  'product-thinker': 'bg-gradient-to-br from-blue-400 to-indigo-500',
  'product-designer': 'bg-gradient-to-br from-rose-400 to-orange-400',
  'executive-clean': 'bg-gradient-to-br from-amber-400 to-orange-400',
}

export default function ProfilePicture({ data, name = 'User' }: Props) {
  const { content, design_intent } = data
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)
  
  const shape = profileShapeMap[design_intent.design_profile] || 'circle'
  const gradient = profileGradients[design_intent.design_profile]
  const shapeStyles = getAvatarShapeStyles(shape)

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex justify-center py-8">
      <div className="relative">
        {/* Decorative gradient ring - matches avatar shape */}
        <div 
          className={cn(
            'absolute -inset-2 blur-md opacity-60',
            gradient
          )}
          style={shapeStyles}
        />
        <Avatar 
          shape={shape}
          className={cn('w-32 h-32 relative', tokens.avatarStyle)}
        >
          {content.image_url && (
            <AvatarImage src={content.image_url} alt={name} className="object-cover" />
          )}
          <AvatarFallback
            shape={shape}
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
