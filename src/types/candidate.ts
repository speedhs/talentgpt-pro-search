
export interface Candidate {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  photo: string;
  skills: string[];
  experience: number;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  matchScore: number;
  availability: 'available' | 'employed' | 'interviewing';
  lastActive: Date;
  summary: string;
  education: {
    degree: string;
    institution: string;
    year: number;
    ranking?: number;
  }[];
  projects: {
    name: string;
    description: string;
    githubUrl?: string;
    liveUrl?: string;
  }[];
  endorsements: {
    skill: string;
    count: number;
  }[];
  saved: boolean;
}

export interface SearchFilters {
  skills: string[];
  location: string[];
  experienceMin: number;
  experienceMax: number;
  salaryMin: number;
  salaryMax: number;
  availability: string[];
}

export interface SearchResults {
  candidates: Candidate[];
  total: number;
  page: number;
  hasMore: boolean;
}
