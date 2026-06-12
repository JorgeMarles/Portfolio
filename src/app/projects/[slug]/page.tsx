import { ProjectService } from "@/services/project.service";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectService = new ProjectService();
  const project = await projectService.getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description.substring(0, 160),
  };
}

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const projectService = new ProjectService();
  const project = await projectService.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const statusLabels = {
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    ARCHIVED: "Archived",
  };

  return (
    <div className="container" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
      {project.imageUrl && (
        <div style={{ position: "relative", width: "100%", height: "400px", marginBottom: "2rem", borderRadius: "0", overflow: "hidden", border: "1px solid var(--card-border)" }}>
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <h1 style={{ margin: 0, textTransform: "uppercase" }}>{project.title}</h1>
        <span style={{
          padding: "0.25rem 0.75rem",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--mono)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          border: "1px solid var(--card-border)",
          color: "#999"
        }}>
          {statusLabels[project.status]}
        </span>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {project.tags.map((tag) => (
          <Link
            key={tag}
            href={`/projects?tag=${encodeURIComponent(tag)}`}
            className="tag"
            style={{ cursor: "pointer" }}
          >
            {tag}
          </Link>
        ))}
      </div>

      <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "#ccc", marginBottom: "3rem", maxWidth: "75ch" }}>
        {project.description}
      </p>

      {project.resources.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", textTransform: "uppercase" }}>Resources</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            {project.resources
              .sort((a, b) => a.order - b.order)
              .map((resource) => (
                <div key={resource.id} className="card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p style={{ color: "#999", marginBottom: "0.75rem" }}>
                      {resource.description}
                    </p>
                  )}
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--accent)",
                        textDecoration: "underline",
                        fontSize: "0.875rem",
                        fontFamily: "var(--mono)",
                      }}
                    >
                      {resource.type === "REPOSITORY" && "View Repository →"}
                      {resource.type === "LINK" && "Visit Link →"}
                      {resource.type === "VIDEO" && "Watch Video →"}
                      {resource.type === "DOCUMENT" && "View Document →"}
                    </a>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn">
            View on GitHub
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Live Demo
          </a>
        )}
        <Link href="/projects" className="btn btn-outline">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}
