export type Dictionary = {
  nav: {
    home: string;
    projects: string;
    about: string;
  };
  home: {
    greeting: string;
    description: string;
    viewProjects: string;
    featuredLabel: string;
    selectedWork: string;
    footer: string;
  };
  projects: {
    label: string;
    title: string;
    subtitle: string;
    filterBy: string;
    all: string;
    noResults: string;
    viewAll: string;
  };
  projectDetail: {
    resources: string;
    viewRepo: string;
    visitLink: string;
    watchVideo: string;
    viewDocument: string;
    viewOnGithub: string;
    liveDemo: string;
    backToProjects: string;
    statusInProgress: string;
    statusCompleted: string;
    statusArchived: string;
    notFound: string;
  };
  slider: {
    project: string;
    liveDemo: string;
    viewCode: string;
    readMore: string;
    prevProject: string;
    nextProject: string;
    goToSlide: string;
    ariaLabel: string;
  };
  about: {
    title: string;
    me: string;
    downloadCv: string;
    profileLabel: string;
    whoIAm: string;
    educationLabel: string;
    academicBg: string;
    experienceLabel: string;
    leadershipWork: string;
    techStackLabel: string;
    skillsTools: string;
    achievementsLabel: string;
    recognition: string;
    languagesLabel: string;
    communication: string;
    fullName: string;
    profileTitle: string;
    profileLocation: string;
    profileSummary: string;
    education: { institution: string; degree: string; status: string }[];
    experience: {
      role: string;
      period: string;
      org: string;
      highlights: string[];
    }[];
    skills: Record<string, string[]>;
    achievements: string[];
    languages: { language: string; level: string }[];
  };
};

export const en: Dictionary = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
  },
  home: {
    greeting: "Hi, I'm",
    description:
      "Full stack developer and software engineer in training. Focused on system architecture and cloud computing. Building efficient, maintainable solutions for complex problems.",
    viewProjects: "View Projects",
    featuredLabel: "[ FEATURED PROJECTS ]",
    selectedWork: "Selected Work",
    footer: "JORGE MARLES // BUILT WITH NEXT.JS",
  },
  projects: {
    label: "[ ALL PROJECTS ]",
    title: "Project Archive",
    subtitle:
      "Technical solutions ranging from microservices to distributed systems.",
    filterBy: "// Filter by technology",
    all: "All",
    noResults: "[ NO PROJECTS FOUND ]",
    viewAll: ">>> View all projects",
  },
  projectDetail: {
    resources: "Resources",
    viewRepo: "View Repository →",
    visitLink: "Visit Link →",
    watchVideo: "Watch Video →",
    viewDocument: "View Document →",
    viewOnGithub: "View on GitHub",
    liveDemo: "Live Demo",
    backToProjects: "← Back to Projects",
    statusInProgress: "In Progress",
    statusCompleted: "Completed",
    statusArchived: "Archived",
    notFound: "Project Not Found",
  },
  slider: {
    project: "PROJECT",
    liveDemo: "Live Demo",
    viewCode: "View Code",
    readMore: ">>> Read More",
    prevProject: "Previous project",
    nextProject: "Next project",
    goToSlide: "Go to slide",
    ariaLabel: "Featured projects carousel",
  },
  about: {
    title: "About",
    me: "Me",
    downloadCv: "Download CV",
    profileLabel: "Profile",
    whoIAm: "Who I Am",
    educationLabel: "Education",
    academicBg: "Academic Background",
    experienceLabel: "Experience",
    leadershipWork: "Leadership & Work",
    techStackLabel: "Tech Stack",
    skillsTools: "Skills & Tools",
    achievementsLabel: "Achievements",
    recognition: "Recognition",
    languagesLabel: "Languages",
    communication: "Communication",
    fullName: "Jorge Andrés Marles Flórez",
    profileTitle: "Systems Engineer (in training) | Backend Developer",
    profileLocation: "San Jose de Cucuta, Colombia",
    profileSummary:
      "Systems Engineering student with practical experience in backend development, microservices architectures and distributed systems. Proficient in Java, TypeScript, Python and Go, with applied knowledge of cloud infrastructure and async messaging (RabbitMQ). Leader of the Competitive Programming branch at SILUX research group since 2022, and ranked in the Top 8 of the XXXIX National Programming Marathon ACIS REDIS 2025.",
    education: [
      {
        institution: "Universidad Francisco de Paula Santander",
        degree: "Systems Engineering",
        status: "Ongoing — expected graduation: first semester 2027",
      },
      {
        institution: "Servicio Nacional de Aprendizaje (SENA)",
        degree: "Software Programming Technician",
        status: "Completed November 2021",
      },
    ],
    experience: [
      {
        role: "Leader — Competitive Programming Branch",
        period: "January 2022 — Present",
        org: "SILUX Research Group, UFPS",
        highlights: [
          "Organize and lead weekly training sessions on algorithms and data structures",
          "Provide individual mentoring to students preparing for national programming competitions",
          "Part of the team that ranked Top 8 at XXXIX National Marathon ACIS REDIS 2025",
        ],
      },
    ],
    skills: {
      Languages: ["Java", "Python", "C++", "TypeScript", "Golang", "JavaScript"],
      "Infrastructure & DevOps": ["Git", "Docker", "Linux", "RabbitMQ"],
      Databases: ["PostgreSQL", "MySQL", "MongoDB"],
      Concepts: [
        "Microservices",
        "Hexagonal Architecture",
        "REST API Design",
        "Cloud Infrastructure",
        "Problem Solving",
      ],
    },
    achievements: [
      "Top 8 — XXXIX National Programming Marathon ACIS REDIS 2025",
      "Bootcamp Intermediate Programming | TalentoTech Oriente, September 2025",
    ],
    languages: [
      { language: "Spanish", level: "Native" },
      { language: "English", level: "Fluent (technical reading/writing)" },
    ],
  },
};
