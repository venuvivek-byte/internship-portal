-- First, let's clean up existing internships if you want to start fresh
-- DELETE FROM "Internship";

-- Create the cuid extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to generate CUID-like IDs
CREATE OR REPLACE FUNCTION generate_cuid()
RETURNS text AS $$
DECLARE
  timestamp_part text;
  random_part text;
BEGIN
  timestamp_part := LOWER(TO_HEX(FLOOR(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint));
  random_part := LOWER(encode(gen_random_bytes(8), 'hex'));
  RETURN 'c' || timestamp_part || random_part;
END;
$$ LANGUAGE plpgsql;

-- Get company IDs
WITH company_ids AS (
  SELECT id, name FROM "Company"
  WHERE name IN ('Microsoft India', 'Google India', 'Amazon India', 'Flipkart', 'JP Morgan Chase')
)

-- Insert internships using a query to get the correct company_id
INSERT INTO "Internship" (
    id,
    company_id, title, description, location, type, mode, 
    stipend, duration, skills, perks, status, 
    start_date, end_date, created_at, updated_at
)
SELECT 
    generate_cuid() as id,
    c.id as company_id,
    i.title,
    i.description,
    i.location,
    i.type,
    i.mode,
    i.stipend,
    i.duration,
    i.skills,
    i.perks,
    'published' as status,
    i.start_date::date,
    i.end_date::date,
    NOW() as created_at,
    NOW() as updated_at
FROM (
    -- Microsoft internships
    SELECT 'Microsoft India' as company_name, 'Cloud Computing Intern' as title,
           'Work on Microsoft Azure cloud services and help build scalable solutions' as description,
           'Hyderabad' as location, 'full-time' as type, 'hybrid' as mode,
           '80000' as stipend, '6 months' as duration,
           'Azure,Cloud Computing,Docker,Kubernetes' as skills,
           'Health Insurance, Gym Membership, Food Allowance' as perks,
           '2024-06-01' as start_date, '2024-12-31' as end_date
    UNION ALL
    SELECT 'Microsoft India', 'Machine Learning Engineer Intern',
           'Join our AI research team to develop cutting-edge ML solutions',
           'Bangalore', 'full-time', 'onsite', '75000', '6 months',
           'Python,TensorFlow,PyTorch,Machine Learning',
           'Housing Allowance, Transportation, Meals',
           '2024-07-01', '2025-01-31'
    UNION ALL
    SELECT 'Microsoft India', 'Cybersecurity Analyst Intern',
           'Work on Microsoft''s security products and infrastructure',
           'Hyderabad', 'full-time', 'hybrid', '77000', '6 months',
           'Network Security,Penetration Testing,Security Tools',
           'Health Insurance, Food, Transport',
           '2024-06-15', '2024-12-15'

    UNION ALL
    -- Google internships
    SELECT 'Google India', 'Software Engineering Intern',
           'Work on Google''s core products and infrastructure',
           'Bangalore', 'full-time', 'hybrid', '85000', '6 months',
           'Java,Python,Algorithms,Data Structures',
           'Free Food, Gym, Transport',
           '2024-06-01', '2024-12-31'
    UNION ALL
    SELECT 'Google India', 'UX Research Intern',
           'Help improve Google products through user research and testing',
           'Bangalore', 'full-time', 'onsite', '70000', '6 months',
           'User Research,Data Analysis,Prototyping',
           'Health Insurance, Food, Transport',
           '2024-07-01', '2025-01-31'
    UNION ALL
    SELECT 'Google India', 'Cloud Security Intern',
           'Work on securing Google Cloud Platform services',
           'Hyderabad', 'full-time', 'hybrid', '82000', '6 months',
           'Cloud Security,Network Security,Python',
           'Health Insurance, Food, Transport',
           '2024-06-01', '2024-12-31'

    UNION ALL
    -- Amazon internships
    SELECT 'Amazon India', 'Data Science Intern',
           'Work with big data and analytics at Amazon',
           'Bangalore', 'full-time', 'hybrid', '75000', '6 months',
           'Python,SQL,Machine Learning,Data Analysis',
           'Amazon Prime Membership, Food, Transport',
           '2024-06-01', '2024-12-31'
    UNION ALL
    SELECT 'Amazon India', 'Product Management Intern',
           'Learn product management in one of the world''s largest e-commerce platforms',
           'Hyderabad', 'full-time', 'onsite', '80000', '6 months',
           'Product Management,Analytics,Strategy',
           'Housing Allowance, Food, Transport',
           '2024-07-01', '2025-01-31'
    UNION ALL
    SELECT 'Amazon India', 'DevOps Engineer Intern',
           'Learn and implement DevOps practices at Amazon',
           'Bangalore', 'full-time', 'hybrid', '78000', '6 months',
           'AWS,Docker,Kubernetes,CI/CD',
           'Amazon Prime, Food, Transport',
           '2024-06-01', '2024-12-31'

    UNION ALL
    -- Flipkart internships
    SELECT 'Flipkart', 'Android Developer Intern',
           'Build and improve Flipkart''s Android application',
           'Bangalore', 'full-time', 'hybrid', '60000', '6 months',
           'Android,Kotlin,Java,Mobile Development',
           'Flipkart Plus Membership, Food, Transport',
           '2024-06-01', '2024-12-31'
    UNION ALL
    SELECT 'Flipkart', 'Supply Chain Analytics Intern',
           'Work on optimizing Flipkart''s supply chain operations',
           'Bangalore', 'full-time', 'onsite', '55000', '6 months',
           'Data Analysis,Supply Chain,Python,SQL',
           'Food, Transport, Learning Budget',
           '2024-07-01', '2025-01-31'
    UNION ALL
    SELECT 'Flipkart', 'Data Engineering Intern',
           'Build and maintain data pipelines at Flipkart',
           'Bangalore', 'full-time', 'hybrid', '65000', '6 months',
           'Python,Spark,Hadoop,SQL',
           'Flipkart Plus, Food, Transport',
           '2024-06-01', '2024-12-31'

    UNION ALL
    -- JP Morgan internships
    SELECT 'JP Morgan Chase', 'Investment Banking Analyst Intern',
           'Learn investment banking operations and financial analysis',
           'Mumbai', 'full-time', 'onsite', '90000', '6 months',
           'Financial Analysis,Excel,Modeling,Research',
           'Housing Allowance, Food, Transport',
           '2024-06-01', '2024-12-31'
    UNION ALL
    SELECT 'JP Morgan Chase', 'Quantitative Research Intern',
           'Work on quantitative trading strategies and financial models',
           'Mumbai', 'full-time', 'hybrid', '85000', '6 months',
           'Python,Statistics,Machine Learning,Finance',
           'Health Insurance, Food, Transport',
           '2024-07-01', '2025-01-31'
    UNION ALL
    SELECT 'JP Morgan Chase', 'Technology Analyst Intern',
           'Develop financial technology solutions and trading platforms',
           'Mumbai', 'full-time', 'hybrid', '80000', '6 months',
           'Java,Spring Boot,SQL,React',
           'Health Insurance, Food, Transport',
           '2024-06-15', '2024-12-15'
) i
JOIN company_ids c ON c.name = i.company_name; 