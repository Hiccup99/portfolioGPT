/**
 * TypeScript schema for LLM-generated portfolio content
 * Matches the output format defined in parse-user-content.md
 */

// Design profile determines the overall visual aesthetic
export type DesignProfile =
  | 'technical-minimal'    // Monospace, dark accents, clean
  | 'product-thinker'      // Balanced, modern, blue tones
  | 'product-designer'     // Visual, warm, creative but structured
  | 'executive-clean'      // Structured, muted, professional

// Surface priority determines visual weight
export type SurfacePriority = 'primary' | 'secondary' | 'supporting'

// Design intent applied to each section
export interface DesignIntent {
  emphasis: 'low' | 'medium' | 'high'
  visual_density: 'low' | 'medium' | 'high'
  visual_elements?: string[] // icon or logo identifiers if relevant
  design_profile: DesignProfile
  surface_priority: SurfacePriority
}

// Section 1: Profile Picture
export interface ProfilePictureSection {
  content: {
    image_url: string | null
  }
  design_intent: DesignIntent
}

// Section 2: Introduction (Hero)
export interface IntroductionSection {
  content: {
    headline: string
  }
  design_intent: DesignIntent
}

// Section 3: About
export interface AboutSection {
  content: {
    text: string
  }
  design_intent: DesignIntent
}

// Section 4: Skills
export interface Skill {
  name: string
  logo_url?: string
  category: 'languages' | 'frameworks' | 'tools' | 'platforms' | 'other'
}

export interface SkillsSection {
  content: {
    groups: {
      category: string
      skills: Skill[]
    }[]
  }
  design_intent: DesignIntent
}

// Section 5: Projects
export interface Project {
  title: string
  description: string
  outcomes?: string[]
  technologies?: string[]
}

export interface ProjectsSection {
  content: {
    projects: Project[]
  }
  design_intent: DesignIntent
}

// Section 6: Work Experience
export interface WorkExperience {
  company: string
  company_logo_url?: string
  role: string
  start_date: string
  end_date: string | 'Present'
  description: string
  highlights?: string[]
}

export interface WorkExperienceSection {
  content: {
    experiences: WorkExperience[]
  }
  design_intent: DesignIntent
}

// Section 7: Awards and Recognition
export interface Award {
  title: string
  issuer?: string
  date?: string
  interpretation: string
}

export interface AwardsSection {
  content: {
    awards: Award[]
  }
  design_intent: DesignIntent
}

// Section 8: Testimonials/Recommendations
export interface Testimonial {
  quote: string
  author_name: string
  author_title?: string
  author_company?: string
  relationship?: string
}

export interface TestimonialsSection {
  content: {
    testimonials: Testimonial[]
  }
  design_intent: DesignIntent
}

// Section 9: Get In Touch
export interface GetInTouchSection {
  content: {
    message: string
  }
  design_intent: DesignIntent
}

// Complete Portfolio Schema
export interface PortfolioData {
  profile_picture: ProfilePictureSection
  introduction: IntroductionSection
  about: AboutSection
  skills: SkillsSection
  projects: ProjectsSection
  work_experience: WorkExperienceSection
  awards: AwardsSection
  testimonials: TestimonialsSection
  get_in_touch: GetInTouchSection
  // Optional metadata for navbar
  meta?: {
    linkedin_url?: string
    resume_url?: string
    name?: string
  }
}

// User input types (for upload flow)
export interface UserUpload {
  resume_text?: string
  resume_file?: File
  linkedin_data?: LinkedInProfile
  profile_image?: File
}

// LinkedIn data structure
export interface LinkedInProfile {
  name?: string
  headline?: string
  summary?: string
  experience?: Array<{
    company: string
    title: string
    start_date: string
    end_date?: string
    description?: string
  }>
  skills?: string[]
  education?: Array<{
    school: string
    degree?: string
    field?: string
    start_year?: string
    end_year?: string
  }>
}
