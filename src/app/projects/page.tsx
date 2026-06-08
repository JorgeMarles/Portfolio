import ProjectCard from "../components/project";
import { ProjectService } from "@/services/project.service";
import { TagService } from "@/services/tag.service";
import Link from "next/link";

export const metadata = {
    title: "Projects | Jorge Marles",
    description: "Complete catalog of backend projects, APIs, and distributed systems.",
};

interface ProjectsPageProps {
    searchParams: Promise<{
        tag?: string;
    }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
    const { tag } = await searchParams;
    const projectService = new ProjectService();
    const tagService = new TagService();

    const allTags = await tagService.getAllTags();
    const projects = tag
        ? await projectService.getProjectsByTag(tag)
        : await projectService.getAllProjects();

    return (
        <main className="container" style={{ padding: "4rem 2rem" }}>
            <h1 style={{
                marginBottom: "1rem",
                textTransform: "uppercase",
                fontWeight: 800,
                letterSpacing: "-0.02em"
            }}>
                <span style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    display: "block",
                    marginBottom: "0.5rem",
                    letterSpacing: "0.1em"
                }}>
                    [ ALL PROJECTS ]
                </span>
                Project Archive
            </h1>
            <p style={{
                color: "#999",
                marginBottom: "3rem",
                fontSize: "1rem",
                fontWeight: 500,
                maxWidth: "65ch"
            }}>
                Technical solutions ranging from microservices to distributed systems.
            </p>

            <div style={{ marginBottom: "3.5rem" }}>
                <h3 style={{
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                    color: "#777",
                    letterSpacing: "0.1em",
                    fontFamily: "var(--mono)"
                }}>
                    // Filter by technology
                </h3>
                <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                    <Link
                        href="/projects"
                        className="tag"
                        style={{
                            cursor: "pointer",
                            background: !tag ? "var(--accent)" : "transparent",
                            borderColor: !tag ? "var(--accent)" : "var(--card-border)",
                            color: !tag ? "var(--background)" : "var(--foreground)"
                        }}
                    >
                        All
                    </Link>
                    {allTags.map((t) => (
                        <Link
                            key={t.id}
                            href={`/projects?tag=${t.slug}`}
                            className="tag"
                            style={{
                                cursor: "pointer",
                                background: tag === t.slug ? "var(--accent)" : "transparent",
                                borderColor: tag === t.slug ? "var(--accent)" : "var(--card-border)",
                                color: tag === t.slug ? "var(--background)" : "var(--foreground)"
                            }}
                        >
                            {t.name}
                        </Link>
                    ))}
                </div>
            </div>

            {projects.length === 0 ? (
                <div style={{
                    textAlign: "center",
                    padding: "5rem 0",
                    color: "#666",
                    background: "rgba(234,234,234,0.02)",
                    borderRadius: "0",
                    border: "2px solid var(--accent)"
                }}>
                    <p style={{
                        fontSize: "1rem",
                        fontFamily: "var(--mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "1rem"
                    }}>
                        [ NO PROJECTS FOUND ]
                    </p>
                    <Link href="/projects" style={{
                        color: "var(--accent)",
                        textDecoration: "underline",
                        fontFamily: "var(--mono)",
                        fontSize: "0.875rem"
                    }}>
                        {'>>>'} View all projects
                    </Link>
                </div>
            ) : (
                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                        gap: "1.5rem"
                    }}
                >
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            )}
        </main>
    );
}
