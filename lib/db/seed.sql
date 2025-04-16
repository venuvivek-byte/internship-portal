-- First, clear existing data
TRUNCATE TABLE companies, internships RESTART IDENTITY CASCADE;

-- Insert sample companies
WITH inserted_companies AS (
  INSERT INTO companies (id, name, description, website, location, created_at, updated_at)
  VALUES
    (gen_random_uuid(), 'TechCorp', 'Leading technology solutions provider', 'https://techcorp.com', 'San Francisco, CA', NOW(), NOW()),
    (gen_random_uuid(), 'DataSystems', 'Big data and analytics company', 'https://datasystems.com', 'New York, NY', NOW(), NOW()),
    (gen_random_uuid(), 'CloudNet', 'Cloud infrastructure provider', 'https://cloudnet.com', 'Seattle, WA', NOW(), NOW()),
    (gen_random_uuid(), 'AILabs', 'Artificial Intelligence research company', 'https://ailabs.com', 'Boston, MA', NOW(), NOW()),
    (gen_random_uuid(), 'WebSolutions', 'Web development and design agency', 'https://websolutions.com', 'Austin, TX', NOW(), NOW())
  RETURNING id, name
)
-- Insert sample internships
INSERT INTO internships (
  id,
  title,
  company_id,
  type,
  location,
  duration,
  salary,
  description,
  requirements,
  created_at,
  updated_at
)
SELECT
  gen_random_uuid(),
  title,
  company_id,
  type,
  location,
  duration,
  salary,
  description,
  requirements,
  NOW(),
  NOW()
FROM (
  VALUES
    (
      'Software Development Intern',
      (SELECT id FROM inserted_companies WHERE name = 'TechCorp'),
      'Full-time',
      'San Francisco, CA',
      '6 months',
      5000,
      'Join our engineering team to develop cutting-edge software solutions',
      ARRAY['Strong programming skills in Python/Java', 'Knowledge of web technologies', 'Good problem-solving skills'],
      NOW(),
      NOW()
    ),
    (
      'Data Science Intern',
      (SELECT id FROM inserted_companies WHERE name = 'DataSystems'),
      'Full-time',
      'New York, NY',
      '3 months',
      4000,
      'Work on exciting data science projects using machine learning',
      ARRAY['Python', 'Machine Learning', 'Statistics'],
      NOW(),
      NOW()
    ),
    (
      'Cloud Engineering Intern',
      (SELECT id FROM inserted_companies WHERE name = 'CloudNet'),
      'Part-time',
      'Seattle, WA',
      '4 months',
      3500,
      'Help build and maintain cloud infrastructure',
      ARRAY['AWS/Azure knowledge', 'Linux', 'Networking basics'],
      NOW(),
      NOW()
    ),
    (
      'Machine Learning Research Intern',
      (SELECT id FROM inserted_companies WHERE name = 'AILabs'),
      'Full-time',
      'Boston, MA',
      '6 months',
      6000,
      'Research and implement state-of-the-art ML algorithms',
      ARRAY['Deep Learning', 'PyTorch/TensorFlow', 'Research experience'],
      NOW(),
      NOW()
    ),
    (
      'Frontend Development Intern',
      (SELECT id FROM inserted_companies WHERE name = 'WebSolutions'),
      'Full-time',
      'Austin, TX',
      '3 months',
      4500,
      'Create beautiful and responsive web interfaces',
      ARRAY['React/Vue.js', 'HTML/CSS', 'JavaScript'],
      NOW(),
      NOW()
    )
) AS internship_data (
  title,
  company_id,
  type,
  location,
  duration,
  salary,
  description,
  requirements,
  created_at,
  updated_at
); 