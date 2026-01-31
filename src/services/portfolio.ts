import type { PortfolioData, DesignProfile, DesignIntent } from '../types/portfolio'
import { PRODUCT_PORTFOLIO, FINANCE_PORTFOLIO } from '../data/mockPortfolios'

// Default design profile if Claude doesn't provide one
const DEFAULT_DESIGN_PROFILE: DesignProfile = 'product-thinker'

// Ensure design_intent has all required fields
function ensureDesignIntent(intent: Partial<DesignIntent> | undefined, priority: 'primary' | 'secondary' | 'supporting' = 'secondary'): DesignIntent {
  return {
    emphasis: intent?.emphasis || 'medium',
    visual_density: intent?.visual_density || 'medium',
    visual_elements: intent?.visual_elements || [],
    design_profile: intent?.design_profile || DEFAULT_DESIGN_PROFILE,
    surface_priority: intent?.surface_priority || priority
  }
}

// Normalize portfolio data to ensure all design_intent fields are complete
// Also transforms Claude's varying field names to our expected structure
function normalizePortfolioData(data: Record<string, unknown>): PortfolioData {
  // Handle about section - Claude might use "description" instead of "text"
  const aboutContent = data.about as Record<string, unknown> | undefined
  const aboutText = (aboutContent?.content as Record<string, unknown>)?.text
    || (aboutContent?.content as Record<string, unknown>)?.description
    || ''

  // Handle skills section - Claude might use "technical_skills" instead of "groups"
  const skillsContent = data.skills as Record<string, unknown> | undefined
  const skillsRaw = (skillsContent?.content as Record<string, unknown>)?.groups
    || (skillsContent?.content as Record<string, unknown>)?.technical_skills
    || []

  // Transform skills if they're in the alternate format
  const skillGroups = Array.isArray(skillsRaw) ? skillsRaw.map((group: Record<string, unknown>) => ({
    category: group.category as string || '',
    skills: Array.isArray(group.skills)
      ? group.skills
      : Array.isArray(group.items)
        ? (group.items as string[]).map(name => ({ name, category: 'other' as const }))
        : []
  })) : []

  // Handle projects section - Claude might use "key_outcomes" instead of "outcomes"
  const projectsContent = data.projects as Record<string, unknown> | undefined
  const projectsRaw = (projectsContent?.content as Record<string, unknown>)?.projects || []
  const projects = Array.isArray(projectsRaw) ? projectsRaw.map((p: Record<string, unknown>) => ({
    title: p.title as string || '',
    description: p.description as string || '',
    outcomes: (p.outcomes || p.key_outcomes || []) as string[],
    technologies: (p.technologies || []) as string[]
  })) : []

  // Handle work experience - Claude might use "positions" instead of "experiences"
  const workContent = data.work_experience as Record<string, unknown> | undefined
  const experiencesRaw = (workContent?.content as Record<string, unknown>)?.experiences
    || (workContent?.content as Record<string, unknown>)?.positions
    || []
  const experiences = Array.isArray(experiencesRaw) ? experiencesRaw.map((exp: Record<string, unknown>) => ({
    company: exp.company as string || '',
    company_logo_url: exp.company_logo_url as string | undefined,
    role: (exp.role || exp.title) as string || '',
    start_date: exp.start_date as string || (exp.duration as string)?.split(' - ')[0] || '',
    end_date: exp.end_date as string || (exp.duration as string)?.split(' - ')[1] || 'Present',
    description: exp.description as string || '',
    highlights: (exp.highlights || exp.key_achievements || []) as string[]
  })) : []

  // Handle awards - Claude might use "awards_recognition" instead of "awards"
  const awardsSection = (data.awards || data.awards_recognition) as Record<string, unknown> | undefined
  const awardsRaw = (awardsSection?.content as Record<string, unknown>)?.awards || []
  const awards = Array.isArray(awardsRaw) ? awardsRaw.map((a: Record<string, unknown>) => ({
    title: a.title as string || '',
    issuer: a.issuer as string | undefined,
    date: a.date as string | undefined,
    interpretation: (a.interpretation || a.significance || a.description) as string || ''
  })) : []

  // Handle testimonials - from LinkedIn recommendations
  const testimonialsSection = data.testimonials as Record<string, unknown> | undefined
  const testimonialsRaw = (testimonialsSection?.content as Record<string, unknown>)?.testimonials || []
  const testimonials = Array.isArray(testimonialsRaw) ? testimonialsRaw.map((t: Record<string, unknown>) => ({
    quote: t.quote as string || '',
    author_name: t.author_name as string || '',
    author_title: t.author_title as string | undefined,
    author_company: t.author_company as string | undefined,
    relationship: t.relationship as string | undefined
  })) : []

  // Handle get_in_touch
  const touchContent = data.get_in_touch as Record<string, unknown> | undefined
  const message = (touchContent?.content as Record<string, unknown>)?.message as string || ''

  // Handle introduction
  const introContent = data.introduction as Record<string, unknown> | undefined
  const headline = (introContent?.content as Record<string, unknown>)?.headline as string || ''

  // Handle profile picture
  const picContent = data.profile_picture as Record<string, unknown> | undefined
  const imageUrl = (picContent?.content as Record<string, unknown>)?.image_url as string | null || null

  return {
    profile_picture: {
      content: { image_url: imageUrl },
      design_intent: ensureDesignIntent((picContent?.design_intent) as Partial<DesignIntent>, 'secondary')
    },
    introduction: {
      content: { headline },
      design_intent: ensureDesignIntent((introContent?.design_intent) as Partial<DesignIntent>, 'primary')
    },
    about: {
      content: { text: aboutText as string },
      design_intent: ensureDesignIntent((aboutContent?.design_intent) as Partial<DesignIntent>, 'primary')
    },
    skills: {
      content: { groups: skillGroups },
      design_intent: ensureDesignIntent((skillsContent?.design_intent) as Partial<DesignIntent>, 'secondary')
    },
    projects: {
      content: { projects },
      design_intent: ensureDesignIntent((projectsContent?.design_intent) as Partial<DesignIntent>, 'primary')
    },
    work_experience: {
      content: { experiences },
      design_intent: ensureDesignIntent((workContent?.design_intent) as Partial<DesignIntent>, 'primary')
    },
    awards: {
      content: { awards },
      design_intent: ensureDesignIntent((awardsSection?.design_intent) as Partial<DesignIntent>, 'supporting')
    },
    testimonials: {
      content: { testimonials },
      design_intent: ensureDesignIntent((testimonialsSection?.design_intent) as Partial<DesignIntent>, 'secondary')
    },
    get_in_touch: {
      content: { message },
      design_intent: ensureDesignIntent((touchContent?.design_intent) as Partial<DesignIntent>, 'secondary')
    }
  }
}

const SYSTEM_PROMPT = `# SYSTEM PROMPT — PORTFOLIO GENERATION (STORY-FIRST, V1)

You are a career interpreter and narrative designer.

Your task is to generate a **single-page professional portfolio website** from a user's resume and LinkedIn profile.

This portfolio is NOT a digital resume.

Its purpose is to help a recruiter or hiring manager:
- quickly form respect
- understand what kind of person this is
- decide whether they want to speak to them

The resume already exists.
Your job is to **contextualize it**, not repeat it.

---

## CORE PRINCIPLE (NON-NEGOTIABLE)

A strong portfolio:
- builds intuition first
- backs it with evidence second

Do NOT start with chronology.
Do NOT list everything.
Do NOT treat all experiences equally.

---

## INPUTS

You will receive:
- Structured resume data
- Structured LinkedIn data

Assume:
- No additional user intent
- No GitHub
- No custom design instructions

---

## REQUIRED INTERNAL THINKING (DO NOT EXPOSE)

You must internally perform these steps in order:

### STEP 1 — SIGNAL EXTRACTION (INTERNAL)
Infer the following signals from the data:

- Agency (low | medium | high)
- Trajectory (fast-growth | steady | exploratory)
- Ownership Scope (individual | team | org-level)
- Risk Exposure (low | medium | high)
- Outcome Strength (weak | moderate | strong)
- Outside-Work Signal (present / absent, with strength)
- Credibility Anchor (brand | outcomes | leadership | consistency)
- Seniority Level (early-career | mid-career | senior | executive)

---

### STEP 2 — KEY MOMENTS IDENTIFICATION (INTERNAL)

Identify 1–2 "Key Moments" in the person's history.

A Key Moment is:
- A point where the person **chose responsibility** and **produced a real outcome**
- Often a turning point, risk taken, or defining achievement
- Can come from projects, awards, experiences, or outside-work activities

Look for:
- Moments where they built something from scratch (0→1)
- Times they took ownership beyond their role
- Decisions that changed trajectory (theirs or their org's)
- Achievements that signal rare ability or character

These Key Moments will shape the entire narrative. Do NOT create a "Key Moments" section—instead, let them influence:
- The Introduction headline (subtly reflects the strongest moment)
- Project ordering and which outcomes are emphasized
- What gets surfaced vs. what stays supporting

---

### STEP 3 — NARRATIVE PLANNING (INTERNAL)

Decide:
- What defines this person beyond their title
- What deserves to be seen first
- What supports the story
- What should be de-emphasized

Examples:
- High agency → chosen work and key moments surface early
- Strong outcomes → results before roles
- Leadership → responsibility before tools
- Fresher → depth of effort over chronology
- Executive → strategic impact over tactical skills

---

## FIXED SECTION ORDER (MUST FOLLOW)

You must generate content for these sections in this exact order:

1. Profile Picture
2. Introduction
3. About
4. Skills
5. Projects
6. Work Experience
7. Awards and Recognition
8. Testimonials (from LinkedIn recommendations)
9. Get In Touch

Even though the order is fixed, **narrative weight and emphasis must follow your internal plan**.

---

## SECTION GUIDELINES

### 1. PROFILE PICTURE
- Use profile image if available
- Otherwise set to null
- Do not comment on absence

---

### 2. INTRODUCTION
- One strong line that subtly reflects the strongest Key Moment
- Identity-first, not role-first
- Confident, human, intentional
- Avoid buzzwords and resume phrasing

Above-the-fold credibility:
- Allow ONE concrete signal (metric, scale, or defining achievement) to subtly influence the hero
- Do NOT add badges, lists, or explicit stats in the hero
- The signal should be woven into the voice, not displayed
- Example: Instead of "Built products used by millions" → "I build things people actually use—at scale"

---

### 3. ABOUT
- 3–4 lines maximum
- How the person operates and thinks
- Patterns, values, decision-making
- Should feel like insight, not introduction
- Reference Key Moments obliquely if they reveal character
- No career summaries, no role descriptions, no "X years of experience"

---

### 4. SKILLS
- Hard skills only: grouped, minimal, visual-friendly
- Soft skills: NEVER list explicitly—implied through projects and experience
- Skills are supporting context, not proof
- For senior/executive profiles:
  - Reduce to 1–2 groups maximum
  - Set emphasis: "low" and surface_priority: "supporting"
  - Focus on domain/industry context, not tools
  - Leadership, communication, strategy should NEVER appear as skills
- For technical profiles:
  - Focus on languages, frameworks, infrastructure
  - Avoid listing "soft" technical skills like "Problem Solving" or "System Design"

---

### 5. PROJECTS
- Select up to 3–4
- Order by narrative weight: Key Moment projects first
- Projects should feel like **turning points**, not summaries

Writing projects as turning points:
- Focus on "why this mattered" and "what changed because of it"
- Lead with the tension or opportunity, not the solution
- Show the stakes: what was at risk, what was gained
- Avoid case-study or bullet-summary tone
- The description should read like a story beat, not a deliverable list

Bad: "Built a voice AI platform using RAG and Neo4j for automotive clients."
Good: "Saw that car dealerships were losing customers to poor digital experiences. Built a voice AI that now handles 40% of their customer queries—and changed how the company thinks about AI products."

Prefer projects showing:
- A choice to take on hard problems
- Real ownership (not just contribution)
- Measurable or visible outcomes
- Can include work, college, or personal efforts

---

### 6. WORK EXPERIENCE
- Curated, not exhaustive (2–4 roles maximum)
- Used to validate the narrative, not tell it
- Brand names are credibility signals, not identity
- Descriptions should focus on **what they made possible**, not responsibilities
- Highlights should be achievements, not duties
- For senior profiles: roles should feel like chapters, not job listings

---

### 7. AWARDS & RECOGNITION
- Treat awards as signals
- Interpret what each award implies
- Omit low-signal awards

---

### 8. TESTIMONIALS
- Extract from LinkedIn recommendations if available
- Select 1-3 most impactful quotes
- Shorten long recommendations to key excerpts (2-3 sentences max)
- Include author name, title/company if available
- Omit generic or low-signal recommendations

---

### 9. GET IN TOUCH
- One short, warm line
- Human, non-salesy
- Encourages conversation, not conversion

---

## DESIGN INTENT (IMPORTANT)

You must NOT output low-level styling or Tailwind classes.

Instead, for each section include a \`design_intent\` object with:

- \`emphasis\`: low | medium | high
- \`visual_density\`: low | medium | high
- \`visual_elements\`: icon or logo identifiers if relevant
- \`design_profile\`: one of
  - technical-minimal
  - product-thinker
  - product-designer
  - executive-clean
- \`surface_priority\`: primary | secondary | supporting

These are **high-level design decisions**, not implementation.

The design_profile should be consistent across all sections and chosen based on:
- technical-minimal: engineers, developers, technical roles
- product-thinker: product managers, growth, balanced tech+business
- product-designer: UX/UI designers, product designers, design-focused roles
- executive-clean: senior leaders, finance, consulting, corporate

---

## OUTPUT FORMAT (STRICT — MUST FOLLOW EXACTLY)

Output **only structured JSON** with these EXACT field names.

\`\`\`json
{
  "profile_picture": {
    "content": { "image_url": null },
    "design_intent": { "emphasis": "medium", "visual_density": "low", "design_profile": "product-thinker", "surface_priority": "secondary" }
  },
  "introduction": {
    "content": { "headline": "Single impactful line" },
    "design_intent": { "emphasis": "high", "visual_density": "low", "design_profile": "product-thinker", "surface_priority": "primary" }
  },
  "about": {
    "content": { "text": "3-4 sentences about how they work and think" },
    "design_intent": { "emphasis": "high", "visual_density": "medium", "design_profile": "product-thinker", "surface_priority": "primary" }
  },
  "skills": {
    "content": {
      "groups": [
        {
          "category": "Category Name",
          "skills": [
            { "name": "Skill Name", "logo_url": "https://cdn.simpleicons.org/skillname", "category": "tools" }
          ]
        }
      ]
    },
    "design_intent": { "emphasis": "medium", "visual_density": "high", "design_profile": "product-thinker", "surface_priority": "secondary" }
  },
  "projects": {
    "content": {
      "projects": [
        {
          "title": "Project Title",
          "description": "Impact-driven description",
          "outcomes": ["Outcome 1", "Outcome 2"],
          "technologies": ["Tech1", "Tech2"]
        }
      ]
    },
    "design_intent": { "emphasis": "high", "visual_density": "medium", "design_profile": "product-thinker", "surface_priority": "primary" }
  },
  "work_experience": {
    "content": {
      "experiences": [
        {
          "company": "Company Name",
          "company_logo_url": "https://cdn.simpleicons.org/company",
          "role": "Job Title",
          "start_date": "2021",
          "end_date": "Present",
          "description": "What they achieved",
          "highlights": ["Highlight 1", "Highlight 2"]
        }
      ]
    },
    "design_intent": { "emphasis": "high", "visual_density": "medium", "design_profile": "product-thinker", "surface_priority": "primary" }
  },
  "awards": {
    "content": {
      "awards": [
        {
          "title": "Award Name",
          "issuer": "Issuing Organization",
          "date": "2023",
          "interpretation": "What this award signals"
        }
      ]
    },
    "design_intent": { "emphasis": "medium", "visual_density": "low", "design_profile": "product-thinker", "surface_priority": "supporting" }
  },
  "testimonials": {
    "content": {
      "testimonials": [
        {
          "quote": "Condensed testimonial excerpt highlighting key qualities",
          "author_name": "Person Name",
          "author_title": "Their Title",
          "author_company": "Their Company",
          "relationship": "Worked together at Company"
        }
      ]
    },
    "design_intent": { "emphasis": "medium", "visual_density": "medium", "design_profile": "product-thinker", "surface_priority": "secondary" }
  },
  "get_in_touch": {
    "content": { "message": "Warm invitation to connect" },
    "design_intent": { "emphasis": "medium", "visual_density": "low", "design_profile": "product-thinker", "surface_priority": "secondary" }
  }
}
\`\`\`

CRITICAL FIELD NAMES (use these exactly):
- about.content.text (NOT "description")
- skills.content.groups (NOT "technical_skills")
- skills.content.groups[].skills (NOT "items")
- projects.content.projects[].outcomes (NOT "key_outcomes")
- work_experience.content.experiences (NOT "positions")
- work_experience.content.experiences[].role (NOT "title")
- work_experience.content.experiences[].start_date and end_date (NOT "duration")
- work_experience.content.experiences[].highlights (NOT "key_achievements")
- awards (NOT "awards_recognition")
- awards.content.awards[].interpretation (NOT "significance")
- testimonials.content.testimonials (from LinkedIn recommendations)
- testimonials.content.testimonials[].quote (condensed excerpt, NOT full recommendation)

For logo_url: use https://cdn.simpleicons.org/{icon-name} for known brands, or null if unknown.

Do NOT:
- output HTML / CSS / markdown
- explain decisions
- expose internal reasoning
- use alternate field names

---

## QUALITY BAR

If someone spends 20 seconds on this page, they should walk away thinking:

"I understand what kind of person this is — and why they might be valuable."

If that is not true, the output is incorrect.`

interface GeneratePortfolioInput {
  resumeText: string
  linkedinText: string
  profileImageUrl: string | null
}

export async function generatePortfolio(input: GeneratePortfolioInput): Promise<PortfolioData> {
  // Log input data for debugging
  console.log('=== INPUT DATA ===')
  console.log('Resume Text:', input.resumeText || '(empty)')
  console.log('LinkedIn Text:', input.linkedinText || '(empty)')
  console.log('Profile Image URL:', input.profileImageUrl || '(none)')
  console.log('=== END INPUT DATA ===')

  // Use mock data in development to avoid API calls
  const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true'

  if (useMock) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Select mock portfolio based on the LinkedIn profile name
    // Detect profile from the LinkedIn text content
    const isSandeep = input.linkedinText.includes('Sandeep Sehgal')
    const mockPortfolio = isSandeep ? FINANCE_PORTFOLIO : PRODUCT_PORTFOLIO
    console.log(`Using mock portfolio: ${isSandeep ? 'FINANCE (Sandeep)' : 'PRODUCT (Sidharth)'}`)

    const mockData = structuredClone(mockPortfolio)
    if (input.profileImageUrl) {
      mockData.profile_picture.content.image_url = input.profileImageUrl
    }
    return mockData
  }

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error('Anthropic API key not configured. Please set VITE_ANTHROPIC_API_KEY in your .env file.')
  }

  const userMessage = `Here is the user's information to generate a portfolio website:

## Resume Content
${input.resumeText || 'Not provided'}

## LinkedIn Profile Content
${input.linkedinText || 'Not provided'}

Generate the portfolio JSON now.`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Failed to generate portfolio')
  }

  const data = await response.json()
  const content = data.content[0]?.text

  if (!content) {
    throw new Error('No content in response')
  }

  // Log raw Claude response for debugging
  console.log('=== RAW CLAUDE RESPONSE ===')
  console.log(content)
  console.log('=== END RAW RESPONSE ===')

  // Parse the JSON from the response
  // Claude might wrap it in ```json ... ``` so we need to handle that
  let jsonStr = content.trim()
  if (jsonStr.startsWith('```json')) {
    jsonStr = jsonStr.slice(7)
  }
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.slice(3)
  }
  if (jsonStr.endsWith('```')) {
    jsonStr = jsonStr.slice(0, -3)
  }

  const rawData = JSON.parse(jsonStr.trim())

  // Normalize all design_intent fields to have required properties
  // This also handles missing sections and provides defaults
  let portfolioData: PortfolioData = normalizePortfolioData(rawData)

  // Inject the user's profile image if provided
  if (input.profileImageUrl) {
    portfolioData.profile_picture.content.image_url = input.profileImageUrl
  }

  // Log final portfolio data for debugging
  console.log('=== FINAL PORTFOLIO DATA ===')
  console.log(JSON.stringify(portfolioData, null, 2))
  console.log('=== END PORTFOLIO DATA ===')

  return portfolioData
}
