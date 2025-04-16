import db from './db';
import { hash } from 'bcryptjs';

async function seed() {
  try {
    // Clear existing data
    db.exec(`
      DELETE FROM applications;
      DELETE FROM internships;
      DELETE FROM companies;
      DELETE FROM users;
    `);

    // Create admin user
    const hashedPassword = await hash('admin123', 10);
    db.prepare(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `).run('Admin User', 'admin@example.com', hashedPassword, 'ADMIN');

    // Create sample companies
    const companies = [
      {
        name: 'TechCorp',
        logo: '/logos/techcorp.png',
        description: 'A leading technology company specializing in software development.',
        website: 'https://techcorp.example.com',
        location: 'San Francisco, CA'
      },
      {
        name: 'DataFlow',
        logo: '/logos/dataflow.png',
        description: 'Data analytics and machine learning solutions provider.',
        website: 'https://dataflow.example.com',
        location: 'New York, NY'
      },
      {
        name: 'WebSolutions',
        logo: '/logos/websolutions.png',
        description: 'Web development and digital marketing agency.',
        website: 'https://websolutions.example.com',
        location: 'Austin, TX'
      }
    ];

    const insertCompany = db.prepare(`
      INSERT INTO companies (name, logo, description, website, location)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const company of companies) {
      insertCompany.run(
        company.name,
        company.logo,
        company.description,
        company.website,
        company.location
      );
    }

    // Get company IDs
    const techCorpId = db.prepare('SELECT id FROM companies WHERE name = ?').get('TechCorp').id;
    const dataFlowId = db.prepare('SELECT id FROM companies WHERE name = ?').get('DataFlow').id;
    const webSolutionsId = db.prepare('SELECT id FROM companies WHERE name = ?').get('WebSolutions').id;

    // Create sample internships
    const internships = [
      {
        title: 'Software Engineering Intern',
        company_id: techCorpId,
        description: 'Join our team as a software engineering intern and work on cutting-edge projects.',
        requirements: 'Knowledge of JavaScript, React, Node.js',
        location: 'San Francisco, CA',
        duration: '3 months',
        salary: '$30/hour',
        type: 'INTERNSHIP',
        status: 'ACTIVE'
      },
      {
        title: 'Data Science Intern',
        company_id: dataFlowId,
        description: 'Work with our data science team to analyze and interpret complex data sets.',
        requirements: 'Python, SQL, Machine Learning basics',
        location: 'New York, NY',
        duration: '6 months',
        salary: '$35/hour',
        type: 'INTERNSHIP',
        status: 'ACTIVE'
      },
      {
        title: 'Frontend Developer Intern',
        company_id: webSolutionsId,
        description: 'Help build responsive and accessible web applications.',
        requirements: 'HTML, CSS, JavaScript, React',
        location: 'Austin, TX',
        duration: '3 months',
        salary: '$25/hour',
        type: 'INTERNSHIP',
        status: 'ACTIVE'
      }
    ];

    const insertInternship = db.prepare(`
      INSERT INTO internships (title, company_id, description, requirements, location, duration, salary, type, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const internship of internships) {
      insertInternship.run(
        internship.title,
        internship.company_id,
        internship.description,
        internship.requirements,
        internship.location,
        internship.duration,
        internship.salary,
        internship.type,
        internship.status
      );
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seed(); 