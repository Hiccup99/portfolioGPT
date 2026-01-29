import { useState } from 'react'
import type { GetInTouchSection } from '../../types/portfolio'

interface Props {
  data: GetInTouchSection
}

export default function GetInTouch({ data }: Props) {
  const { message } = data.content
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

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

    setIsSubmitting(false)
  }

  return (
    <section>
      <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-4">
        Get In Touch
      </h2>
      <p className="text-lg text-neutral-600 mb-8">
        {message}
      </p>

      {submitted ? (
        <div className="p-6 bg-neutral-50 rounded-lg">
          <p className="text-black">
            Thanks for reaching out. I'll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
          />
          <textarea
            placeholder="Message"
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:border-black resize-none transition-colors"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black text-white font-medium rounded-lg disabled:bg-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}
    </section>
  )
}
