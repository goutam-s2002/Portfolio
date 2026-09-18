export interface Project {
  id: string | number
  title: string
  subtitle: string
  description: string
  techStack: string[]
  features: string[]
  color: string
  category: "Full Stack" | "Backend" | "Frontend" | string
  url: string
  url2: string
  sortOrder?: number
  createdAt?: string
}

export interface ResumeSettings {
  url: string
  filename: string
  updatedAt: string
}

export interface PortfolioData {
  resume: ResumeSettings
  projects: Project[]
}
