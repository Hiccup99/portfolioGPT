import type { PortfolioData, DesignProfile } from '../types/portfolio'

/**
 * Demo portfolios showcasing different design profiles
 *
 * These demonstrate how the same React components render differently
 * based on Claude's design_profile output. The styling is determined
 * by the designSystem.ts mapping layer, not hardcoded here.
 */

// ============================================================================
// FINANCE EXECUTIVE - executive-clean profile
// ============================================================================
export const FINANCE_PORTFOLIO: PortfolioData = {
  profile_picture: {
    content: { image_url: null },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'executive-clean',
      surface_priority: 'secondary'
    }
  },
  introduction: {
    content: {
      headline: "I find value where others see complexity—then build the teams to capture it."
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'low',
      design_profile: 'executive-clean',
      surface_priority: 'primary'
    }
  },
  about: {
    content: {
      text: "I've spent my career in the spaces where numbers meet narrative. The deals I'm proudest of weren't just financially sound—they changed what was possible for the companies involved. I believe the best strategy work is invisible: it shows up in outcomes, not slide decks."
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'executive-clean',
      surface_priority: 'primary'
    }
  },
  skills: {
    content: {
      groups: [
        {
          category: "Domain",
          skills: [
            { name: "M&A", logo_url: undefined, category: "other" },
            { name: "Corporate Strategy", logo_url: undefined, category: "other" },
            { name: "Capital Markets", logo_url: undefined, category: "other" }
          ]
        }
      ]
    },
    design_intent: {
      emphasis: 'low',
      visual_density: 'low',
      design_profile: 'executive-clean',
      surface_priority: 'supporting'
    }
  },
  projects: {
    content: {
      projects: [
        {
          title: "The TechCorp Acquisition",
          description: "The board wanted growth but wasn't sure where to find it. I identified TechCorp as the target no one else was looking at, built the case for why the synergies were real, and led the integration that made them happen. It became the largest deal in company history.",
          outcomes: ["$2.8B deal closed", "$400M in realized synergies"],
          technologies: []
        },
        {
          title: "Turning Around a Struggling Division",
          description: "Everyone assumed the consumer unit was a lost cause. I saw a cost structure problem masquerading as a demand problem. Redesigned operations from the ground up, protected the teams that mattered, and delivered $180M in annual savings without losing a single key customer.",
          outcomes: ["+340 bps EBITDA", "$180M annual savings"],
          technologies: []
        }
      ]
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'executive-clean',
      surface_priority: 'primary'
    }
  },
  work_experience: {
    content: {
      experiences: [
        {
          company: "Goldman Sachs",
          company_logo_url: "https://cdn.simpleicons.org/goldmansachs",
          role: "Managing Director, M&A",
          start_date: "2018",
          end_date: "Present",
          description: "Lead partner on M&A transactions across technology and industrials sectors. Manage a team of 25 professionals and $15B+ in annual deal volume.",
          highlights: ["$15B+ annual deal volume", "Team of 25", "Partner-track in 4 years"]
        },
        {
          company: "Morgan Stanley",
          company_logo_url: "https://cdn.simpleicons.org/morganstanley",
          role: "Vice President, Investment Banking",
          start_date: "2012",
          end_date: "2018",
          description: "Executed cross-border transactions and leveraged buyouts. Built deep expertise in technology sector deals.",
          highlights: ["$8B in closed deals", "Cross-border expertise"]
        }
      ]
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'executive-clean',
      surface_priority: 'primary'
    }
  },
  awards: {
    content: {
      awards: [
        {
          title: "Deal of the Year",
          issuer: "Financial Times",
          date: "2023",
          interpretation: "Recognized for structuring the most innovative M&A transaction of the year"
        },
        {
          title: "40 Under 40 in Finance",
          issuer: "Fortune",
          date: "2021",
          interpretation: "Acknowledged as an emerging leader in investment banking"
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'executive-clean',
      surface_priority: 'supporting'
    }
  },
  testimonials: {
    content: {
      testimonials: [
        {
          quote: "One of the most strategic minds I've worked with. His ability to see through complexity and identify value creation opportunities is exceptional.",
          author_name: "Michael Torres",
          author_title: "Partner",
          author_company: "Goldman Sachs",
          relationship: "Direct supervisor"
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'medium',
      design_profile: 'executive-clean',
      surface_priority: 'secondary'
    }
  },
  get_in_touch: {
    content: {
      message: "I'm open to discussing strategic opportunities, board positions, and advisory roles. Let's explore how we might work together."
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'executive-clean',
      surface_priority: 'secondary'
    }
  },
  meta: {
    name: 'Jonathan Sterling',
    linkedin_url: 'https://linkedin.com/in/jonathansterling',
    resume_url: '/resume-sterling.pdf'
  }
}

// ============================================================================
// DEVELOPER - technical-minimal profile
// ============================================================================
export const DEVELOPER_PORTFOLIO: PortfolioData = {
  profile_picture: {
    content: { image_url: null },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'technical-minimal',
      surface_priority: 'secondary'
    }
  },
  introduction: {
    content: {
      headline: "const passion = () => buildingThingsThatScale()"
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'low',
      design_profile: 'technical-minimal',
      surface_priority: 'primary'
    }
  },
  about: {
    content: {
      text: "Staff engineer at heart, systems thinker by design. I've spent 8 years building distributed systems that handle millions of requests. Open source contributor, conference speaker, and firm believer that the best code is the code you don't have to write."
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'technical-minimal',
      surface_priority: 'primary'
    }
  },
  skills: {
    content: {
      groups: [
        {
          category: "Languages",
          skills: [
            { name: "TypeScript", logo_url: "https://cdn.simpleicons.org/typescript", category: "languages" },
            { name: "Rust", logo_url: "https://cdn.simpleicons.org/rust", category: "languages" },
            { name: "Go", logo_url: "https://cdn.simpleicons.org/go", category: "languages" }
          ]
        },
        {
          category: "Infrastructure",
          skills: [
            { name: "Kubernetes", logo_url: "https://cdn.simpleicons.org/kubernetes", category: "platforms" },
            { name: "AWS", logo_url: "https://cdn.simpleicons.org/amazonwebservices", category: "platforms" },
            { name: "Terraform", logo_url: "https://cdn.simpleicons.org/terraform", category: "tools" }
          ]
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'high',
      design_profile: 'technical-minimal',
      surface_priority: 'secondary'
    }
  },
  projects: {
    content: {
      projects: [
        {
          title: "distributed-cache-rs",
          description: "Open source distributed caching layer written in Rust. Handles 1M+ ops/second with sub-millisecond latency. Used in production by 50+ companies.",
          outcomes: ["4.2k GitHub stars", "1M+ ops/sec", "50+ production users"],
          technologies: ["Rust", "Tokio", "Redis Protocol"]
        },
        {
          title: "Real-time Analytics Pipeline",
          description: "Built the streaming infrastructure that processes 10B+ events daily. Reduced analytics latency from hours to seconds.",
          outcomes: ["10B events/day", "<1s latency", "99.99% uptime"],
          technologies: ["Kafka", "Flink", "ClickHouse", "Kubernetes"]
        }
      ]
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'technical-minimal',
      surface_priority: 'primary'
    }
  },
  work_experience: {
    content: {
      experiences: [
        {
          company: "Stripe",
          company_logo_url: "https://cdn.simpleicons.org/stripe",
          role: "Staff Engineer",
          start_date: "2021",
          end_date: "Present",
          description: "Tech lead for the payments infrastructure team. Designed the architecture that scaled Stripe to handle 500M+ API calls daily.",
          highlights: ["500M+ API calls/day", "Team tech lead", "3 critical systems"]
        },
        {
          company: "Cloudflare",
          company_logo_url: "https://cdn.simpleicons.org/cloudflare",
          role: "Senior Engineer",
          start_date: "2018",
          end_date: "2021",
          description: "Built edge computing primitives. Key contributor to Workers runtime that now serves billions of requests.",
          highlights: ["Workers runtime", "Edge computing", "Billions of requests"]
        }
      ]
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'technical-minimal',
      surface_priority: 'primary'
    }
  },
  awards: {
    content: {
      awards: [
        {
          title: "GitHub Star",
          issuer: "GitHub",
          date: "2023",
          interpretation: "Recognized for impactful open source contributions"
        },
        {
          title: "KubeCon Speaker",
          issuer: "CNCF",
          date: "2022",
          interpretation: "Invited to speak about distributed systems at scale"
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'technical-minimal',
      surface_priority: 'supporting'
    }
  },
  testimonials: {
    content: {
      testimonials: [
        {
          quote: "Alex is the engineer you want on your hardest problems. His distributed-cache-rs library saved us months of work and handles our entire caching layer.",
          author_name: "Jamie Liu",
          author_title: "Engineering Manager",
          author_company: "Stripe",
          relationship: "Worked together on payments infrastructure"
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'medium',
      design_profile: 'technical-minimal',
      surface_priority: 'secondary'
    }
  },
  get_in_touch: {
    content: {
      message: "Open to interesting technical challenges, open source collaborations, and conversations about distributed systems. DMs are open."
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'technical-minimal',
      surface_priority: 'secondary'
    }
  },
  meta: {
    name: 'Alex Chen',
    linkedin_url: 'https://linkedin.com/in/alexchen',
    resume_url: '/resume-chen.pdf'
  }
}

// ============================================================================
// PRODUCT THINKER - product-thinker profile (default/balanced)
// ============================================================================
export const PRODUCT_PORTFOLIO: PortfolioData = {
  profile_picture: {
    content: { image_url: null },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'product-thinker',
      surface_priority: 'secondary'
    }
  },
  introduction: {
    content: {
      headline: "I turn ambiguous problems into products people pay for—and teams that ship them."
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'low',
      design_profile: 'product-thinker',
      surface_priority: 'primary'
    }
  },
  about: {
    content: {
      text: "I think in systems but ship in sprints. My instinct is to find the wedge—the smallest thing that unlocks the biggest outcome. I've taken products from napkin sketch to millions in ARR, and I've learned that the best product decisions come from sitting with engineers, not above them."
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'product-thinker',
      surface_priority: 'primary'
    }
  },
  skills: {
    content: {
      groups: [
        {
          category: "AI & Platforms",
          skills: [
            { name: "LLMs", logo_url: "https://cdn.simpleicons.org/openai", category: "tools" },
            { name: "RAG", logo_url: undefined, category: "tools" },
            { name: "Unity", logo_url: "https://cdn.simpleicons.org/unity", category: "frameworks" },
            { name: "React", logo_url: "https://cdn.simpleicons.org/react", category: "frameworks" }
          ]
        }
      ]
    },
    design_intent: {
      emphasis: 'low',
      visual_density: 'medium',
      design_profile: 'product-thinker',
      surface_priority: 'supporting'
    }
  },
  projects: {
    content: {
      projects: [
        {
          title: "Voice AI for Automotive",
          description: "Car dealerships were hemorrhaging leads to clunky digital experiences. I saw the gap, pitched an AI voice agent, and built the first version with two engineers. Within a quarter, it was handling real customer calls—and changed how the company thinks about AI products.",
          outcomes: ["$300K ARR in first quarter", "Now core to company strategy"],
          technologies: ["LLMs", "Voice AI", "RAG"]
        },
        {
          title: "Immersive 3D Platform",
          description: "OEMs wanted better ways to sell cars online but didn't know what that looked like. I designed an interactive 3D experience from scratch, convinced skeptical stakeholders to bet on it, and scaled it to millions of users across three continents.",
          outcomes: ["$4M ARR", "3M+ global users", "10+ major OEM clients"],
          technologies: ["Unity", "BabylonJS", "React"]
        }
      ]
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'product-thinker',
      surface_priority: 'primary'
    }
  },
  work_experience: {
    content: {
      experiences: [
        {
          company: "Metadome.ai",
          company_logo_url: undefined,
          role: "Director of Product Management",
          start_date: "2024",
          end_date: "Present",
          description: "Leading product strategy for Series A AI/XR platform serving Fortune 500 companies. Co-inventor on granted US patent.",
          highlights: ["15+ member team", "30% cloud cost reduction"]
        },
        {
          company: "HP Inc",
          company_logo_url: "https://cdn.simpleicons.org/hp",
          role: "Software Development Engineer",
          start_date: "2019",
          end_date: "2020",
          description: "Pioneered VR training POC in collaboration with global R&D teams. Secured $500K internal funding.",
          highlights: ["$500K funding", "Global deployment"]
        }
      ]
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'product-thinker',
      surface_priority: 'primary'
    }
  },
  awards: {
    content: {
      awards: [
        {
          title: "US Patent Granted",
          issuer: "USPTO",
          date: "2026",
          interpretation: "Co-inventor for 'Method and System for Creating Virtual Spaces'"
        },
        {
          title: "Smart India Hackathon Winner",
          issuer: "Government of India",
          date: "2018",
          interpretation: "Selected from 10,000+ participants"
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'product-thinker',
      surface_priority: 'supporting'
    }
  },
  testimonials: {
    content: {
      testimonials: [
        {
          quote: "Working with Sidharth for more than 3.5 years has genuinely changed the way I look at building products. Every conversation with him reflects how deeply passionate he is about what he creates, and that energy naturally elevates the people around him. Beyond being a strong PM, he is also the person people naturally turn to when they are stuck with tech or idea roadblocks. Anyone who gets the chance to work with him will walk away with a fresh perspective, stronger thinking, and a better standard of collaboration.",
          author_name: "Kritika Sharma",
          author_title: "Product Designer",
          author_company: "Metadome.ai",
          relationship: "Worked together for 3.5+ years"
        },
        {
          quote: "Sidharth is the ideal counterpart for any Engineering Manager. We worked together for four years, transitioning from individual contributors to leadership roles. We worked together on Autodome (Immersive Auto-sales experiences). His sense of ownership was unmatched; he fights for the product's success as if it were his own, ensuring execution no matter the obstacles. He had then seamlessly transitioned this intensity to his work on an AI-powered Virtual Sales Assistant. He is a leader who takes absolute accountability and delivers results.",
          author_name: "Ashish Dasari",
          author_title: "Engineering Manager",
          author_company: "Metadome.ai",
          relationship: "Worked together for 4 years"
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'medium',
      design_profile: 'product-thinker',
      surface_priority: 'secondary'
    }
  },
  get_in_touch: {
    content: {
      message: "I'm always interested in discussing innovative product challenges, AI architecture, or potential collaborations. Let's connect."
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'product-thinker',
      surface_priority: 'secondary'
    }
  },
  meta: {
    name: 'Sidharth Suresh',
    linkedin_url: 'https://linkedin.com/in/sidharthsuresh',
    resume_url: '/resume-sidharth.pdf'
  }
}

// ============================================================================
// PRODUCT DESIGNER - product-designer profile
// ============================================================================
export const DESIGNER_PORTFOLIO: PortfolioData = {
  profile_picture: {
    content: { image_url: null },
    design_intent: {
      emphasis: 'high',
      visual_density: 'low',
      design_profile: 'product-designer',
      surface_priority: 'primary'
    }
  },
  introduction: {
    content: {
      headline: "I design products that people love to use—and businesses love to ship."
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'low',
      design_profile: 'product-designer',
      surface_priority: 'primary'
    }
  },
  about: {
    content: {
      text: "I'm a product designer who obsesses over the details that make interfaces feel inevitable. I've spent 7 years bridging the gap between user needs and business goals—turning complex problems into elegant solutions. I believe great design is invisible: it just works."
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'product-designer',
      surface_priority: 'primary'
    }
  },
  skills: {
    content: {
      groups: [
        {
          category: "Design",
          skills: [
            { name: "Figma", logo_url: "https://cdn.simpleicons.org/figma", category: "tools" },
            { name: "Prototyping", logo_url: undefined, category: "other" },
            { name: "Design Systems", logo_url: undefined, category: "other" }
          ]
        },
        {
          category: "Research",
          skills: [
            { name: "User Research", logo_url: undefined, category: "other" },
            { name: "Usability Testing", logo_url: undefined, category: "other" },
            { name: "Data Analysis", logo_url: undefined, category: "other" }
          ]
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'medium',
      design_profile: 'product-designer',
      surface_priority: 'secondary'
    }
  },
  projects: {
    content: {
      projects: [
        {
          title: "Redesigning Checkout for 40% Conversion Lift",
          description: "The checkout flow was bleeding users. I led a complete redesign—from user research to final handoff. By simplifying the flow from 5 steps to 2 and adding trust signals at key moments, we lifted conversion by 40% and reduced support tickets by half.",
          outcomes: ["+40% conversion", "-50% support tickets", "3-week turnaround"],
          technologies: ["Figma", "Hotjar", "A/B Testing"]
        },
        {
          title: "Building a Design System from Scratch",
          description: "The team was drowning in inconsistent components. I built a design system that became the single source of truth—tokens, components, and documentation. Engineering velocity doubled and design reviews became 10-minute syncs.",
          outcomes: ["200+ components", "2x faster development", "Adopted by 4 teams"],
          technologies: ["Figma", "Storybook", "React"]
        }
      ]
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'product-designer',
      surface_priority: 'primary'
    }
  },
  work_experience: {
    content: {
      experiences: [
        {
          company: "Airbnb",
          company_logo_url: "https://cdn.simpleicons.org/airbnb",
          role: "Senior Product Designer",
          start_date: "2021",
          end_date: "Present",
          description: "Leading design for the host experience team. Shipped features used by 4M+ hosts globally. Mentoring 2 junior designers.",
          highlights: ["4M+ hosts impacted", "Design system lead", "Team mentor"]
        },
        {
          company: "Figma",
          company_logo_url: "https://cdn.simpleicons.org/figma",
          role: "Product Designer",
          start_date: "2018",
          end_date: "2021",
          description: "Designed core collaboration features including comments and multiplayer cursors. Worked directly with Dylan Field on product vision.",
          highlights: ["Core features shipped", "10M+ users", "Design tool inception"]
        }
      ]
    },
    design_intent: {
      emphasis: 'high',
      visual_density: 'medium',
      design_profile: 'product-designer',
      surface_priority: 'primary'
    }
  },
  awards: {
    content: {
      awards: [
        {
          title: "Design Award",
          issuer: "Awwwards",
          date: "2023",
          interpretation: "Recognized for exceptional web design and user experience"
        },
        {
          title: "Rising Star",
          issuer: "Design Week",
          date: "2022",
          interpretation: "Named one of the top emerging designers in tech"
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'product-designer',
      surface_priority: 'supporting'
    }
  },
  testimonials: {
    content: {
      testimonials: [
        {
          quote: "Elena has an rare ability to balance user needs with business constraints. Her checkout redesign didn't just look better—it fundamentally changed how we think about conversion.",
          author_name: "Marcus Chen",
          author_title: "Head of Product",
          author_company: "Airbnb",
          relationship: "Direct manager"
        }
      ]
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'medium',
      design_profile: 'product-designer',
      surface_priority: 'secondary'
    }
  },
  get_in_touch: {
    content: {
      message: "Looking for a designer who ships? Let's chat about your product challenges."
    },
    design_intent: {
      emphasis: 'medium',
      visual_density: 'low',
      design_profile: 'product-designer',
      surface_priority: 'secondary'
    }
  },
  meta: {
    name: 'Elena Martinez',
    linkedin_url: 'https://linkedin.com/in/elenamartinez',
    resume_url: '/resume-martinez.pdf'
  }
}

// Export all personas for the demo switcher
export const DEMO_PORTFOLIOS = {
  finance: FINANCE_PORTFOLIO,
  developer: DEVELOPER_PORTFOLIO,
  product: PRODUCT_PORTFOLIO,
  designer: DESIGNER_PORTFOLIO
} as const

export type DemoPersona = keyof typeof DEMO_PORTFOLIOS

// Helper to get the design profile from a portfolio
export function getPortfolioDesignProfile(data: PortfolioData): DesignProfile {
  return data.introduction.design_intent.design_profile
}
