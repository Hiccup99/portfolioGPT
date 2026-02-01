import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

// =============================================================================
// AVATAR SHAPES - Easily extensible shape configurations
// =============================================================================
export type AvatarShape = 
  | 'circle' 
  | 'rounded-square' 
  | 'squircle' 
  | 'hexagon' 
  | 'blob-1' 
  | 'blob-2' 
  | 'blob-3'
  | 'diamond'
  | 'shield'

// Shape configurations with clip-path and border-radius
const avatarShapes: Record<AvatarShape, {
  clipPath?: string
  borderRadius?: string
  className?: string
}> = {
  'circle': {
    borderRadius: '9999px',
    className: 'rounded-full',
  },
  'rounded-square': {
    borderRadius: '20%',
    className: 'rounded-[20%]',
  },
  'squircle': {
    // iOS-style squircle
    borderRadius: '30%',
    className: 'rounded-[30%]',
  },
  'hexagon': {
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  },
  'blob-1': {
    // Organic blob shape
    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
  },
  'blob-2': {
    // Different organic blob
    borderRadius: '40% 60% 70% 30% / 40% 40% 60% 50%',
  },
  'blob-3': {
    // Another organic blob variation
    borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%',
  },
  'diamond': {
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  },
  'shield': {
    clipPath: 'polygon(50% 0%, 100% 10%, 100% 70%, 50% 100%, 0% 70%, 0% 10%)',
  },
}

// Get shape styles
export function getAvatarShapeStyles(shape: AvatarShape = 'circle'): React.CSSProperties {
  const config = avatarShapes[shape]
  return {
    clipPath: config.clipPath,
    borderRadius: config.clipPath ? undefined : config.borderRadius,
  }
}

// Get shape class name
export function getAvatarShapeClass(shape: AvatarShape = 'circle'): string {
  const config = avatarShapes[shape]
  return config.className || ''
}

// =============================================================================
// AVATAR COMPONENTS
// =============================================================================

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  shape?: AvatarShape
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, shape = 'circle', style, ...props }, ref) => {
  const shapeStyles = getAvatarShapeStyles(shape)
  const shapeClass = getAvatarShapeClass(shape)
  
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden",
        shapeClass,
        className
      )}
      style={{ ...shapeStyles, ...style }}
      {...props}
    />
  )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  shape?: AvatarShape
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, shape = 'circle', style, ...props }, ref) => {
  const shapeStyles = getAvatarShapeStyles(shape)
  const shapeClass = getAvatarShapeClass(shape)
  
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center bg-muted",
        shapeClass,
        className
      )}
      style={{ ...shapeStyles, ...style }}
      {...props}
    />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback, avatarShapes }
