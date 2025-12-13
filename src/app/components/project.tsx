
type ProjectProps = {
    title: string;
    description: string;
    tags: string[];
    githubUrl: string;
    demoUrl: string | null;
    id: number;
}

export default function Project(project: ProjectProps) {
    return (
        <article key={project.id} className="card">
            <div style={{ marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{project.title}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                    {project.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>

            <p style={{ color: "#a1a1aa", marginBottom: "1.5rem", flexGrow: 1 }}>
                {project.description}
            </p>

            <div style={{ display: "flex", gap: "1rem", marginTop: "auto" }}>
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--foreground)" }}
                >
                    Código →
                </a>
                {project.demoUrl && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent-primary)" }}
                    >
                        Demo en vivo →
                    </a>
                )}
            </div>
        </article>
    );
}