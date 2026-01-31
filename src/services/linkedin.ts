import { MOCK_PROFILES, type MockProfile } from '../data/mockLinkedIn'

export interface LinkedInProfileData {
  name?: string
  headline?: string
  location?: string
  summary?: string
  profile_picture_url?: string
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
  awards?: Array<{
    name: string
    organization?: string
    date?: string
    summary?: string
  }>
  recommendations?: Array<{
    name: string
    summary: string
  }>
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
  // Use mock data in development to avoid hitting the API
  const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true'

  if (useMock) {
    const profileKey = (import.meta.env.VITE_MOCK_PROFILE || 'sidharth') as MockProfile
    const mockData = MOCK_PROFILES[profileKey] || MOCK_PROFILES.sidharth
    console.log(`Using mock LinkedIn data: ${profileKey}`)
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
    return transformScrapingDogResponse(mockData as Record<string, unknown>)
  }

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

  // Handle array response (ScrapingDog sometimes returns an array)
  const profileData = Array.isArray(data) ? data[0] : data

  // Transform ScrapingDog response to our format
  return transformScrapingDogResponse(profileData)
}

/**
 * Transform ScrapingDog API response to our internal format
 */
function transformScrapingDogResponse(data: Record<string, unknown>): LinkedInProfileData {
  // ScrapingDog returns data in a specific format, map it to our interface
  // Field names based on actual ScrapingDog response structure

  const profile: LinkedInProfileData = {
    // ScrapingDog uses "fullName" not "name"
    name: data.fullName as string || data.name as string || data.full_name as string,
    headline: data.headline as string || data.title as string,
    location: data.location as string,
    // ScrapingDog uses "about" not "summary"
    summary: data.about as string || data.summary as string,
    // ScrapingDog uses "profile_photo"
    profile_picture_url: data.profile_photo as string || data.profile_picture as string || data.profile_pic_url as string || data.avatar as string,
    connections_count: data.connections as string,
  }

  // Map experience - ScrapingDog uses "company_name" not "company"
  if (Array.isArray(data.experience)) {
    profile.experience = data.experience.map((exp: Record<string, unknown>) => ({
      title: exp.title as string || '',
      company: exp.company_name as string || exp.company as string || '',
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

  // Map certifications - ScrapingDog uses "certification" not "certifications"
  const certifications = data.certification || data.certifications
  if (Array.isArray(certifications)) {
    profile.certifications = (certifications as Array<Record<string, unknown>>).map((cert) => ({
      // ScrapingDog uses "certification" for the name field
      name: cert.certification as string || cert.name as string || cert.title as string || '',
      authority: cert.company_name as string || cert.authority as string || cert.issuing_organization as string,
      date: cert.issue_date as string || cert.date as string,
    }))
  }

  // Map languages
  if (Array.isArray(data.languages)) {
    profile.languages = (data.languages as Array<Record<string, unknown>>).map((lang) =>
      typeof lang === 'string' ? lang : lang.name as string || ''
    ).filter(Boolean)
  }

  // Map awards - ScrapingDog includes awards
  if (Array.isArray(data.awards)) {
    profile.awards = (data.awards as Array<Record<string, unknown>>).map((award) => ({
      name: award.name as string || '',
      organization: award.organization as string,
      date: award.duration as string || award.date as string,
      summary: award.summary as string,
    }))
  }

  // Map recommendations - ScrapingDog includes recommendations
  if (Array.isArray(data.recommendations)) {
    profile.recommendations = (data.recommendations as Array<Record<string, unknown>>).map((rec) => ({
      name: rec.name as string || '',
      summary: rec.summary as string || '',
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

  if (profile.languages && profile.languages.length > 0) {
    sections.push(`\nLanguages: ${profile.languages.join(', ')}`)
  }

  if (profile.awards && profile.awards.length > 0) {
    sections.push('\nAwards & Recognition:')
    profile.awards.forEach((award) => {
      sections.push(`- ${award.name}${award.organization ? ` (${award.organization})` : ''}${award.date ? ` - ${award.date}` : ''}`)
      if (award.summary) {
        sections.push(`  ${award.summary}`)
      }
    })
  }

  if (profile.recommendations && profile.recommendations.length > 0) {
    sections.push('\nRecommendations:')
    profile.recommendations.forEach((rec, i) => {
      sections.push(`\n${i + 1}. From ${rec.name}:`)
      sections.push(`   "${rec.summary}"`)
    })
  }

  return sections.join('\n')
}
