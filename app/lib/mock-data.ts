export interface Company {
  id: number
  name: string
  logo?: string
  description?: string
}

export interface Internship {
  id: number
  company: Company
  title: string
  description: string
  location: string
  type: string
  duration: string
  stipend: string
  requirements: string
  applicant_name?: string
  applicant_email?: string
  tags: string[]
}

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 1,
    company: {
      id: 1,
      name: "TechCorp",
      description: "Leading technology solutions provider"
    },
    title: "Frontend Developer Intern",
    description: "Join our team to build modern web applications",
    location: "San Francisco, CA",
    type: "Full-time",
    duration: "6 months",
    stipend: "$2000/month",
    requirements: "React, TypeScript, HTML/CSS",
    tags: ["React", "TypeScript", "Frontend"]
  },
  {
    id: 2,
    company: {
      id: 2,
      name: "DataCo",
      description: "Data analytics and insights company"
    },
    title: "Data Science Intern",
    description: "Work on real-world data analysis projects",
    location: "New York, NY",
    type: "Full-time",
    duration: "3 months",
    stipend: "$2500/month",
    requirements: "Python, SQL, Machine Learning",
    tags: ["Python", "SQL", "Data Science"]
  },
  {
    id: 3,
    company: {
      id: 3,
      name: "CloudTech",
      description: "Cloud infrastructure solutions"
    },
    title: "Cloud Engineering Intern",
    description: "Help build and maintain cloud infrastructure",
    location: "Seattle, WA",
    type: "Full-time",
    duration: "4 months",
    stipend: "$2200/month",
    requirements: "AWS, Docker, Linux",
    tags: ["AWS", "Cloud", "DevOps"]
  },
  {
    id: 4,
    company: {
      id: 4,
      name: "DesignHub",
      description: "Creative design agency"
    },
    title: "UI/UX Design Intern",
    description: "Create beautiful and intuitive user interfaces",
    location: "Los Angeles, CA",
    type: "Part-time",
    duration: "6 months",
    stipend: "$1800/month",
    requirements: "Figma, Adobe XD, UI/UX principles",
    tags: ["UI/UX", "Design", "Figma"]
  }
] 