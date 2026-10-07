export const MOCK_STUDENT_USER = {
  id: 'usr_std_01',
  role: 'student',
  email: 'ashish.sharma@college.edu',
  fullName: 'Ashish Sharma',
  phone: '+91 98765 43210',
  college: 'National Institute of Engineering & Technology',
  branch: 'Computer Science & Engineering',
  graduationYear: 2026,
  cgpa: 8.1,
  headline: 'Aspiring Full Stack & Cloud Developer | Java, Spring Boot, React',
  bio: 'Final year CS student passionate about distributed backend architecture, AI integrations, and responsive modern web engineering.',
  location: 'Bengaluru, India',
  profileCompletion: 78,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  socialLinks: {
    github: 'https://github.com/ashish-sharma',
    linkedin: 'https://linkedin.com/in/ashishsharma-dev',
    portfolio: 'https://ashish-dev.io',
  },
  education: [
    {
      id: 'edu_1',
      institution: 'National Institute of Engineering & Technology',
      degree: 'B.Tech in Computer Science & Engineering',
      period: '2022 - 2026',
      score: '8.1 CGPA',
      status: 'Current',
    },
    {
      id: 'edu_2',
      institution: 'Delhi Public School, R.K. Puram',
      degree: 'Senior Secondary (Class XII) - Science stream',
      period: '2020 - 2022',
      score: '94.2%',
      status: 'Completed',
    }
  ],
  skills: [
    'Java', 'Spring Boot', 'React', 'JavaScript', 'Python', 'MySQL', 'REST API', 'Tailwind CSS', 'Git', 'Data Structures & Algorithms'
  ],
  projects: [
    {
      id: 'proj_1',
      title: 'Distributed Placement Portal',
      description: 'Microservice-oriented portal connecting campus recruiters and 1,500+ students with automated eligibility filtering.',
      technologies: ['Java', 'Spring Boot', 'React', 'MySQL'],
      github: 'https://github.com/ashish-sharma/placement-portal',
      live: 'https://campus-place.internal',
    },
    {
      id: 'proj_2',
      title: 'Smart Resume ATS Parser',
      description: 'NLP utility extracting candidate skill graphs and comparing similarity against job requirement vectors.',
      technologies: ['Python', 'FastAPI', 'Regex', 'Scikit-Learn'],
      github: 'https://github.com/ashish-sharma/resume-parser',
      live: null,
    }
  ],
  experience: [
    {
      id: 'exp_1',
      role: 'Full Stack Engineering Intern',
      company: 'TechCorp Solutions',
      period: 'Jun 2025 - Aug 2025',
      location: 'Bengaluru, India (Hybrid)',
      description: 'Built RESTful endpoints in Spring Boot and converted legacy UI to React 18, enhancing page rendering speed by 35%.',
    }
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'Oracle Certified Associate: Java SE 17 Developer',
      issuer: 'Oracle University',
      issueDate: 'Jan 2025',
      credentialId: 'ORCL-9928172',
    },
    {
      id: 'cert_2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      issueDate: 'Nov 2024',
      credentialId: 'COUR-MET-55410',
    }
  ],
  missingFields: ['Docker Knowledge Demonstration', 'Cloud Certifications (AWS/GCP)', 'Published Case Study']
};

export const MOCK_COMPANY_USER = {
  id: 'usr_cmp_01',
  role: 'company',
  email: 'recruiter@techcorp.io',
  companyName: 'TechCorp Solutions',
  industry: 'Enterprise Software & Cloud Systems',
  website: 'https://techcorp.io',
  location: 'Bengaluru / Hyderabad, India',
  description: 'TechCorp delivers resilient enterprise cloud services and high-scale financial technology infrastructure to global Fortune 500 partners.',
  verified: true,
  activeJobsCount: 8,
  totalApplicants: 142,
  logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&auto=format&fit=crop&q=80',
  founded: 2018,
  companySize: '500-1000 employees',
};

export const MOCK_ADMIN_USER = {
  id: 'usr_adm_01',
  role: 'admin',
  email: 'admin@careerai.edu',
  fullName: 'Placement Cell Director',
  department: 'Central Training & Placement Cell (T&P)',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
};

export const ALL_MOCK_USERS = [
  MOCK_STUDENT_USER,
  MOCK_COMPANY_USER,
  MOCK_ADMIN_USER
];
