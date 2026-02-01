import { useState } from 'react'
import type { GetInTouchSection } from '../../types/portfolio'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Check, Loader2 } from 'lucide-react'
import { getDesignTokens } from '@/styles/design-system'
import { cn } from '@/lib/utils'

interface Props {
  data: GetInTouchSection
}

export default function GetInTouch({ data }: Props) {
  const { content, design_intent } = data
  const tokens = getDesignTokens(design_intent.design_profile, design_intent)

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...formData,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16">
      <div className={cn('container mx-auto px-4', tokens.containerWidth)}>
        <h2 className={cn(tokens.headingStyle, tokens.headingColor, 'text-center mb-4')}>
          Get In Touch
        </h2>

        {content.message && (
          <p className={cn(tokens.bodyColor, 'text-center mb-12 max-w-2xl mx-auto leading-relaxed')}>
            {content.message}
          </p>
        )}

        <Card className={cn(tokens.cardStyle, 'max-w-xl mx-auto')}>
          <CardHeader>
            <CardTitle className={cn(tokens.headingColor)}>
              Send me a message
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className={cn('p-6 rounded-lg', tokens.surfaceBackground)}>
                <div className="flex items-center gap-3">
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', tokens.surfaceBackground)}>
                    <Check className={cn('w-5 h-5', tokens.accentColor)} />
                  </div>
                  <p className={cn('font-medium', tokens.headingColor)}>
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className={cn(tokens.bodyColor)}>
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={cn(tokens.inputStyle)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={cn(tokens.bodyColor)}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={cn(tokens.inputStyle)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className={cn(tokens.bodyColor)}>
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(tokens.inputStyle, 'resize-none')}
                  />
                </div>

                <Button
                  type="submit"
                  className={cn('w-full', tokens.buttonPrimary)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
