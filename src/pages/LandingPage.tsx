import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    text: "I was skeptical at first, but the portfolio it created captured my personality perfectly. Got 3 interview calls within a week!",
  },
  {
    name: "Rahul Mehta",
    role: "Product Designer",
    text: "The AI understood my design background and created something visually stunning. Saved me hours of work.",
  },
  {
    name: "Ananya Krishnan",
    role: "Data Scientist",
    text: "Clean, professional, and exactly what I needed. The pricing is unbeatable for this quality.",
  },
  {
    name: "Vikram Patel",
    role: "Marketing Manager",
    text: "My LinkedIn was a mess. PortfolioGPT turned it into a compelling story. Absolutely worth it.",
  },
  {
    name: "Sneha Reddy",
    role: "UX Researcher",
    text: "The attention to detail is incredible. It highlighted projects I forgot I even worked on!",
  },
  {
    name: "Arjun Singh",
    role: "Full Stack Developer",
    text: "From resume to live website in under 10 minutes. This is the future of personal branding.",
  },
  {
    name: "Meera Iyer",
    role: "Business Analyst",
    text: "I've tried other portfolio builders. None of them understood my career trajectory like this one did.",
  },
  {
    name: "Karthik Nair",
    role: "DevOps Engineer",
    text: "Simple, fast, and effective. The website looks like I paid thousands for a custom design.",
  },
  {
    name: "Divya Gupta",
    role: "Content Strategist",
    text: "The AI picked up on my writing style and reflected it throughout. It feels authentically me.",
  },
]

const faqs = [
  {
    q: "How long does it take to generate my portfolio?",
    a: "Your portfolio is generated in under 5 minutes. Once you upload your resume and link your LinkedIn, our AI gets to work immediately.",
  },
  {
    q: "Can I edit my portfolio after it's generated?",
    a: "Yes, you can request changes and regenerate sections. We want you to be 100% happy with your portfolio.",
  },
  {
    q: "What if I don't have a LinkedIn profile?",
    a: "No problem! You can generate a portfolio using just your resume. LinkedIn data helps us create a richer profile, but it's optional.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. Your data is encrypted, never shared, and you can delete it anytime. We don't use your information for training or advertising.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, UPI, and net banking through our secure payment partner.",
  },
  {
    q: "Can I get a refund?",
    a: "You only pay after seeing your portfolio. If you don't love it, you don't pay. It's that simple.",
  },
  {
    q: "Do I get a custom domain?",
    a: "Your portfolio is hosted on a subdomain. Custom domain support is coming soon.",
  },
  {
    q: "How is this different from other portfolio builders?",
    a: "Other tools give you templates to fill. We use AI to understand who you are and create content that reflects your unique personality and experience.",
  },
]

const privacyItems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    title: "Delete when you want",
    desc: "You can delete your data any time. Or we do it for you automatically.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Your images, your headshots",
    desc: "Uploaded images are not used for any other purpose or training.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Caring by not sharing",
    desc: "We don't share, sell, or advertise your data. Ever.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Rock-solid security",
    desc: "All data encrypted in transit and stored only for the period required.",
  },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleCTA = () => {
    navigate('/create')
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-neutral-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-black">PortfolioGPT</span>
          <button
            onClick={handleCTA}
            className="group px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-all duration-300 inline-flex items-center gap-2"
          >
            Get Started
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-semibold text-black leading-tight mb-6">
              Create your own{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Portfolio</span> website
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Pay only after you love your website
            </p>
            <button
              onClick={handleCTA}
              className="group px-8 py-4 bg-black text-white font-medium rounded-lg hover:bg-neutral-800 transition-all duration-300 inline-flex items-center gap-2 hover:shadow-xl hover:-translate-y-0.5"
            >
              Create your own website
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <img
              src="/stock.png"
              alt="Portfolio preview"
              className="w-full rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-500"
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-neutral-100 py-12 bg-gradient-to-r from-blue-50 via-white to-cyan-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl text-neutral-600">
            <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">10,000+</span> portfolio websites created using PortfolioGPT
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-black text-center mb-4">
            What our users say
          </h2>
          <p className="text-center text-neutral-500 mb-12">
            Join thousands of professionals who transformed their online presence
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="group bg-white p-6 rounded-xl border border-neutral-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-neutral-600 mb-4 group-hover:text-neutral-800 transition-colors">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-medium">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-black">{t.name}</p>
                    <p className="text-sm text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-black text-center mb-4">
            How it works
          </h2>
          <p className="text-center text-neutral-500 mb-16">
            From resume to live website in 4 simple steps
          </p>
          <div className="relative">
            {/* Dotted line connecting circles */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent" style={{ marginLeft: '15%', marginRight: '15%' }} />

            <div className="grid md:grid-cols-4 gap-8 relative">
              {[
                { step: "1", title: "Link LinkedIn", desc: "Connect your profile", icon: "🔗" },
                { step: "2", title: "Upload Resume", desc: "Drop your PDF", icon: "📄" },
                { step: "3", title: "AI Magic", desc: "We create your site", icon: "✨" },
                { step: "4", title: "Go Live!", desc: "Ready in minutes", icon: "🚀" },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="text-center relative group"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-white border-2 border-blue-100 text-2xl rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:border-blue-300 group-hover:shadow-lg group-hover:shadow-blue-50 transition-all duration-300 group-hover:-translate-y-1">
                    {item.icon}
                  </div>
                  <h3 className="font-medium text-black mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <p className="text-sm uppercase tracking-wider text-neutral-400 mb-4">
            Not made by humans
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Created by <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
          </h2>
          <p className="text-lg text-neutral-300 leading-relaxed">
            Don't take our word for it. Our AI portfolio generator turns your resume into a stunning personal website that reflects your personality and skills.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-black text-center mb-4">
            Simple pricing
          </h2>
          <p className="text-center text-neutral-500 mb-12">
            No hidden fees. No subscriptions.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-neutral-200 rounded-2xl p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-medium rounded-full mb-4">
                MOST POPULAR
              </div>
              <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Personal Portfolio</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-semibold text-black">₹999</span>
                <span className="text-neutral-500">one-time</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "AI-generated portfolio",
                  "Mobile responsive",
                  "Contact form included",
                  "Hosted for 1 year",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-600">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center text-blue-600 text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleCTA}
                className="group w-full py-4 bg-black text-white font-medium rounded-xl hover:bg-neutral-800 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Get Started
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-black mb-4">
                Don't pay till you see your stunning website
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                99.9% of our customers love their website at first sight. We are sure you will love your website too.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                That's why we create your website first. <span className="font-medium bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Pay only if you love it.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-black text-center mb-4">
            Your data is yours, and yours only
          </h2>
          <p className="text-center text-neutral-500 mb-12">
            Throughout your journey, your data is secure and in your control.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {privacyItems.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-neutral-200 flex gap-4 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:from-blue-100 group-hover:to-cyan-100 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-black text-center mb-4">
            Frequently asked questions
          </h2>
          <p className="text-center text-neutral-500 mb-12">
            Everything you need to know
          </p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-neutral-200 rounded-xl overflow-hidden hover:border-blue-200 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors duration-300"
                >
                  <span className="font-medium text-black">{faq.q}</span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-blue-600 bg-gradient-to-r from-blue-50 to-cyan-50 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="px-6 pb-5">
                    <p className="text-neutral-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready to stand out?
          </h2>
          <p className="text-neutral-400 mb-8">
            Join 10,000+ professionals with stunning portfolio websites.
          </p>
          <button
            onClick={handleCTA}
            className="group px-8 py-4 bg-white text-black font-medium rounded-xl hover:bg-neutral-100 transition-all duration-300 inline-flex items-center gap-2 hover:shadow-xl hover:-translate-y-0.5"
          >
            Build your own Portfolio
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-neutral-500">
            © VibeLabs Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
