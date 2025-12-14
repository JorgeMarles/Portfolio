import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Me | Jorge Marles",
    description: "Professional background, education and technical skills of Jorge Marles.",
};

export default function AboutPage() {
    return (
        <main className="container" style={{ padding: "4rem 1.5rem", maxWidth: "800px" }}>
            <section style={{ marginBottom: "4rem" }}>
                <h1>About Me</h1>
                <p style={{ fontSize: "1.2rem", color: "#a1a1aa", marginBottom: "2rem" }}>
                    Software Engineer passionate about scalability and performance.
                    I specialize in designing robust backend systems capable of handling millions of requests.
                    When I'm not coding in Go or Node.js, I'm learning about new cloud-native architectures.
                </p>

                <a
                    href="/cv.pdf"
                    download
                    className="btn"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Resume (PDF)
                </a>
            </section>

            <section style={{ marginBottom: "4rem" }}>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>Milestones & Education</h2>

                <div className="timeline">
                    {[
                        {
                            year: "2023",
                            title: "Cloud Solutions Architect",
                            org: "Tech Solutions Inc.",
                            desc: "Led migration from monolith to microservices, reducing costs by 40%."
                        },
                        {
                            year: "2021",
                            title: "Senior Backend Developer",
                            org: "StartupX",
                            desc: "Implemented banking core using Go and gRPC."
                        },
                        {
                            year: "2019",
                            title: "Systems Engineering",
                            org: "National University",
                            desc: "Graduated with honors. Thesis on Distributed Systems."
                        }
                    ].map((item, i) => (
                        <div key={i} style={{
                            borderLeft: "2px solid var(--accent-primary)",
                            paddingLeft: "1.5rem",
                            marginBottom: "2rem",
                            position: "relative"
                        }}>
                            <div style={{
                                position: "absolute",
                                left: "-6px",
                                top: "0",
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "var(--accent-primary)"
                            }} />
                            <span style={{ color: "var(--accent-primary)", fontWeight: "bold", fontSize: "0.9rem" }}>
                                {item.year}
                            </span>
                            <h3 style={{ fontSize: "1.2rem", margin: "0.2rem 0" }}>{item.title}</h3>
                            <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{item.org}</p>
                            <p style={{ color: "#a1a1aa" }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>Tech Stack</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                    {["Go (Golang)", "Node.js", "Python", "Docker", "Kubernetes", "AWS", "PostgreSQL", "Redis", "Kafka", "Terrorform"].map(skill => (
                        <span key={skill} style={{
                            background: "rgba(255,255,255,0.05)",
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            border: "1px solid var(--card-border)",
                            color: "#ededed"
                        }}>
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
        </main>
    );
}
