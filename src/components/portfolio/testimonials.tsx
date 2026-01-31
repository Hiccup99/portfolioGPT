import type { TestimonialsSection } from '../../types/portfolio'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'
import { getDesignTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'

interface Props {
  data: TestimonialsSection
}

export default function Testimonials({ data }: Props) {
  const { content, design_intent } = data
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)

  if (!content.testimonials || content.testimonials.length === 0) return null

  const testimonials = content.testimonials
  
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className={cn(tokens.headingStyle, tokens.headingColor, 'text-center')}>
          What People Say
        </h2>
      </div>

      {/* Infinite Carousel */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className={cn(
          'absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none',
          'bg-gradient-to-r',
          design_intent.design_profile === 'technical-minimal' 
            ? 'from-slate-950 to-transparent' 
            : 'from-white to-transparent'
        )} />
        <div className={cn(
          'absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none',
          'bg-gradient-to-l',
          design_intent.design_profile === 'technical-minimal' 
            ? 'from-slate-950 to-transparent' 
            : 'from-white to-transparent'
        )} />

        {/* Scrolling track */}
        <div 
          className="flex gap-6 animate-marquee hover:pause-animation"
          style={{
            width: 'max-content',
            animation: `marquee ${testimonials.length * 8}s linear infinite`,
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <Card 
              key={idx} 
              className={cn(
                tokens.cardStyle,
                'w-[350px] md:w-[400px] flex-shrink-0',
                'hover:scale-[1.02] transition-transform duration-300'
              )}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className={cn('w-8 h-8 mb-4', tokens.accentColor, 'opacity-40')} />

                {/* Quote Text */}
                <blockquote className={cn(
                  'text-base leading-relaxed mb-6 line-clamp-4',
                  tokens.bodyColor
                )}>
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <Avatar className={cn('w-10 h-10', tokens.avatarStyle)}>
                    <AvatarFallback className={cn(
                      tokens.surfaceBackground,
                      tokens.headingColor,
                      'text-xs font-semibold'
                    )}>
                      {testimonial.author_name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className={cn('font-semibold text-sm truncate', tokens.headingColor)}>
                      {testimonial.author_name}
                    </p>
                    <p className={cn('text-xs truncate', tokens.mutedColor)}>
                      {testimonial.author_title}
                      {testimonial.author_company && ` at ${testimonial.author_company}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CSS for animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
