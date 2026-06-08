import { ProjectWithRelations } from "@/repositories/project.repo";
import Link from "next/link";
import Image from "next/image";

export default function Project(project: ProjectWithRelations) {
    const tags = project.tags.map(t => t.tag.name);
    const cleanDescription = project.description
        .replace(/[#*`\[\]]/g, "")
        .substring(0, 140)
        .trim() + "...";

    return (
        <Link
            href={`/projects/${project.slug}`}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
            <article className="card" style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                minHeight: "420px"
            }}>
                {project.imageUrl && (
                    <div style={{
                        position: "relative",
                        width: "100%",
                        height: "180px",
                        marginBottom: "1.25rem",
                        borderRadius: "0",
                        overflow: "hidden",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid var(--card-border)"
                    }}>
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                )}

                <h3 style={{
                    fontSize: "1.125rem",
                    marginBottom: "0.875rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    textTransform: "uppercase"
                }}>
                    {project.title}
                </h3>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "1rem"
                }}>
                    {tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>

                <p style={{
                    color: "#999",
                    marginBottom: "1.5rem",
                    flexGrow: 1,
                    fontSize: "0.9375rem",
                    lineHeight: 1.6
                }}>
                    {cleanDescription}
                </p>

                <div style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginTop: "auto",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(234, 234, 234, 0.1)",
                    alignItems: "center"
                }}>
                    {project.githubUrl && (
                        <span style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            fontFamily: "var(--mono)",
                            color: "var(--foreground)",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase"
                        }}>
                            {'>>>'} Code
                        </span>
                    )}
                    {project.demoUrl && (
                        <span style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            fontFamily: "var(--mono)",
                            color: "var(--accent)",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase"
                        }}>
                            {'>>>'} Live Demo
                        </span>
                    )}
                </div>
            </article>
        </Link>
    );
}
