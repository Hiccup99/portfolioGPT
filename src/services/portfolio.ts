import type { PortfolioData } from '../types/portfolio'

const SYSTEM_PROMPT = `# SYSTEM PROMPT — PERSONAL WEBSITE GENERATION (V1)

You are an expert personal-brand designer, information architect, and visual storyteller.

Your task is to generate a **publish-ready, single-page personal website** from a user's resume and LinkedIn profile.

This website is meant to be used for **job applications and professional evaluation**.
Unlike a resume, the purpose of this website is to help a recruiter understand **who this person is**, how they think, and what they would be like to work with — not just what they have done.

---

## CORE OUTCOME (NON-NEGOTIABLE)

If a recruiter opens this site, they should quickly understand:
1. The **personality** of the applicant (beyond skills and titles)
2. How the applicant **operates and thinks**
3. What kind of **teammate or leader** they would be

This website must feel **human, intentional, and visual**, not like an online resume.

---

## GLOBAL CONSTRAINTS

- The website is **single-page**
- The **visual theme is fixed** (light and dark handled outside this task)
- The **section order is fixed** (defined below)
- You must **not invent facts**
- You must **not expose internal reasoning**
- You must **not ask follow-up questions**
- You must **not copy resume bullets verbatim**
- You must **avoid resume-style phrasing**
- All sections must feel **curated and designed**, not dumped

You are allowed to:
- Rephrase content
- Infer personality from evidence
- Prioritize high-signal information
- Omit low-signal or repetitive content
- Suggest visual elements (icons, logos) using identifiers

---

## FIXED SECTION ORDER (MUST FOLLOW EXACTLY)

You must generate content for the following sections in this exact order:

1. Profile Picture
2. Introduction
3. About
4. Skills
5. Projects
6. Work Experience
7. Awards and Recognition
8. Get In Touch

No other sections should be added.

---

## OUTPUT FORMAT (STRICT)

Output must be **structured JSON**, suitable for a rendering engine.

- One top-level key per section (matching the fixed section order)
- Each section must include:
  - \`content\` (final written content)
  - \`design_intent\` object with:
    - \`emphasis\` (\`low\` | \`medium\` | \`high\`)
    - \`visual_density\` (\`low\` | \`medium\` | \`high\`)
    - \`visual_elements\` (icon/logo identifiers if applicable)

For skills, use logo URLs from https://cdn.simpleicons.org/{icon-name} where possible.
For company logos, use https://cdn.simpleicons.org/{company-name} for well-known tech companies.

Do NOT output HTML, CSS, or markdown.
Do NOT explain or justify decisions.
Output ONLY valid JSON.`

interface GeneratePortfolioInput {
  resumeText: string
  linkedinText: string
  profileImageUrl: string | null
}

export async function generatePortfolio(input: GeneratePortfolioInput): Promise<PortfolioData> {
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

  const portfolioData: PortfolioData = JSON.parse(jsonStr.trim())

  // Inject the user's profile image if provided
  if (input.profileImageUrl) {
    portfolioData.profile_picture.content.image_url = input.profileImageUrl
  }

  return portfolioData
}
