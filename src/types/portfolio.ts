/**
 * TypeScript schema for LLM-generated portfolio content
 * Matches the output format defined in parse-user-content.md
 */

// Design intent applied to each section
export interface DesignIntent {
  emphasis: 'low' | 'medium' | 'high';
  visual_density: 'low' | 'medium' | 'high';
  visual_elements?: string[]; // icon/logo URLs or identifiers
}

// Section 1: Profile Picture
export interface ProfilePictureSection {
  content: {
    image_url: string | null; // User-uploaded image URL
  };
  design_intent: DesignIntent;
}

// Section 2: Introduction (Hero)
export interface IntroductionSection {
  content: {
    headline: string; // Single strong intro line
  };
  design_intent: DesignIntent;
}

// Section 3: About
export interface AboutSection {
  content: {
    text: string; // 3-4 lines about the person
  };
  design_intent: DesignIntent;
}

// Section 4: Skills
export interface Skill {
  name: string;
  logo_url?: string; // URL to logo image (transparent bg)
  category: 'languages' | 'frameworks' | 'tools' | 'platforms' | 'other';
}

export interface SkillsSection {
  content: {
    groups: {
      category: string;
      skills: Skill[];
    }[];
  };
  design_intent: DesignIntent;
}

// Section 5: Projects
export interface Project {
  title: string;
  description: string; // Impact-driven, not task list
  outcomes?: string[]; // Key outcomes/results
  technologies?: string[]; // Tech used (optional)
}

export interface ProjectsSection {
  content: {
    projects: Project[]; // Max 3-4
  };
  design_intent: DesignIntent;
}

// Section 6: Work Experience
export interface WorkExperience {
  company: string;
  company_logo_url?: string; // URL to company logo (if recognizable)
  role: string;
  start_date: string;
  end_date: string | 'Present';
  description: string; // Curated, outcome-focused
  highlights?: string[];
}

export interface WorkExperienceSection {
  content: {
    experiences: WorkExperience[]; // Max 4 roles
  };
  design_intent: DesignIntent;
}

// Section 7: Awards and Recognition
export interface Award {
  title: string;
  issuer?: string;
  date?: string;
  interpretation: string; // What this award signals about the person
}

export interface AwardsSection {
  content: {
    awards: Award[];
  };
  design_intent: DesignIntent;
}

// Section 8: Get In Touch
export interface GetInTouchSection {
  content: {
    message: string; // Warm, personality-aligned CTA
  };
  design_intent: DesignIntent;
}

// Complete Portfolio Schema
export interface PortfolioData {
  profile_picture: ProfilePictureSection;
  introduction: IntroductionSection;
  about: AboutSection;
  skills: SkillsSection;
  projects: ProjectsSection;
  work_experience: WorkExperienceSection;
  awards: AwardsSection;
  get_in_touch: GetInTouchSection;
}

// User input types (for upload flow)
export interface UserUpload {
  resume_text?: string;
  resume_file?: File;
  linkedin_data?: LinkedInProfile;
  profile_image?: File;
}

// Placeholder for LinkedIn data structure
// Will be refined based on actual LinkedIn scraping/API response
export interface LinkedInProfile {
  name?: string;
  headline?: string;
  summary?: string;
  experience?: Array<{
    company: string;
    title: string;
    start_date: string;
    end_date?: string;
    description?: string;
  }>;
  skills?: string[];
  education?: Array<{
    school: string;
    degree?: string;
    field?: string;
    start_year?: string;
    end_year?: string;
  }>;
}
