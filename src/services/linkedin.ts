export interface LinkedInProfileData {
  name?: string
  headline?: string
  location?: string
  summary?: string
  experience?: Array<{
    title: string
    company: string
    company_url?: string
    location?: string
    start_date?: string
    end_date?: string
    description?: string
  }>
  education?: Array<{
    school: string
    degree?: string
    field_of_study?: string
    start_date?: string
    end_date?: string
  }>
  skills?: string[]
  certifications?: Array<{
    name: string
    authority?: string
    date?: string
  }>
  languages?: string[]
  recommendations_count?: number
  connections_count?: string
}

/**
 * Extract LinkedIn username from various URL formats
 */
function extractLinkedInUsername(input: string): string {
  // Remove whitespace
  input = input.trim()

  // If it's just a username, return it
  if (!input.includes('/') && !input.includes('.')) {
    return input
  }

  // Try to extract from URL
  const patterns = [
    /linkedin\.com\/in\/([^\/\?]+)/i,
    /linkedin\.com\/pub\/([^\/\?]+)/i,
  ]

  for (const pattern of patterns) {
    const match = input.match(pattern)
    if (match) {
      return match[1]
    }
  }

  // If no pattern matched, return the input (might be a username)
  return input.replace(/\/$/, '')
}

/**
 * Fetch LinkedIn profile data using ScrapingDog API
 */
export async function fetchLinkedInProfile(linkedinUrl: string): Promise<LinkedInProfileData> {
  const apiKey = import.meta.env.VITE_SCRAPINGDOG_API_KEY

  if (!apiKey) {
    throw new Error('ScrapingDog API key not configured. Please set VITE_SCRAPINGDOG_API_KEY in your .env file.')
  }

  const username = extractLinkedInUsername(linkedinUrl)

  if (!username) {
    throw new Error('Invalid LinkedIn URL or username')
  }

  const profileUrl = `https://www.linkedin.com/in/${username}`

  const response = await fetch(
    `https://api.scrapingdog.com/linkedin?api_key=${apiKey}&type=profile&linkId=${encodeURIComponent(profileUrl)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error('ScrapingDog error:', errorText)
    throw new Error(`Failed to fetch LinkedIn profile: ${response.status}`)
  }

  const data = await response.json()

  // Transform ScrapingDog response to our format
  return transformScrapingDogResponse(data)
}

/**
 * Transform ScrapingDog API response to our internal format
 */
function transformScrapingDogResponse(data: Record<string, unknown>): LinkedInProfileData {
  // ScrapingDog returns data in a specific format, map it to our interface
  // The exact structure depends on ScrapingDog's response format

  const profile: LinkedInProfileData = {
    name: data.name as string || data.full_name as string,
    headline: data.headline as string || data.title as string,
    location: data.location as string,
    summary: data.summary as string || data.about as string,
  }

  // Map experience
  if (Array.isArray(data.experience)) {
    profile.experience = data.experience.map((exp: Record<string, unknown>) => ({
      title: exp.title as string || '',
      company: exp.company as string || exp.company_name as string || '',
      company_url: exp.company_url as string,
      location: exp.location as string,
      start_date: exp.start_date as string || exp.starts_at as string,
      end_date: exp.end_date as string || exp.ends_at as string,
      description: exp.description as string,
    }))
  }

  // Map education
  if (Array.isArray(data.education)) {
    profile.education = data.education.map((edu: Record<string, unknown>) => ({
      school: edu.school as string || edu.school_name as string || '',
      degree: edu.degree as string || edu.degree_name as string,
      field_of_study: edu.field_of_study as string || edu.field as string,
      start_date: edu.start_date as string || edu.starts_at as string,
      end_date: edu.end_date as string || edu.ends_at as string,
    }))
  }

  // Map skills
  if (Array.isArray(data.skills)) {
    profile.skills = data.skills.map((skill: unknown) =>
      typeof skill === 'string' ? skill : (skill as Record<string, string>).name || ''
    ).filter(Boolean)
  }

  // Map certifications
  if (Array.isArray(data.certifications)) {
    profile.certifications = data.certifications.map((cert: Record<string, unknown>) => ({
      name: cert.name as string || cert.title as string || '',
      authority: cert.authority as string || cert.issuing_organization as string,
      date: cert.date as string || cert.issue_date as string,
    }))
  }

  return profile
}

/**
 * Convert LinkedIn profile data to formatted text for the LLM
 */
export function linkedInProfileToText(profile: LinkedInProfileData): string {
  const sections: string[] = []

  if (profile.name) {
    sections.push(`Name: ${profile.name}`)
  }

  if (profile.headline) {
    sections.push(`Headline: ${profile.headline}`)
  }

  if (profile.location) {
    sections.push(`Location: ${profile.location}`)
  }

  if (profile.summary) {
    sections.push(`\nSummary:\n${profile.summary}`)
  }

  if (profile.experience && profile.experience.length > 0) {
    sections.push('\nExperience:')
    profile.experience.forEach((exp, i) => {
      sections.push(`\n${i + 1}. ${exp.title} at ${exp.company}`)
      if (exp.start_date || exp.end_date) {
        sections.push(`   ${exp.start_date || 'N/A'} - ${exp.end_date || 'Present'}`)
      }
      if (exp.location) {
        sections.push(`   Location: ${exp.location}`)
      }
      if (exp.description) {
        sections.push(`   ${exp.description}`)
      }
    })
  }

  if (profile.education && profile.education.length > 0) {
    sections.push('\nEducation:')
    profile.education.forEach((edu, i) => {
      const degree = [edu.degree, edu.field_of_study].filter(Boolean).join(' in ')
      sections.push(`\n${i + 1}. ${edu.school}`)
      if (degree) {
        sections.push(`   ${degree}`)
      }
      if (edu.start_date || edu.end_date) {
        sections.push(`   ${edu.start_date || 'N/A'} - ${edu.end_date || 'N/A'}`)
      }
    })
  }

  if (profile.skills && profile.skills.length > 0) {
    sections.push(`\nSkills: ${profile.skills.join(', ')}`)
  }

  if (profile.certifications && profile.certifications.length > 0) {
    sections.push('\nCertifications:')
    profile.certifications.forEach((cert) => {
      sections.push(`- ${cert.name}${cert.authority ? ` (${cert.authority})` : ''}`)
    })
  }

  return sections.join('\n')
}
