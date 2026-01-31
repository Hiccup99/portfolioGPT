import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowRight, Trash2, Image, Lock, Shield, Check } from 'lucide-react'
import Footer from '../components/footer'

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    text: "I was skeptical at first, but the portfolio it created captured my personality perfectly. Got 3 interview calls within a week!",
  },
  {
    name: "James Wilson",
    role: "Product Designer",
    text: "The AI understood my design background and created something visually stunning. Saved me hours of work.",
  },
  {
    name: "Sarah Chen",
    role: "Data Scientist",
    text: "Clean, professional, and exactly what I needed. The pricing is unbeatable for this quality.",
  },
  {
    name: "Vikram Patel",
    role: "Marketing Manager",
    text: "My LinkedIn was a mess. PortfolioGPT turned it into a compelling story. Absolutely worth it.",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Researcher",
    text: "The attention to detail is incredible. It highlighted projects I forgot I even worked on!",
  },
  {
    name: "Arjun Singh",
    role: "Full Stack Developer",
    text: "From resume to live website in under 10 minutes. This is the future of personal branding.",
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
    icon: <Trash2 className="w-5 h-5" />,
    title: "Delete when you want",
    desc: "You can delete your data any time. Or we do it for you automatically.",
  },
  {
    icon: <Image className="w-5 h-5" />,
    title: "Your images, your headshots",
    desc: "Uploaded images are not used for any other purpose or training.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Caring by not sharing",
    desc: "We don't share, sell, or advertise your data. Ever.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Rock-solid security",
    desc: "All data encrypted in transit and stored only for the period required.",
  },
]

const steps = [
  { step: "1", title: "Link LinkedIn", desc: "Connect your profile", icon: "🔗" },
  { step: "2", title: "Upload Resume", desc: "Drop your PDF", icon: "📄" },
  { step: "3", title: "AI Magic", desc: "We create your site", icon: "✨" },
  { step: "4", title: "Go Live!", desc: "Ready in minutes", icon: "🚀" },
]

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleCTA = () => {
    navigate('/create')
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-neutral-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-black">Portfolio</span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">GPT</span>
          </span>
          <Button onClick={handleCTA} className="group">
            Get Started
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
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
            <Button onClick={handleCTA} size="lg" className="group">
              Create your own website
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <img
              src="/stock.avif"
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
              <Card
                key={i}
                className="group hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-neutral-600 mb-4 group-hover:text-neutral-800 transition-colors">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-cyan-400 text-white">
                        {t.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-black">{t.name}</p>
                      <p className="text-sm text-neutral-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-black text-center mb-4">
            How it works
          </h2>
          <p className="text-center text-neutral-500 mb-8 md:mb-16">
            From resume to live website in 4 simple steps
          </p>
          <div className="relative">
            {/* Dotted line connecting circles - desktop */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent" style={{ marginLeft: '15%', marginRight: '15%' }} />

            {/* Desktop layout */}
            <div className="hidden md:grid md:grid-cols-4 gap-8 relative">
              {steps.map((item, i) => (
                <div
                  key={item.step}
                  className="text-center relative group"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-white border-2 border-blue-100 text-2xl rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:border-blue-300 group-hover:shadow-lg group-hover:shadow-blue-50 transition-all duration-300 group-hover:-translate-y-1">
                    {item.icon}
                  </div>
                  <Badge variant="secondary" className="mb-2 text-blue-600 bg-blue-50">
                    Step {item.step}
                  </Badge>
                  <h3 className="font-medium text-black mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Mobile layout */}
            <div className="md:hidden grid grid-cols-2 gap-4">
              {steps.map((item) => (
                <Card key={item.step} className="border-blue-100">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 text-xl rounded-xl flex items-center justify-center mx-auto mb-2">
                      {item.icon}
                    </div>
                    <Badge variant="secondary" className="mb-1 text-blue-600 bg-blue-50 text-xs">
                      Step {item.step}
                    </Badge>
                    <h3 className="font-medium text-black text-sm">{item.title}</h3>
                  </CardContent>
                </Card>
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
            Not made by <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">Humans</span>
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
            <Card className="hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex gap-2 mb-4">
                  <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 hover:from-blue-100 hover:to-cyan-100">
                    MOST POPULAR
                  </Badge>
                  <Badge variant="destructive" className="bg-gradient-to-r from-red-100 to-orange-100 text-red-600 hover:from-red-100 hover:to-orange-100">
                    50% OFF
                  </Badge>
                </div>
                <p className="text-sm text-neutral-500 uppercase tracking-wider mb-2">Personal Portfolio</p>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-5xl font-semibold text-black">₹999</span>
                    <span className="text-xl text-neutral-400 line-through">₹1999</span>
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    one-time payment
                  </Badge>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "AI-generated portfolio",
                    "Mobile responsive",
                    "Contact form included",
                    "Hosted for 1 year",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-600">
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center text-blue-600">
                        <Check className="w-3 h-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button onClick={handleCTA} className="w-full group" size="lg">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0">
              <CardContent className="p-8 flex flex-col justify-center h-full">
                <h3 className="text-xl font-semibold text-black mb-4">
                  Don't pay till you see your stunning website
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  99.9% of our customers love their website at first sight. We are sure you will love your website too.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  That's why we create your website first. <span className="font-medium bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Pay only if you love it.</span>
                </p>
              </CardContent>
            </Card>
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
              <Card
                key={i}
                className="hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-600">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
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
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border rounded-xl px-6 data-[state=open]:border-blue-200 data-[state=open]:shadow-lg data-[state=open]:shadow-blue-50 hover:border-blue-200 transition-all"
              >
                <AccordionTrigger className="text-left font-medium text-black hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
          <Button onClick={handleCTA} size="lg" variant="secondary" className="group">
            Build your own Portfolio
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
