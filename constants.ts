

import { ProfileData } from './types';

// ==========================================
// KNOWLEDGE BASE
// ==========================================

export const PROFILE_DATA: ProfileData = {
  name: "Pavan Kalyan Vottikundalu",
  title: "Software Engineer & VLSI Enthusiast",
  // PLEASE ENSURE YOU SAVE YOUR PHOTO AS 'profile.jpg' IN THE PROJECT ROOT
  profileImage: "./profile.jpg", 
  shortBio: "Bridging the gap between Artificial Intelligence and Semiconductor Engineering.",
  longBio: "MS Electrical Engineering student interested in semiconductor devices and fabrication. With a B.Tech in ECE and experience as a web developer, I bring strong technical and problem-solving skills. Looking for opportunities to learn more about device physics, CMOS/FinFET technologies, and VLSI process integration.",
  email: "pavannaidu9031@gmail.com",
  phone: "+886 0975 487 289",
  location: "Tainan, Taiwan",
  skills: [
    "Python", "C", "AI/ML (Basics)",
    "Microcontrollers (Arduino, ESP32)",
    "HTML/CSS/JavaScript", "WordPress", "PHP",
    "Power BI", "Excel", "Power Point", "Visual Code Studio"
  ],
  education: [
    {
      degree: "Ms in Electrical Engineering",
      institution: "Southern Taiwan University of Science and Technology",
      period: "2025 - 2027",
      details: [
        "Focus: Semiconductor Devices & Fabrication"
      ]
    },
    {
      degree: "B.Tech in Electronics Communication Engineering",
      institution: "Sri Venkatesa Perumal College of Engineering and Technology",
      period: "2019 - 2023",
      details: [
        "GPA: First Class Degree",
        "Coursework: VLSI design, Digital Electronics, Analog Circuits, Semiconductor Devices"
      ]
    }
  ],
  experience: [
    {
      role: "Junior Software Engineer",
      company: "Trinite Digital – Pondicherry, INDIA",
      period: "April 2024 - July 2025",
      description: [
        "Created Visually engaging and user friendly interfaces using Html, Css, JavaScript and wordpress.",
        "Troubleshooted issues to ensure optimal site performance for both Mobile and Desktop Platforms."
      ]
    },
    {
      role: "Data Scientist Intern",
      company: "Young Minds Technology Solutions Pvt LTD, Pondicherry, India",
      period: "Dec 2023 - Mar 2024",
      description: [
        "Analyzed large datasets to identify trends and provide actionable insights for business strategies.",
        "Collaborated with cross-functional teams to present findings and enhanced decision-making processes."
      ]
    }
  ],
  publications: [
    {
      title: "Phishing Website detection Application using URL features and machine learning",
      authors: "Somalaraju Manoj, Vottikundalu Pavan Kalyan, Dr. A. Gokula Chandar",
      journal: "2024 IJCRT | Volume 12, Issue 1 | ISSN: 2320-2882",
      date: "Jan 2024"
    },
    {
      title: "The Design of Digital System with CSA",
      authors: "L.Prabhavathi, Vottikundalu Pavan Kalyan",
      journal: "2022 IJARSCT | Volume 2, Issue 2 | ISSN (Online) 2581-9429",
      date: "Dec 2022"
    }
  ],
  projects: [
    {
      id: "1",
      title: "Business Website on WordPress (US Project)",
      description: "Designed and developed a business website using WordPress. Customized a theme to match brand identity, configured essential plugins, and optimized performance. Integrated a contact form, service pages, and SEO-friendly elements for better search visibility.",
      tags: ["WordPress", "HTML", "CSS", "PHP"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      link: "#"
    },
    {
      id: "2",
      title: "CSR Initiative Website",
      description: "Designed and developed a clean and impactful CSR (Corporate Social Responsibility) website to showcase initiatives, sustainability efforts, and community engagement. Implemented a user-friendly layout with dedicated sections for projects, success stories, and impact reports. Ensured a fully responsive design with smooth navigation, hover effects, and media queries for accessibility across all devices.",
      tags: ["HTML", "CSS"],
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
      link: "https://rejuvenatinglife.org/"
    },
    {
      id: "3",
      title: "Basic PHP Contact Form",
      description: "Created a simple yet functional contact form using PHP and HTML. Implemented form validation, error handling, and email functionality using PHP's mail() function. Added basic CSS styling for a user-friendly interface and ensured security.",
      tags: ["PHP", "HTML", "CSS"],
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      link: "https://thehaveli.in/"
    }
  ],
  socials: [
    { platform: "GitHub", url: "https://github.com/Pavannaidu9031", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/pavankalyan9031", icon: "Linkedin" },
    { platform: "Email", url: "mailto:pavannaidu9031@gmail.com", icon: "Mail" },
    { platform: "Instagram", url: "https://www.instagram.com/pavan_kalyan.naidu/", icon: "Instagram" }
  ]
};

export const SYSTEM_PROMPT = `
You are an AI assistant living in the portfolio website of ${PROFILE_DATA.name}.
Your goal is to answer questions about Pavan's professional background, education, and skills.
Use the following data as your source of truth:

Name: ${PROFILE_DATA.name}
Role: ${PROFILE_DATA.title}
Location: ${PROFILE_DATA.location}
Bio: ${PROFILE_DATA.longBio}
Education: ${PROFILE_DATA.education.map(e => `${e.degree} at ${e.institution}`).join('; ')}
Experience: ${PROFILE_DATA.experience.map(e => `${e.role} at ${e.company} (${e.period})`).join('; ')}
Skills: ${PROFILE_DATA.skills.join(', ')}
Publications: ${PROFILE_DATA.publications.map(p => p.title).join('; ')}
Projects: ${PROFILE_DATA.projects.map(p => p.title).join('; ')}
Contact: ${PROFILE_DATA.email}, ${PROFILE_DATA.phone}

Tone: Professional, knowledgeable, and humble.
Keep answers concise (under 100 words) unless asked for more detail.
`;