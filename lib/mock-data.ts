"use client"

export interface Company {
  id: string;
  name: string;
  logo_url: string;
  description?: string;
  website?: string;
  industry?: string;
  location?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: Company;
  location: string;
  duration: string;
  stipend: string;
  type: string;
  description: string;
  requirements: string;
  mode: string;
  status: string;
  start_date?: string;
  end_date?: string;
}

export const MOCK_COMPANIES: Company[] = [
  {
    id: "1",
    name: "Microsoft",
    logo_url: "https://logo.clearbit.com/microsoft.com",
    description: "Global technology leader in cloud computing and software",
    website: "https://microsoft.com",
    industry: "Technology",
    location: "Bangalore"
  },
  {
    id: "2",
    name: "Google",
    logo_url: "https://logo.clearbit.com/google.com",
    description: "Leading internet technology company",
    website: "https://google.com",
    industry: "Technology",
    location: "Hyderabad"
  },
  {
    id: "3",
    name: "Amazon",
    logo_url: "https://logo.clearbit.com/amazon.com",
    description: "E-commerce and cloud computing giant",
    website: "https://amazon.com",
    industry: "Technology",
    location: "Bangalore"
  },
  {
    id: "4",
    name: "Flipkart",
    logo_url: "https://logo.clearbit.com/flipkart.com",
    description: "India's leading e-commerce platform",
    website: "https://flipkart.com",
    industry: "E-commerce",
    location: "Bangalore"
  },
  {
    id: "5",
    name: "Swiggy",
    logo_url: "https://logo.clearbit.com/swiggy.com",
    description: "Food delivery platform",
    website: "https://swiggy.com",
    industry: "Food Tech",
    location: "Bangalore"
  },
  {
    id: "6",
    name: "Razorpay",
    logo_url: "https://logo.clearbit.com/razorpay.com",
    description: "Payment solutions provider",
    website: "https://razorpay.com",
    industry: "Fintech",
    location: "Bangalore"
  }
];

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: "1",
    title: "Software Development Engineer Intern",
    company: MOCK_COMPANIES[0],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹80,000/month",
    type: "Full-time",
    description: "Join Microsoft's developer team to work on cutting-edge cloud solutions using Azure and .NET technologies. You'll be working with experienced developers on real-world projects.",
    requirements: "C++, Python, Data Structures, Algorithms",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "2",
    title: "Frontend Developer Intern",
    company: MOCK_COMPANIES[1],
    location: "Hyderabad, India",
    duration: "6 months",
    stipend: "₹75,000/month",
    type: "Full-time",
    description: "Work with Google's frontend team on exciting web projects using the latest technologies. You'll gain hands-on experience with modern web development.",
    requirements: "React, TypeScript, JavaScript, HTML, CSS",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "3",
    title: "Data Science Intern",
    company: MOCK_COMPANIES[2],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹70,000/month",
    type: "Full-time",
    description: "Join Amazon's data science team to work on machine learning projects. You'll be analyzing large datasets and building predictive models.",
    requirements: "Python, Machine Learning, SQL, Statistics",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "4",
    title: "Product Management Intern",
    company: MOCK_COMPANIES[3],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹60,000/month",
    type: "Full-time",
    description: "Work with Flipkart's product team on e-commerce initiatives. You'll be involved in product strategy and development.",
    requirements: "Product Strategy, Data Analysis, Market Research",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "5",
    title: "Machine Learning Intern",
    company: MOCK_COMPANIES[4],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹65,000/month",
    type: "Full-time",
    description: "Join Swiggy's ML team to work on recommendation systems and delivery optimization algorithms.",
    requirements: "Python, TensorFlow, Deep Learning, NLP",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "6",
    title: "Backend Developer Intern",
    company: MOCK_COMPANIES[5],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹60,000/month",
    type: "Full-time",
    description: "Work with Razorpay's backend team on payment processing systems and APIs.",
    requirements: "Node.js, Python, MongoDB, REST APIs",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "7",
    title: "Cybersecurity Intern",
    company: MOCK_COMPANIES[0],
    location: "Mumbai, India",
    duration: "4 months",
    stipend: "₹27,000/month",
    type: "Full-time",
    description: "Learn about security protocols and implement security measures for enterprise applications.",
    requirements: "Network Security, Python, Linux, Security Tools",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "8",
    title: "Mobile App Developer Intern",
    company: MOCK_COMPANIES[1],
    location: "Hyderabad, India",
    duration: "6 months",
    stipend: "₹26,000/month",
    type: "Full-time",
    description: "Develop mobile applications for iOS and Android platforms using React Native.",
    requirements: "React Native, JavaScript, Mobile Development",
    mode: "Remote",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "9",
    title: "DevOps Engineer Intern",
    company: MOCK_COMPANIES[3],
    location: "Bangalore, India",
    duration: "5 months",
    stipend: "₹29,000/month",
    type: "Full-time",
    description: "Learn and implement CI/CD pipelines and automation processes.",
    requirements: "Jenkins, Docker, AWS, Git",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "10",
    title: "QA Engineer Intern",
    company: MOCK_COMPANIES[1],
    location: "Mumbai, India",
    duration: "4 months",
    stipend: "₹23,000/month",
    type: "Full-time",
    description: "Learn and implement software testing methodologies and automation.",
    requirements: "Selenium, TestNG, Java, API Testing",
    mode: "Remote"
  },
  {
    id: "11",
    title: "Blockchain Developer Intern",
    company: MOCK_COMPANIES[2],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹35,000/month",
    type: "Full-time",
    description: "Work on blockchain projects and smart contract development.",
    requirements: "Solidity, Web3.js, Ethereum, JavaScript",
    mode: "Remote"
  },
  {
    id: "12",
    title: "Data Analytics Intern",
    company: MOCK_COMPANIES[3],
    location: "Hyderabad, India",
    duration: "4 months",
    stipend: "₹25,000/month",
    type: "Full-time",
    description: "Analyze data and create insights using various analytics tools.",
    requirements: "SQL, Python, Tableau, Excel",
    mode: "Hybrid"
  },
  {
    id: "13",
    title: "AR/VR Developer Intern",
    company: MOCK_COMPANIES[5],
    location: "Pune, India",
    duration: "6 months",
    stipend: "₹30,000/month",
    type: "Full-time",
    description: "Develop augmented and virtual reality experiences using Unity.",
    requirements: "Unity3D, C#, AR/VR Development",
    mode: "On-site"
  },
  {
    id: "14",
    title: "IoT Developer Intern",
    company: MOCK_COMPANIES[0],
    location: "Delhi, India",
    duration: "5 months",
    stipend: "₹27,000/month",
    type: "Full-time",
    description: "Work on Internet of Things projects and embedded systems.",
    requirements: "Arduino, Raspberry Pi, Python, IoT Protocols",
    mode: "On-site",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "15",
    title: "Product Management Intern",
    company: MOCK_COMPANIES[1],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹28,000/month",
    type: "Full-time",
    description: "Learn product development lifecycle and management methodologies.",
    requirements: "Product Management, Analytics, Agile",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "16",
    title: "Game Developer Intern",
    company: MOCK_COMPANIES[5],
    location: "Mumbai, India",
    duration: "4 months",
    stipend: "₹26,000/month",
    type: "Full-time",
    description: "Create engaging game experiences using Unity or Unreal Engine.",
    requirements: "Unity3D, C#, Game Design, 3D Modeling",
    mode: "Remote"
  },
  {
    id: "17",
    title: "Technical Writer Intern",
    company: MOCK_COMPANIES[0],
    location: "Hyderabad, India",
    duration: "3 months",
    stipend: "₹22,000/month",
    type: "Part-time",
    description: "Create technical documentation and user guides for our products.",
    requirements: "Technical Writing, Markdown, Git",
    mode: "Remote"
  },
  {
    id: "18",
    title: "Systems Engineer Intern",
    company: MOCK_COMPANIES[0],
    location: "Pune, India",
    duration: "6 months",
    stipend: "₹29,000/month",
    type: "Full-time",
    description: "Work on system architecture and infrastructure management.",
    requirements: "Linux, Networking, Cloud, Systems Design",
    mode: "On-site"
  },
  {
    id: "19",
    title: "VLSI Design Intern",
    company: MOCK_COMPANIES[2],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹30,000/month",
    type: "Full-time",
    description: "Work on cutting-edge VLSI design projects and gain hands-on experience with industry-standard EDA tools.",
    requirements: "VLSI Design, Verilog, SystemVerilog, Digital Electronics",
    mode: "On-site",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "20",
    title: "Embedded Systems Engineer Intern",
    company: MOCK_COMPANIES[2],
    location: "Pune, India",
    duration: "4 months",
    stipend: "₹25,000/month",
    type: "Full-time",
    description: "Develop firmware for embedded systems and work with microcontrollers and IoT devices.",
    requirements: "C, Embedded C, ARM, Microcontrollers",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "21",
    title: "PCB Design Intern",
    company: MOCK_COMPANIES[3],
    location: "Hyderabad, India",
    duration: "3 months",
    stipend: "₹22,000/month",
    type: "Full-time",
    description: "Design and develop PCB layouts for electronic products using industry-standard tools.",
    requirements: "PCB Design, Altium Designer, Electronics",
    mode: "On-site",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "22",
    title: "RF Engineer Intern",
    company: MOCK_COMPANIES[4],
    location: "Delhi, India",
    duration: "6 months",
    stipend: "₹28,000/month",
    type: "Full-time",
    description: "Work on RF circuit design and testing for wireless communication systems.",
    requirements: "RF Design, Communication Systems, Electronics",
    mode: "On-site",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "23",
    title: "Power Electronics Intern",
    company: MOCK_COMPANIES[5],
    location: "Mumbai, India",
    duration: "4 months",
    stipend: "₹26,000/month",
    type: "Full-time",
    description: "Design and test power electronic circuits and systems for renewable energy applications.",
    requirements: "Power Electronics, Circuit Design, MATLAB",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "24",
    title: "IoT Systems Intern",
    company: MOCK_COMPANIES[0],
    location: "Bangalore, India",
    duration: "5 months",
    stipend: "₹27,000/month",
    type: "Full-time",
    description: "Develop IoT solutions using various sensors and communication protocols.",
    requirements: "IoT, Arduino, Raspberry Pi, Python",
    mode: "Hybrid",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "25",
    title: "Mechanical Design Engineer Intern",
    company: MOCK_COMPANIES[1],
    location: "Pune, India",
    duration: "6 months",
    stipend: "₹28,000/month",
    type: "Full-time",
    description: "Work on mechanical design projects using CAD software and participate in product development.",
    requirements: "AutoCAD, SolidWorks, Mechanical Design",
    mode: "On-site",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  },
  {
    id: "26",
    title: "CAE Analysis Intern",
    company: MOCK_COMPANIES[1],
    location: "Chennai, India",
    duration: "4 months",
    stipend: "₹25,000/month",
    type: "Full-time",
    description: "Perform CAE analysis for mechanical components and systems using simulation software.",
    requirements: "ANSYS, FEA, CAE, Mechanical Engineering",
    mode: "Hybrid"
  },
  {
    id: "27",
    title: "Automotive Design Intern",
    company: MOCK_COMPANIES[0],
    location: "Pune, India",
    duration: "6 months",
    stipend: "₹30,000/month",
    type: "Full-time",
    description: "Work on automotive design projects and learn about vehicle systems and components.",
    requirements: "CATIA, Automotive Design, GD&T",
    mode: "On-site"
  },
  {
    id: "28",
    title: "Manufacturing Process Intern",
    company: MOCK_COMPANIES[1],
    location: "Bangalore, India",
    duration: "3 months",
    stipend: "₹24,000/month",
    type: "Full-time",
    description: "Learn about manufacturing processes and work on process optimization projects.",
    requirements: "Manufacturing Processes, Lean Six Sigma, Quality Control",
    mode: "On-site"
  },
  {
    id: "29",
    title: "Robotics Engineer Intern",
    company: MOCK_COMPANIES[0],
    location: "Hyderabad, India",
    duration: "6 months",
    stipend: "₹32,000/month",
    type: "Full-time",
    description: "Work on robotics projects involving mechanical design and control systems.",
    requirements: "Robotics, ROS, Python, Control Systems",
    mode: "On-site"
  },
  {
    id: "30",
    title: "Thermal Systems Intern",
    company: MOCK_COMPANIES[0],
    location: "Chennai, India",
    duration: "4 months",
    stipend: "₹26,000/month",
    type: "Full-time",
    description: "Analyze and design thermal systems for industrial applications.",
    requirements: "Heat Transfer, Thermodynamics, HVAC Design",
    mode: "Hybrid"
  },
  {
    id: "31",
    title: "CNC Programming Intern",
    company: MOCK_COMPANIES[1],
    location: "Pune, India",
    duration: "3 months",
    stipend: "₹23,000/month",
    type: "Full-time",
    description: "Learn CNC programming and machining operations for manufacturing.",
    requirements: "CNC Programming, CAM, Machining",
    mode: "On-site"
  },
  {
    id: "32",
    title: "Aerospace Systems Intern",
    company: MOCK_COMPANIES[0],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹35,000/month",
    type: "Full-time",
    description: "Work on aerospace systems design and analysis projects.",
    requirements: "Aerospace Engineering, CFD, MATLAB",
    mode: "On-site"
  },
  {
    id: "33",
    title: "Signal Processing Intern",
    company: MOCK_COMPANIES[0],
    location: "Hyderabad, India",
    duration: "4 months",
    stipend: "₹27,000/month",
    type: "Full-time",
    description: "Work on digital signal processing applications and algorithm development.",
    requirements: "DSP, MATLAB, Python, Signal Processing",
    mode: "Hybrid"
  },
  {
    id: "34",
    title: "Control Systems Intern",
    company: MOCK_COMPANIES[0],
    location: "Mumbai, India",
    duration: "5 months",
    stipend: "₹29,000/month",
    type: "Full-time",
    description: "Design and implement control systems for industrial automation.",
    requirements: "Control Systems, PLC, SCADA, Automation",
    mode: "On-site"
  },
  {
    id: "35",
    title: "Communication Systems Intern",
    company: MOCK_COMPANIES[0],
    location: "Delhi, India",
    duration: "6 months",
    stipend: "₹28,000/month",
    type: "Full-time",
    description: "Work on communication systems design and testing projects.",
    requirements: "Communication Systems, RF, Digital Communications",
    mode: "Hybrid"
  },
  {
    id: "36",
    title: "Product Development Intern",
    company: MOCK_COMPANIES[0],
    location: "Chennai, India",
    duration: "4 months",
    stipend: "₹26,000/month",
    type: "Full-time",
    description: "Participate in the complete product development lifecycle of mechanical products.",
    requirements: "Product Design, 3D Modeling, Prototyping",
    mode: "On-site"
  },
  {
    id: "37",
    title: "Industrial Automation Intern",
    company: MOCK_COMPANIES[0],
    location: "Pune, India",
    duration: "5 months",
    stipend: "₹28,000/month",
    type: "Full-time",
    description: "Work on industrial automation projects involving both hardware and software.",
    requirements: "Industrial Automation, PLC Programming, HMI",
    mode: "Hybrid"
  },
  {
    id: "38",
    title: "Quality Engineering Intern",
    company: MOCK_COMPANIES[1],
    location: "Bangalore, India",
    duration: "3 months",
    stipend: "₹24,000/month",
    type: "Full-time",
    description: "Learn and apply quality control techniques in manufacturing processes.",
    requirements: "Quality Control, Six Sigma, Inspection Methods",
    mode: "On-site"
  },
  {
    id: "39",
    title: "Mechatronics Engineer Intern",
    company: MOCK_COMPANIES[0],
    location: "Mumbai, India",
    duration: "6 months",
    stipend: "₹30,000/month",
    type: "Full-time",
    description: "Work on projects combining mechanical, electrical, and control systems.",
    requirements: "Mechatronics, PLC, Sensors, Actuators",
    mode: "On-site"
  },
  {
    id: "40",
    title: "Semiconductor Process Intern",
    company: MOCK_COMPANIES[0],
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹32,000/month",
    type: "Full-time",
    description: "Learn about semiconductor fabrication processes and work in cleanroom environment.",
    requirements: "Semiconductor Physics, Fabrication Processes",
    mode: "On-site"
  },
  {
    id: "41",
    title: "Energy Systems Intern",
    company: MOCK_COMPANIES[0],
    location: "Chennai, India",
    duration: "4 months",
    stipend: "₹27,000/month",
    type: "Full-time",
    description: "Work on renewable energy systems and power distribution projects.",
    requirements: "Power Systems, Renewable Energy, Grid Integration",
    mode: "Hybrid"
  },
  {
    id: "42",
    title: "Tool Design Intern",
    company: MOCK_COMPANIES[0],
    location: "Pune, India",
    duration: "3 months",
    stipend: "₹25,000/month",
    type: "Full-time",
    description: "Design and develop tools and fixtures for manufacturing processes.",
    requirements: "Tool Design, CAD, Manufacturing Processes",
    mode: "On-site"
  },
  {
    id: "43",
    title: "Microwave Engineering Intern",
    company: MOCK_COMPANIES[0],
    location: "Hyderabad, India",
    duration: "5 months",
    stipend: "₹29,000/month",
    type: "Full-time",
    description: "Work on microwave circuit design and testing projects.",
    requirements: "Microwave Engineering, RF Design, Network Analysis",
    mode: "On-site",
    status: "Active",
    start_date: "2024-06-01",
    end_date: "2024-12-31"
  }
];

export function getAllInternships(): Internship[] {
  return MOCK_INTERNSHIPS;
}

export function findInternshipById(id: string): Internship | undefined {
  return MOCK_INTERNSHIPS.find(internship => internship.id === id);
}

export function searchInternships(query: string): Internship[] {
  const lowercaseQuery = query.toLowerCase();
  return MOCK_INTERNSHIPS.filter(internship => 
    internship.title.toLowerCase().includes(lowercaseQuery) ||
    internship.company.name.toLowerCase().includes(lowercaseQuery) ||
    internship.location.toLowerCase().includes(lowercaseQuery) ||
    internship.requirements.toLowerCase().includes(lowercaseQuery)
  );
} 