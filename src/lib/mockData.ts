
import { Candidate } from '@/types/candidate';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Senior AI/ML Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=300&h=300&fit=crop&crop=face',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'RAG', 'Docker'],
    experience: 6,
    salary: { min: 180000, max: 220000, currency: 'USD' },
    matchScore: 95,
    availability: 'interviewing',
    lastActive: new Date('2024-01-15'),
    summary: 'Experienced AI/ML engineer with deep expertise in LangChain and RAG systems. Led development of conversational AI products serving millions of users.',
    education: [
      { degree: 'MS Computer Science', institution: 'Stanford University', year: 2018, ranking: 1 },
      { degree: 'BS Computer Science', institution: 'UC Berkeley', year: 2016, ranking: 3 }
    ],
    projects: [
      {
        name: 'ChatBot Framework',
        description: 'Open-source conversational AI framework using LangChain',
        githubUrl: 'https://github.com/example/chatbot'
      },
      {
        name: 'Document QA System',
        description: 'RAG-based document question-answering system',
        githubUrl: 'https://github.com/example/doc-qa'
      }
    ],
    endorsements: [
      { skill: 'Machine Learning', count: 47 },
      { skill: 'Python', count: 38 },
      { skill: 'LangChain', count: 23 }
    ],
    saved: false
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    title: 'Full Stack React Developer',
    company: 'Meta',
    location: 'Remote',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
    experience: 5,
    salary: { min: 140000, max: 170000, currency: 'USD' },
    matchScore: 88,
    availability: 'available',
    lastActive: new Date('2024-01-20'),
    summary: 'Full-stack developer specializing in React and TypeScript. Built scalable web applications serving millions of daily active users.',
    education: [
      { degree: 'BS Software Engineering', institution: 'MIT', year: 2019, ranking: 2 }
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'React-based e-commerce platform with real-time features',
        githubUrl: 'https://github.com/example/ecommerce',
        liveUrl: 'https://example-store.com'
      }
    ],
    endorsements: [
      { skill: 'React', count: 42 },
      { skill: 'TypeScript', count: 35 },
      { skill: 'Node.js', count: 28 }
    ],
    saved: true
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    title: 'DevOps Engineer',
    company: 'AWS',
    location: 'Berlin, Germany',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'CI/CD', 'Python'],
    experience: 7,
    salary: { min: 120000, max: 150000, currency: 'EUR' },
    matchScore: 92,
    availability: 'employed',
    lastActive: new Date('2024-01-18'),
    summary: 'Senior DevOps engineer with expertise in cloud infrastructure and container orchestration. Led migration of legacy systems to cloud-native architectures.',
    education: [
      { degree: 'MS Cloud Computing', institution: 'Technical University of Munich', year: 2017, ranking: 5 }
    ],
    projects: [
      {
        name: 'Infrastructure as Code',
        description: 'Terraform modules for AWS infrastructure automation',
        githubUrl: 'https://github.com/example/terraform-aws'
      }
    ],
    endorsements: [
      { skill: 'Kubernetes', count: 51 },
      { skill: 'AWS', count: 44 },
      { skill: 'DevOps', count: 39 }
    ],
    saved: false
  }
];
