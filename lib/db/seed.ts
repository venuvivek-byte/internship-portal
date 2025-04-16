import { supabase } from '.'

async function seedDatabase() {
  try {
    // First, insert companies
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .insert([
        {
          name: 'TechCorp Solutions',
          website: 'https://techcorp.com',
          location: 'Bangalore, India',
          industry: 'Technology'
        },
        {
          name: 'Digital Innovations',
          website: 'https://digitalinnovations.com',
          location: 'Hyderabad, India',
          industry: 'Technology'
        },
        {
          name: 'CloudTech Systems',
          website: 'https://cloudtech.com',
          location: 'Mumbai, India',
          industry: 'Technology'
        },
        {
          name: 'FinanceHub',
          website: 'https://financehub.com',
          location: 'Mumbai, India',
          industry: 'Finance'
        },
        {
          name: 'HealthTech Solutions',
          website: 'https://healthtech.com',
          location: 'Pune, India',
          industry: 'Healthcare'
        }
      ])
      .select()

    if (companiesError) {
      console.error('Error inserting companies:', companiesError)
      return
    }

    // Then, insert internships
    const { error: internshipsError } = await supabase
      .from('internships')
      .insert([
        {
          title: 'Frontend Developer Intern',
          company_id: companies?.[0]?.id,
          description: 'Join our team as a Frontend Developer Intern and work on exciting web applications using React, Next.js, and TypeScript.',
          requirements: ['Knowledge of HTML, CSS, JavaScript', 'Familiarity with React', 'Basic understanding of TypeScript'],
          location: 'Bangalore, India',
          type: 'Full-time',
          duration: '6 months',
          stipend: 25000,
          experience_level: 'Entry Level',
          skills: 'React, TypeScript, HTML, CSS',
          industry: 'Technology'
        },
        {
          title: 'Backend Developer Intern',
          company_id: companies?.[1]?.id,
          description: 'Looking for a passionate Backend Developer Intern to work on our cloud infrastructure and API development.',
          requirements: ['Knowledge of Node.js', 'Basic understanding of databases', 'Interest in cloud technologies'],
          location: 'Hyderabad, India',
          type: 'Full-time',
          duration: '6 months',
          stipend: 30000,
          experience_level: 'Entry Level',
          skills: 'Node.js, PostgreSQL, AWS',
          industry: 'Technology'
        },
        {
          title: 'Data Science Intern',
          company_id: companies?.[2]?.id,
          description: 'Join our data science team to work on machine learning projects and data analytics.',
          requirements: ['Knowledge of Python', 'Understanding of statistics', 'Experience with data visualization'],
          location: 'Mumbai, India',
          type: 'Full-time',
          duration: '3 months',
          stipend: 35000,
          experience_level: 'Intermediate',
          skills: 'Python, Machine Learning, SQL',
          industry: 'Technology'
        },
        {
          title: 'Mobile App Developer Intern',
          company_id: companies?.[0]?.id,
          description: 'Work on our mobile applications using React Native and contribute to cross-platform development.',
          requirements: ['Knowledge of JavaScript/TypeScript', 'Interest in mobile development', 'Basic understanding of React'],
          location: 'Bangalore, India',
          type: 'Full-time',
          duration: '6 months',
          stipend: 28000,
          experience_level: 'Entry Level',
          skills: 'React Native, JavaScript, Mobile Development',
          industry: 'Technology'
        },
        {
          title: 'UI/UX Design Intern',
          company_id: companies?.[1]?.id,
          description: 'Join our design team to create beautiful and intuitive user interfaces for web and mobile applications.',
          requirements: ['Knowledge of Figma/Adobe XD', 'Understanding of UI/UX principles', 'Basic prototyping skills'],
          location: 'Hyderabad, India',
          type: 'Part-time',
          duration: '4 months',
          stipend: 20000,
          experience_level: 'Entry Level',
          skills: 'Figma, UI Design, UX Design',
          industry: 'Technology'
        },
        {
          title: 'DevOps Intern',
          company_id: companies?.[2]?.id,
          description: 'Learn and implement DevOps practices, work with cloud infrastructure and automation tools.',
          requirements: ['Basic Linux knowledge', 'Interest in automation', 'Understanding of CI/CD'],
          location: 'Mumbai, India',
          type: 'Full-time',
          duration: '6 months',
          stipend: 32000,
          experience_level: 'Intermediate',
          skills: 'Docker, Kubernetes, AWS, CI/CD',
          industry: 'Technology'
        },
        {
          title: 'Financial Analyst Intern',
          company_id: companies?.[3]?.id,
          description: 'Assist in financial analysis, reporting, and research for investment decisions.',
          requirements: ['Strong analytical skills', 'Knowledge of Excel', 'Understanding of financial markets'],
          location: 'Mumbai, India',
          type: 'Full-time',
          duration: '6 months',
          stipend: 30000,
          experience_level: 'Entry Level',
          skills: 'Financial Analysis, Excel, Research',
          industry: 'Finance'
        },
        {
          title: 'Investment Banking Intern',
          company_id: companies?.[3]?.id,
          description: 'Work with our investment banking team on financial modeling and market analysis.',
          requirements: ['Strong financial knowledge', 'Excel proficiency', 'Understanding of valuation'],
          location: 'Mumbai, India',
          type: 'Full-time',
          duration: '3 months',
          stipend: 35000,
          experience_level: 'Intermediate',
          skills: 'Financial Modeling, Valuation, Excel',
          industry: 'Finance'
        },
        {
          title: 'Healthcare Data Analyst Intern',
          company_id: companies?.[4]?.id,
          description: 'Analyze healthcare data to improve patient care and operational efficiency.',
          requirements: ['Statistical analysis skills', 'Python/R knowledge', 'Healthcare domain interest'],
          location: 'Pune, India',
          type: 'Full-time',
          duration: '6 months',
          stipend: 28000,
          experience_level: 'Entry Level',
          skills: 'Data Analysis, Python, Healthcare Analytics',
          industry: 'Healthcare'
        },
        {
          title: 'ML Engineer Intern',
          company_id: companies?.[0]?.id,
          description: 'Work on implementing machine learning models and improving AI systems.',
          requirements: ['Strong Python skills', 'ML/DL knowledge', 'Experience with PyTorch/TensorFlow'],
          location: 'Bangalore, India',
          type: 'Full-time',
          duration: '6 months',
          stipend: 40000,
          experience_level: 'Intermediate',
          skills: 'Python, Machine Learning, Deep Learning',
          industry: 'Technology'
        },
        {
          title: 'Product Management Intern',
          company_id: companies?.[1]?.id,
          description: 'Assist in product development lifecycle and feature prioritization.',
          requirements: ['Strong analytical skills', 'Basic technical understanding', 'Good communication'],
          location: 'Hyderabad, India',
          type: 'Full-time',
          duration: '4 months',
          stipend: 30000,
          experience_level: 'Entry Level',
          skills: 'Product Management, Analytics, Communication',
          industry: 'Technology'
        },
        {
          title: 'Digital Marketing Intern',
          company_id: companies?.[2]?.id,
          description: 'Help grow our online presence through various digital marketing channels.',
          requirements: ['Social media knowledge', 'Content creation skills', 'Basic analytics understanding'],
          location: 'Mumbai, India',
          type: 'Part-time',
          duration: '3 months',
          stipend: 18000,
          experience_level: 'Entry Level',
          skills: 'Digital Marketing, Social Media, Content Creation',
          industry: 'Marketing'
        },
        {
          title: 'Blockchain Developer Intern',
          company_id: companies?.[0]?.id,
          description: 'Work on blockchain applications and smart contract development.',
          requirements: ['Solidity knowledge', 'Web3 understanding', 'JavaScript skills'],
          location: 'Bangalore, India',
          type: 'Full-time',
          duration: '6 months',
          stipend: 45000,
          experience_level: 'Intermediate',
          skills: 'Blockchain, Solidity, Web3',
          industry: 'Technology'
        },
        {
          title: 'Quality Assurance Intern',
          company_id: companies?.[1]?.id,
          description: 'Join our QA team to ensure high-quality software delivery through testing.',
          requirements: ['Testing fundamentals', 'Attention to detail', 'Basic programming knowledge'],
          location: 'Hyderabad, India',
          type: 'Full-time',
          duration: '4 months',
          stipend: 25000,
          experience_level: 'Entry Level',
          skills: 'Software Testing, Test Automation, QA',
          industry: 'Technology'
        },
        {
          title: 'Business Analyst Intern',
          company_id: companies?.[3]?.id,
          description: 'Analyze business requirements and translate them into technical specifications.',
          requirements: ['Analytical thinking', 'Documentation skills', 'Business acumen'],
          location: 'Mumbai, India',
          type: 'Full-time',
          duration: '6 months',
          stipend: 28000,
          experience_level: 'Entry Level',
          skills: 'Business Analysis, Requirements Gathering, Documentation',
          industry: 'Finance'
        }
      ])

    if (internshipsError) {
      console.error('Error inserting internships:', internshipsError)
      return
    }

    console.log('Sample data inserted successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

// Run the seed function
seedDatabase() 