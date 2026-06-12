import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Me | Jorge Marles",
    description: "Professional background, education and technical skills of Jorge Marles.",
};

const PROFILE = {
    name: "Jorge Andres Marles Florez",
    title: "Systems Engineer (in training) | Backend Developer",
    location: "San Jose de Cucuta, Colombia",
    links: {
        linkedin: "https://linkedin.com/in/jorge-andres-marles-florez",
        github: "https://github.com/JorgeMarles",
    },
    summary:
        "Systems Engineering student with practical experience in backend development, microservices architectures and distributed systems. Proficient in Java, TypeScript, Python and Go, with applied knowledge of cloud infrastructure and async messaging (RabbitMQ). Leader of the Competitive Programming branch at SILUX research group since 2022, and ranked in the Top 8 of the XXXIX National Programming Marathon ACIS REDIS 2025.",
};

const EDUCATION = [
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
];

const EXPERIENCE = [
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
];

const SKILLS: Record<string, string[]> = {
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
};

const ACHIEVEMENTS = [
    "Top 8 — XXXIX National Programming Marathon ACIS REDIS 2025",
    "Bootcamp Intermediate Programming | TalentoTech Oriente, September 2025",
];

const LANGUAGES = [
    { language: "Spanish", level: "Native" },
    { language: "English", level: "Fluent (technical reading/writing)" },
];

function SectionLabel({ children }: { children: string }) {
    return (
        <span
            style={{
                fontFamily: "var(--mono)",
                fontSize: "0.6875rem",
                color: "var(--accent)",
                display: "block",
                marginBottom: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
            }}
        >
            [ {children} ]
        </span>
    );
}

export default function AboutPage() {
    return (
        <main className="container" style={{ padding: "5rem 2rem 6rem", maxWidth: "920px" }}>
            {/* Header */}
            <section style={{ marginBottom: "4rem" }}>
                <h1 style={{ marginBottom: "0.5rem" }}>
                    About <span className="text-gradient">Me</span>
                </h1>
                <p
                    style={{
                        fontSize: "1.125rem",
                        color: "#999",
                        fontWeight: 500,
                        marginBottom: "0.25rem",
                    }}
                >
                    {PROFILE.title}
                </p>
                <p
                    style={{
                        fontFamily: "var(--mono)",
                        fontSize: "0.75rem",
                        color: "#666",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        marginBottom: "2rem",
                    }}
                >
                    {PROFILE.location}
                </p>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                    <a
                        href="/portfolio.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.625rem",
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download CV
                    </a>
                    <a
                        href={PROFILE.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                    >
                        LinkedIn
                    </a>
                    <a
                        href={PROFILE.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                    >
                        GitHub
                    </a>
                </div>
            </section>

            {/* Profile */}
            <section style={{ marginBottom: "4rem" }}>
                <SectionLabel>Profile</SectionLabel>
                <h2 style={{ marginBottom: "1.25rem" }}>Who I Am</h2>
                <p style={{ color: "#bbb", lineHeight: 1.8 }}>{PROFILE.summary}</p>
            </section>

            {/* Education */}
            <section style={{ marginBottom: "4rem" }}>
                <SectionLabel>Education</SectionLabel>
                <h2 style={{ marginBottom: "2rem" }}>Academic Background</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {EDUCATION.map((edu, i) => (
                        <div
                            key={i}
                            style={{
                                borderLeft: "2px solid var(--accent)",
                                paddingLeft: "2rem",
                                paddingBottom: i < EDUCATION.length - 1 ? "2.5rem" : "0",
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    left: "-7px",
                                    top: "4px",
                                    width: "12px",
                                    height: "12px",
                                    background: "var(--accent)",
                                    border: "2px solid var(--background)",
                                }}
                            />
                            <h3
                                style={{
                                    fontSize: "1.125rem",
                                    fontWeight: 700,
                                    marginBottom: "0.25rem",
                                }}
                            >
                                {edu.degree}
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--mono)",
                                    fontSize: "0.75rem",
                                    color: "#999",
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                    marginBottom: "0.375rem",
                                }}
                            >
                                {edu.institution}
                            </p>
                            <p
                                style={{
                                    fontSize: "0.875rem",
                                    color: "#777",
                                }}
                            >
                                {edu.status}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section style={{ marginBottom: "4rem" }}>
                <SectionLabel>Experience</SectionLabel>
                <h2 style={{ marginBottom: "2rem" }}>Leadership & Work</h2>

                {EXPERIENCE.map((exp, i) => (
                    <div
                        key={i}
                        className="card"
                        style={{
                            marginBottom: "1.5rem",
                            padding: "2rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>{exp.role}</h3>
                            <span
                                style={{
                                    fontFamily: "var(--mono)",
                                    fontSize: "0.6875rem",
                                    color: "var(--accent)",
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {exp.period}
                            </span>
                        </div>
                        <p
                            style={{
                                fontFamily: "var(--mono)",
                                fontSize: "0.75rem",
                                color: "#888",
                                letterSpacing: "0.04em",
                                textTransform: "uppercase",
                                marginBottom: "1.25rem",
                            }}
                        >
                            {exp.org}
                        </p>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                            }}
                        >
                            {exp.highlights.map((hl, j) => (
                                <li
                                    key={j}
                                    style={{
                                        paddingLeft: "1.25rem",
                                        position: "relative",
                                        color: "#bbb",
                                        fontSize: "0.9375rem",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    <span
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            top: "0.5em",
                                            width: "6px",
                                            height: "1px",
                                            background: "var(--accent)",
                                            display: "inline-block",
                                        }}
                                    />
                                    {hl}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            {/* Skills */}
            <section style={{ marginBottom: "4rem" }}>
                <SectionLabel>Tech Stack</SectionLabel>
                <h2 style={{ marginBottom: "2rem" }}>Skills & Tools</h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {Object.entries(SKILLS).map(([category, items]) => (
                        <div
                            key={category}
                            style={{
                                borderLeft: "2px solid var(--card-border)",
                                paddingLeft: "1.5rem",
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: "var(--mono)",
                                    fontSize: "0.6875rem",
                                    color: "#888",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    marginBottom: "0.875rem",
                                    fontWeight: 600,
                                }}
                            >
                                {category}
                            </h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                                {items.map((skill) => (
                                    <span key={skill} className="tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Achievements */}
            <section style={{ marginBottom: "4rem" }}>
                <SectionLabel>Achievements</SectionLabel>
                <h2 style={{ marginBottom: "1.5rem" }}>Recognition</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {ACHIEVEMENTS.map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                padding: "1rem 1.5rem",
                                border: "1px solid var(--card-border)",
                                background: "var(--card-bg)",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "var(--mono)",
                                    fontSize: "0.75rem",
                                    color: "var(--accent)",
                                    fontWeight: 700,
                                    flexShrink: 0,
                                }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <p style={{ color: "#ccc", fontSize: "0.9375rem", margin: 0 }}>{item}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Languages */}
            <section>
                <SectionLabel>Languages</SectionLabel>
                <h2 style={{ marginBottom: "1.5rem" }}>Communication</h2>

                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    {LANGUAGES.map((lang) => (
                        <div
                            key={lang.language}
                            style={{
                                padding: "1.25rem 1.75rem",
                                border: "1px solid var(--card-border)",
                                background: "var(--card-bg)",
                                minWidth: "180px",
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    marginBottom: "0.25rem",
                                }}
                            >
                                {lang.language}
                            </p>
                            <p
                                style={{
                                    fontFamily: "var(--mono)",
                                    fontSize: "0.6875rem",
                                    color: "#888",
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                    margin: 0,
                                }}
                            >
                                {lang.level}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
