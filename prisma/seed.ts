import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create multiple company users
  const companies = [
    {
      email: 'techcorp@example.com',
      name: 'TechCorp Solutions',
      description: 'Leading technology solutions provider',
        website: 'https://techcorp.example.com',
        industry: 'Technology',
      size: '100-500',
      location: 'New York, NY',
    },
    {
      email: 'innovate@example.com',
      name: 'InnovateAI',
      description: 'Pioneering AI and machine learning solutions',
      website: 'https://innovateai.example.com',
      industry: 'Artificial Intelligence',
      size: '50-200',
      location: 'San Francisco, CA',
    },
    {
      email: 'cyber@example.com',
      name: 'CyberSecure',
      description: 'Advanced cybersecurity solutions',
      website: 'https://cybersecure.example.com',
      industry: 'Cybersecurity',
      size: '200-1000',
      location: 'Boston, MA',
    },
  ]

  const createdCompanies = []

  for (const company of companies) {
    const companyUser = await prisma.user.upsert({
      where: { email: company.email },
      update: {},
      create: {
        email: company.email,
        name: company.name,
        password: await bcrypt.hash('password123', 12),
        user_type: 'company',
        company: {
          create: {
            name: company.name,
            description: company.description,
            website: company.website,
            industry: company.industry,
            size: company.size,
            location: company.location,
          },
        },
      },
    })

    const companyData = await prisma.company.findUnique({
      where: { user_id: companyUser.id },
    })

    if (companyData) {
      createdCompanies.push(companyData)
    }
  }

  // Create 20 sample internships
  const internships = [
    // TechCorp Solutions Internships
    {
      title: 'Software Engineering Intern',
      description: 'Join our team to work on cutting-edge software projects. You will learn about modern development practices and work with experienced engineers.',
      location: 'Remote',
        type: 'full-time',
      mode: 'remote',
        stipend: '$30/hour',
        duration: '3 months',
      skills: 'JavaScript,React,Node.js,TypeScript',
      perks: 'Flexible hours, Mentorship, Health insurance',
      status: 'published',
      start_date: new Date('2024-06-01'),
      end_date: new Date('2024-08-31'),
      company_id: createdCompanies[0].id,
    },
    {
      title: 'Frontend Development Intern',
      description: 'Help build beautiful and responsive user interfaces. Work with modern frontend technologies and learn from experienced developers.',
      location: 'New York, NY',
      type: 'part-time',
      mode: 'onsite',
      stipend: '$25/hour',
      duration: '4 months',
      skills: 'HTML,CSS,JavaScript,React,Vue.js',
      perks: 'Free lunch, Transportation allowance, Flexible schedule',
      status: 'published',
      start_date: new Date('2024-05-15'),
      end_date: new Date('2024-09-15'),
      company_id: createdCompanies[0].id,
    },
    {
      title: 'DevOps Engineering Intern',
      description: 'Learn about CI/CD pipelines, containerization, and cloud infrastructure. Work with modern DevOps tools and practices.',
      location: 'Hybrid',
      type: 'full-time',
      mode: 'hybrid',
      stipend: '$28/hour',
      duration: '4 months',
      skills: 'Docker,Kubernetes,AWS,Git,Linux',
      perks: 'Cloud certification, Home office setup, Health benefits',
        status: 'published',
      start_date: new Date('2024-07-15'),
      end_date: new Date('2024-11-15'),
      company_id: createdCompanies[0].id,
    },
    {
      title: 'Mobile Development Intern',
      description: 'Create cross-platform mobile applications using React Native and Flutter.',
        location: 'Remote',
        type: 'full-time',
        mode: 'remote',
      stipend: '$32/hour',
        duration: '3 months',
      skills: 'React Native,Flutter,Dart,JavaScript',
      perks: 'Remote work setup, Learning resources, Team building',
        status: 'published',
      start_date: new Date('2024-06-15'),
      end_date: new Date('2024-09-15'),
      company_id: createdCompanies[0].id,
    },
    {
      title: 'UI/UX Design Intern',
      description: 'Design beautiful and intuitive user interfaces for our products.',
        location: 'New York, NY',
        type: 'part-time',
        mode: 'hybrid',
      stipend: '$27/hour',
        duration: '6 months',
        skills: 'Figma,Adobe XD,UI Design,UX Research',
      perks: 'Design software license, Portfolio review, Mentorship',
        status: 'published',
      start_date: new Date('2024-07-01'),
      end_date: new Date('2024-12-31'),
      company_id: createdCompanies[0].id,
    },
    {
      title: 'Backend Development Intern',
      description: 'Work on scalable backend systems and APIs. Learn about database design, API development, and cloud services.',
      location: 'Remote',
      type: 'full-time',
      mode: 'remote',
      stipend: '$32/hour',
        duration: '3 months',
      skills: 'Node.js,Express,MongoDB,AWS',
      perks: 'Remote work setup, Learning resources, Team building',
      status: 'published',
      start_date: new Date('2024-06-15'),
      end_date: new Date('2024-09-15'),
      company_id: createdCompanies[0].id,
    },

    // InnovateAI Internships
    {
      title: 'Machine Learning Intern',
      description: 'Work on cutting-edge ML projects and develop AI models for real-world applications.',
      location: 'San Francisco, CA',
      type: 'full-time',
      mode: 'hybrid',
      stipend: '$35/hour',
        duration: '6 months',
      skills: 'Python,TensorFlow,PyTorch,ML',
      perks: 'GPU access, Research papers, Conference tickets',
      status: 'published',
      start_date: new Date('2024-06-01'),
      end_date: new Date('2024-11-30'),
      company_id: createdCompanies[1].id,
    },
    {
      title: 'Data Science Intern',
      description: 'Work with our data science team to analyze large datasets and build machine learning models.',
      location: 'Hybrid',
      type: 'full-time',
      mode: 'hybrid',
      stipend: '$35/hour',
        duration: '6 months',
      skills: 'Python,Pandas,Scikit-learn,TensorFlow',
      perks: 'Learning budget, Gym membership, Team events',
      status: 'published',
      start_date: new Date('2024-07-01'),
      end_date: new Date('2024-12-31'),
      company_id: createdCompanies[1].id,
    },
    {
      title: 'AI Research Intern',
      description: 'Contribute to cutting-edge AI research projects and publications.',
      location: 'Remote',
      type: 'full-time',
      mode: 'remote',
      stipend: '$38/hour',
        duration: '3 months',
      skills: 'Python,Deep Learning,NLP,Research',
      perks: 'Research mentorship, Publication opportunities',
      status: 'published',
      start_date: new Date('2024-08-01'),
      end_date: new Date('2024-10-31'),
      company_id: createdCompanies[1].id,
    },
    {
      title: 'Computer Vision Intern',
      description: 'Develop computer vision algorithms and work with image processing systems.',
        location: 'San Francisco, CA',
      type: 'full-time',
      mode: 'onsite',
      stipend: '$36/hour',
        duration: '4 months',
      skills: 'Python,OpenCV,PyTorch,Computer Vision',
      perks: 'Hardware access, Research collaboration',
      status: 'published',
      start_date: new Date('2024-07-15'),
      end_date: new Date('2024-11-15'),
      company_id: createdCompanies[1].id,
    },
    {
      title: 'NLP Engineering Intern',
      description: 'Work on natural language processing systems and language models.',
      location: 'Hybrid',
      type: 'full-time',
      mode: 'hybrid',
      stipend: '$34/hour',
        duration: '6 months',
      skills: 'Python,NLP,Transformers,BERT',
      perks: 'GPU access, Research papers, Team events',
      status: 'published',
      start_date: new Date('2024-06-15'),
      end_date: new Date('2024-12-15'),
      company_id: createdCompanies[1].id,
    },
    {
      title: 'AI Infrastructure Intern',
      description: 'Build and maintain AI infrastructure and deployment pipelines.',
      location: 'Remote',
      type: 'full-time',
      mode: 'remote',
      stipend: '$33/hour',
        duration: '3 months',
      skills: 'Python,Docker,Kubernetes,MLOps',
      perks: 'Cloud credits, Infrastructure training',
      status: 'published',
      start_date: new Date('2024-08-15'),
      end_date: new Date('2024-11-15'),
      company_id: createdCompanies[1].id,
    },

    // CyberSecure Internships
    {
      title: 'Security Engineering Intern',
      description: 'Help secure our applications and infrastructure. Learn about cybersecurity best practices.',
        location: 'Boston, MA',
      type: 'full-time',
      mode: 'hybrid',
      stipend: '$32/hour',
        duration: '4 months',
      skills: 'Security,Python,Network Security',
      perks: 'Security certifications, Training budget',
      status: 'published',
      start_date: new Date('2024-07-01'),
      end_date: new Date('2024-10-31'),
      company_id: createdCompanies[2].id,
    },
    {
      title: 'Penetration Testing Intern',
      description: 'Learn ethical hacking and security testing methodologies.',
        location: 'Remote',
      type: 'full-time',
      mode: 'remote',
      stipend: '$31/hour',
        duration: '3 months',
      skills: 'Security Testing,Python,Linux',
      perks: 'Security tools, Training resources',
      status: 'published',
      start_date: new Date('2024-08-01'),
      end_date: new Date('2024-10-31'),
      company_id: createdCompanies[2].id,
    },
    {
      title: 'Security Operations Intern',
      description: 'Monitor and respond to security incidents. Learn about SOC operations.',
      location: 'Boston, MA',
      type: 'full-time',
      mode: 'onsite',
      stipend: '$30/hour',
        duration: '6 months',
      skills: 'Security,SIEM,Incident Response',
      perks: 'Security training, SOC experience',
      status: 'published',
      start_date: new Date('2024-06-15'),
      end_date: new Date('2024-12-15'),
      company_id: createdCompanies[2].id,
    },
    {
      title: 'Cryptography Intern',
      description: 'Work on cryptographic systems and security protocols.',
      location: 'Hybrid',
      type: 'full-time',
      mode: 'hybrid',
      stipend: '$33/hour',
        duration: '4 months',
      skills: 'Cryptography,Mathematics,Python',
      perks: 'Research collaboration, Training',
      status: 'published',
      start_date: new Date('2024-07-15'),
      end_date: new Date('2024-11-15'),
      company_id: createdCompanies[2].id,
    },
    {
      title: 'Security Research Intern',
      description: 'Conduct security research and vulnerability assessments.',
      location: 'Remote',
      type: 'full-time',
      mode: 'remote',
      stipend: '$34/hour',
        duration: '3 months',
      skills: 'Security Research,Python,Analysis',
      perks: 'Research tools, Publication opportunities',
      status: 'published',
      start_date: new Date('2024-08-15'),
      end_date: new Date('2024-11-15'),
      company_id: createdCompanies[2].id,
    },
    {
      title: 'Security Automation Intern',
      description: 'Develop automated security testing and monitoring systems.',
      location: 'Boston, MA',
      type: 'full-time',
      mode: 'hybrid',
      stipend: '$31/hour',
        duration: '4 months',
      skills: 'Python,Automation,Security',
      perks: 'Automation tools, Training budget',
      status: 'published',
      start_date: new Date('2024-09-01'),
      end_date: new Date('2024-12-31'),
      company_id: createdCompanies[2].id,
    },
  ]

  // Create internships
  for (const internship of internships) {
    await prisma.internship.create({
      data: internship,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 