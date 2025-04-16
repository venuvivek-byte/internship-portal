import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL
    }
  }
})

async function main() {
  // Create multiple companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        user: {
          create: {
            email: 'microsoft@company.com',
            name: 'Microsoft India',
            user_type: 'company',
          }
        },
        name: 'Microsoft India',
        description: 'Leading global technology company',
        industry: 'Technology',
        location: 'Hyderabad',
        website: 'https://microsoft.com',
        logo_url: 'https://ui-avatars.com/api/?name=Microsoft',
      }
    }),
    prisma.company.create({
      data: {
        user: {
          create: {
            email: 'google@company.com',
            name: 'Google India',
            user_type: 'company',
          }
        },
        name: 'Google India',
        description: 'World\'s leading search and technology company',
        industry: 'Technology',
        location: 'Bangalore',
        website: 'https://google.com',
        logo_url: 'https://ui-avatars.com/api/?name=Google',
      }
    }),
    prisma.company.create({
      data: {
        user: {
          create: {
            email: 'amazon@company.com',
            name: 'Amazon India',
            user_type: 'company',
          }
        },
        name: 'Amazon India',
        description: 'Global e-commerce and technology leader',
        industry: 'Technology',
        location: 'Bangalore',
        website: 'https://amazon.in',
        logo_url: 'https://ui-avatars.com/api/?name=Amazon',
      }
    }),
    prisma.company.create({
      data: {
        user: {
          create: {
            email: 'flipkart@company.com',
            name: 'Flipkart',
            user_type: 'company',
          }
        },
        name: 'Flipkart',
        description: 'India\'s leading e-commerce company',
        industry: 'E-commerce',
        location: 'Bangalore',
        website: 'https://flipkart.com',
        logo_url: 'https://ui-avatars.com/api/?name=Flipkart',
      }
    }),
    prisma.company.create({
      data: {
        user: {
          create: {
            email: 'jpmorgan@company.com',
            name: 'JP Morgan Chase',
            user_type: 'company',
          }
        },
        name: 'JP Morgan Chase',
        description: 'Global financial services firm',
        industry: 'Finance',
        location: 'Mumbai',
        website: 'https://jpmorgan.com',
        logo_url: 'https://ui-avatars.com/api/?name=JPMorgan',
      }
    })
  ])

  console.log('Created companies:', companies)

  // Create internships for each company
  const internships = await Promise.all([
    // Microsoft Internships
    prisma.internship.create({
      data: {
        company_id: companies[0].id,
        title: 'Cloud Computing Intern',
        description: 'Work on Microsoft Azure cloud services and help build scalable solutions',
        location: 'Hyderabad',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '80000',
        duration: '6 months',
        skills: 'Azure,Cloud Computing,Docker,Kubernetes',
        perks: 'Health Insurance, Gym Membership, Food Allowance',
        status: 'published',
        start_date: new Date('2024-06-01'),
        end_date: new Date('2024-12-31'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[0].id,
        title: 'Machine Learning Engineer Intern',
        description: 'Join our AI research team to develop cutting-edge ML solutions',
        location: 'Bangalore',
        type: 'full-time',
        mode: 'onsite',
        stipend: '75000',
        duration: '6 months',
        skills: 'Python,TensorFlow,PyTorch,Machine Learning',
        perks: 'Housing Allowance, Transportation, Meals',
        status: 'published',
        start_date: new Date('2024-07-01'),
        end_date: new Date('2025-01-31'),
      }
    }),
    // Google Internships
    prisma.internship.create({
      data: {
        company_id: companies[1].id,
        title: 'Software Engineering Intern',
        description: 'Work on Google\'s core products and infrastructure',
        location: 'Bangalore',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '85000',
        duration: '6 months',
        skills: 'Java,Python,Algorithms,Data Structures',
        perks: 'Free Food, Gym, Transport',
        status: 'published',
        start_date: new Date('2024-06-01'),
        end_date: new Date('2024-12-31'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[1].id,
        title: 'UX Research Intern',
        description: 'Help improve Google products through user research and testing',
        location: 'Bangalore',
        type: 'full-time',
        mode: 'onsite',
        stipend: '70000',
        duration: '6 months',
        skills: 'User Research,Data Analysis,Prototyping',
        perks: 'Health Insurance, Food, Transport',
        status: 'published',
        start_date: new Date('2024-07-01'),
        end_date: new Date('2025-01-31'),
      }
    }),
    // Amazon Internships
    prisma.internship.create({
      data: {
        company_id: companies[2].id,
        title: 'Data Science Intern',
        description: 'Work with big data and analytics at Amazon',
        location: 'Bangalore',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '75000',
        duration: '6 months',
        skills: 'Python,SQL,Machine Learning,Data Analysis',
        perks: 'Amazon Prime Membership, Food, Transport',
        status: 'published',
        start_date: new Date('2024-06-01'),
        end_date: new Date('2024-12-31'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[2].id,
        title: 'Product Management Intern',
        description: 'Learn product management in one of the world\'s largest e-commerce platforms',
        location: 'Hyderabad',
        type: 'full-time',
        mode: 'onsite',
        stipend: '80000',
        duration: '6 months',
        skills: 'Product Management,Analytics,Strategy',
        perks: 'Housing Allowance, Food, Transport',
        status: 'published',
        start_date: new Date('2024-07-01'),
        end_date: new Date('2025-01-31'),
      }
    }),
    // Flipkart Internships
    prisma.internship.create({
      data: {
        company_id: companies[3].id,
        title: 'Android Developer Intern',
        description: 'Build and improve Flipkart\'s Android application',
        location: 'Bangalore',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '60000',
        duration: '6 months',
        skills: 'Android,Kotlin,Java,Mobile Development',
        perks: 'Flipkart Plus Membership, Food, Transport',
        status: 'published',
        start_date: new Date('2024-06-01'),
        end_date: new Date('2024-12-31'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[3].id,
        title: 'Supply Chain Analytics Intern',
        description: 'Work on optimizing Flipkart\'s supply chain operations',
        location: 'Bangalore',
        type: 'full-time',
        mode: 'onsite',
        stipend: '55000',
        duration: '6 months',
        skills: 'Data Analysis,Supply Chain,Python,SQL',
        perks: 'Food, Transport, Learning Budget',
        status: 'published',
        start_date: new Date('2024-07-01'),
        end_date: new Date('2025-01-31'),
      }
    }),
    // JP Morgan Internships
    prisma.internship.create({
      data: {
        company_id: companies[4].id,
        title: 'Investment Banking Analyst Intern',
        description: 'Learn investment banking operations and financial analysis',
        location: 'Mumbai',
        type: 'full-time',
        mode: 'onsite',
        stipend: '90000',
        duration: '6 months',
        skills: 'Financial Analysis,Excel,Modeling,Research',
        perks: 'Housing Allowance, Food, Transport',
        status: 'published',
        start_date: new Date('2024-06-01'),
        end_date: new Date('2024-12-31'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[4].id,
        title: 'Quantitative Research Intern',
        description: 'Work on quantitative trading strategies and financial models',
        location: 'Mumbai',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '85000',
        duration: '6 months',
        skills: 'Python,Statistics,Machine Learning,Finance',
        perks: 'Health Insurance, Food, Transport',
        status: 'published',
        start_date: new Date('2024-07-01'),
        end_date: new Date('2025-01-31'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[4].id,
        title: 'Technology Analyst Intern',
        description: 'Develop financial technology solutions and trading platforms',
        location: 'Mumbai',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '80000',
        duration: '6 months',
        skills: 'Java,Spring Boot,SQL,React',
        perks: 'Health Insurance, Food, Transport',
        status: 'published',
        start_date: new Date('2024-06-15'),
        end_date: new Date('2024-12-15'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[1].id,
        title: 'Cloud Security Intern',
        description: 'Work on securing Google Cloud Platform services',
        location: 'Hyderabad',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '82000',
        duration: '6 months',
        skills: 'Cloud Security,Network Security,Python',
        perks: 'Health Insurance, Food, Transport',
        status: 'published',
        start_date: new Date('2024-06-01'),
        end_date: new Date('2024-12-31'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[2].id,
        title: 'DevOps Engineer Intern',
        description: 'Learn and implement DevOps practices at Amazon',
        location: 'Bangalore',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '78000',
        duration: '6 months',
        skills: 'AWS,Docker,Kubernetes,CI/CD',
        perks: 'Amazon Prime, Food, Transport',
        status: 'published',
        start_date: new Date('2024-06-01'),
        end_date: new Date('2024-12-31'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[0].id,
        title: 'Cybersecurity Analyst Intern',
        description: 'Work on Microsoft\'s security products and infrastructure',
        location: 'Hyderabad',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '77000',
        duration: '6 months',
        skills: 'Network Security,Penetration Testing,Security Tools',
        perks: 'Health Insurance, Food, Transport',
        status: 'published',
        start_date: new Date('2024-06-15'),
        end_date: new Date('2024-12-15'),
      }
    }),
    prisma.internship.create({
      data: {
        company_id: companies[3].id,
        title: 'Data Engineering Intern',
        description: 'Build and maintain data pipelines at Flipkart',
        location: 'Bangalore',
        type: 'full-time',
        mode: 'hybrid',
        stipend: '65000',
        duration: '6 months',
        skills: 'Python,Spark,Hadoop,SQL',
        perks: 'Flipkart Plus, Food, Transport',
        status: 'published',
        start_date: new Date('2024-06-01'),
        end_date: new Date('2024-12-31'),
      }
    })
  ])

  console.log('Created internships:', internships)
  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 