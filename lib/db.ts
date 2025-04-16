// Mock data from internships page
const MOCK_INTERNSHIPS = [
  {
    id: '1',
    title: 'Full Stack Developer Intern',
    company: { name: 'TechCorp', logo_url: 'https://via.placeholder.com/150' },
    location: 'Remote',
    duration: '6 months',
    stipend: '$30/hour',
    type: 'Full-time',
    description: 'Join our team to build modern web applications using React, Node.js, and cloud technologies.',
    requirements: 'React,Node.js,TypeScript,AWS',
    mode: 'Remote'
  },
  {
    id: '2',
    title: 'Machine Learning Engineer Intern',
    company: { name: 'AI Solutions', logo_url: 'https://via.placeholder.com/150' },
    location: 'San Francisco, CA',
    duration: '4 months',
    stipend: '$35/hour',
    type: 'Full-time',
    description: 'Work on cutting-edge ML projects using PyTorch and TensorFlow.',
    requirements: 'Python,PyTorch,TensorFlow,Machine Learning',
    mode: 'Hybrid'
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: { name: 'Creative Labs', logo_url: 'https://via.placeholder.com/150' },
    location: 'New York, NY',
    duration: '3 months',
    stipend: '$25/hour',
    type: 'Part-time',
    description: 'Design beautiful and intuitive user interfaces for web and mobile applications.',
    requirements: 'Figma,Adobe XD,UI Design,Prototyping',
    mode: 'Onsite'
  },
  {
    id: '4',
    title: 'Mobile App Developer Intern',
    company: { name: 'AppWorks', logo_url: 'https://via.placeholder.com/150' },
    location: 'Remote',
    duration: '6 months',
    stipend: '$28/hour',
    type: 'Full-time',
    description: 'Develop cross-platform mobile applications using React Native.',
    requirements: 'React Native,JavaScript,Mobile Development',
    mode: 'Remote'
  },
  {
    id: '5',
    title: 'Data Science Intern',
    company: { name: 'DataMinds', logo_url: 'https://via.placeholder.com/150' },
    location: 'Boston, MA',
    duration: '4 months',
    stipend: '$32/hour',
    type: 'Full-time',
    description: 'Analyze large datasets and build predictive models using Python.',
    requirements: 'Python,Pandas,Scikit-learn,SQL',
    mode: 'Hybrid'
  },
  {
    id: '6',
    title: 'Cloud Engineering Intern',
    company: { name: 'CloudTech', logo_url: 'https://via.placeholder.com/150' },
    location: 'Seattle, WA',
    duration: '6 months',
    stipend: '$33/hour',
    type: 'Full-time',
    description: 'Work with AWS services and implement cloud infrastructure solutions.',
    requirements: 'AWS,Docker,Kubernetes,DevOps',
    mode: 'Onsite'
  },
  {
    id: '7',
    title: 'Frontend Developer Intern',
    company: { name: 'WebCraft', logo_url: 'https://via.placeholder.com/150' },
    location: 'Remote',
    duration: '3 months',
    stipend: '$27/hour',
    type: 'Full-time',
    description: 'Build responsive web interfaces using modern JavaScript frameworks.',
    requirements: 'React,Vue.js,CSS,JavaScript',
    mode: 'Remote'
  },
  {
    id: '8',
    title: 'Cybersecurity Intern',
    company: { name: 'SecureNet', logo_url: 'https://via.placeholder.com/150' },
    location: 'Washington, DC',
    duration: '6 months',
    stipend: '$30/hour',
    type: 'Full-time',
    description: 'Learn about cybersecurity practices and implement security measures.',
    requirements: 'Network Security,Python,Linux',
    mode: 'Hybrid'
  },
  {
    id: '9',
    title: 'Game Development Intern',
    company: { name: 'GameStudios', logo_url: 'https://via.placeholder.com/150' },
    location: 'Los Angeles, CA',
    duration: '4 months',
    stipend: '$29/hour',
    type: 'Full-time',
    description: 'Create engaging games using Unity and C#.',
    requirements: 'Unity,C#,Game Development',
    mode: 'Onsite'
  },
  {
    id: '10',
    title: 'DevOps Engineer Intern',
    company: { name: 'DevOps Pro', logo_url: 'https://via.placeholder.com/150' },
    location: 'Remote',
    duration: '6 months',
    stipend: '$31/hour',
    type: 'Full-time',
    description: 'Implement CI/CD pipelines and automate deployment processes.',
    requirements: 'Jenkins,Docker,Git,Linux',
    mode: 'Remote'
  },
  {
    id: '11',
    title: 'Blockchain Developer Intern',
    company: { name: 'BlockTech', logo_url: 'https://via.placeholder.com/150' },
    location: 'Miami, FL',
    duration: '4 months',
    stipend: '$34/hour',
    type: 'Full-time',
    description: 'Develop smart contracts and blockchain applications.',
    requirements: 'Solidity,Web3.js,Ethereum',
    mode: 'Hybrid'
  },
  {
    id: '12',
    title: 'QA Engineering Intern',
    company: { name: 'QualityFirst', logo_url: 'https://via.placeholder.com/150' },
    location: 'Chicago, IL',
    duration: '3 months',
    stipend: '$26/hour',
    type: 'Full-time',
    description: 'Develop and execute test plans for web applications.',
    requirements: 'Selenium,JavaScript,Testing',
    mode: 'Onsite'
  },
  {
    id: '13',
    title: 'AR/VR Developer Intern',
    company: { name: 'VirtualTech', logo_url: 'https://via.placeholder.com/150' },
    location: 'Remote',
    duration: '6 months',
    stipend: '$32/hour',
    type: 'Full-time',
    description: 'Create immersive AR/VR experiences using Unity.',
    requirements: 'Unity,C#,AR/VR Development',
    mode: 'Remote'
  },
  {
    id: '14',
    title: 'Backend Developer Intern',
    company: { name: 'ServerPro', logo_url: 'https://via.placeholder.com/150' },
    location: 'Austin, TX',
    duration: '4 months',
    stipend: '$30/hour',
    type: 'Full-time',
    description: 'Build scalable backend services using Node.js and Python.',
    requirements: 'Node.js,Python,MongoDB,SQL',
    mode: 'Hybrid'
  },
  {
    id: '15',
    title: 'IoT Developer Intern',
    company: { name: 'IoTech', logo_url: 'https://via.placeholder.com/150' },
    location: 'San Jose, CA',
    duration: '6 months',
    stipend: '$33/hour',
    type: 'Full-time',
    description: 'Develop IoT solutions and embedded systems.',
    requirements: 'Arduino,Raspberry Pi,Python',
    mode: 'Onsite'
  },
  {
    id: '16',
    title: 'Data Engineer Intern',
    company: { name: 'DataFlow', logo_url: 'https://via.placeholder.com/150' },
    location: 'Remote',
    duration: '4 months',
    stipend: '$31/hour',
    type: 'Full-time',
    description: 'Build data pipelines and ETL processes.',
    requirements: 'Python,SQL,Apache Spark',
    mode: 'Remote'
  },
  {
    id: '17',
    title: 'Product Management Intern',
    company: { name: 'ProductLabs', logo_url: 'https://via.placeholder.com/150' },
    location: 'New York, NY',
    duration: '3 months',
    stipend: '$29/hour',
    type: 'Full-time',
    description: 'Learn product management methodologies and work on real products.',
    requirements: 'Product Management,Analytics,Agile',
    mode: 'Hybrid'
  },
  {
    id: '18',
    title: 'AI Research Intern',
    company: { name: 'AI Research Co', logo_url: 'https://via.placeholder.com/150' },
    location: 'Boston, MA',
    duration: '6 months',
    stipend: '$35/hour',
    type: 'Full-time',
    description: 'Conduct research in artificial intelligence and machine learning.',
    requirements: 'Python,Deep Learning,Research',
    mode: 'Onsite'
  },
  {
    id: '19',
    title: 'Technical Writer Intern',
    company: { name: 'TechDocs', logo_url: 'https://via.placeholder.com/150' },
    location: 'Remote',
    duration: '3 months',
    stipend: '$25/hour',
    type: 'Part-time',
    description: 'Create technical documentation and API guides.',
    requirements: 'Technical Writing,Markdown,Git',
    mode: 'Remote'
  },
  {
    id: '20',
    title: 'Systems Engineer Intern',
    company: { name: 'SysOps', logo_url: 'https://via.placeholder.com/150' },
    location: 'Seattle, WA',
    duration: '4 months',
    stipend: '$32/hour',
    type: 'Full-time',
    description: 'Work on system architecture and infrastructure optimization.',
    requirements: 'Linux,Networking,Cloud',
    mode: 'Hybrid'
  }
];

// Mock database interface
export const db = {
  internship: {
    findMany: async ({ include } = {}) => {
      return MOCK_INTERNSHIPS;
    },
    findUnique: async ({ where }) => {
      return MOCK_INTERNSHIPS.find(internship => internship.id === where.id);
    },
    create: async ({ data }) => {
      const newInternship = { id: String(MOCK_INTERNSHIPS.length + 1), ...data };
      MOCK_INTERNSHIPS.push(newInternship);
      return newInternship;
    }
  }
}; 