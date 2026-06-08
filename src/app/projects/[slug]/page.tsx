import { ProjectService } from "@/services/project.service";
import { MarkdownRenderer } from "@/app/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projectService = new ProjectService();
  const project = await projectService.getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description.substring(0, 160),
  };
}

export async function generateStaticParams() {
  const projectService = new ProjectService();
  const projects = await projectService.getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const projectService = new ProjectService();
  const project = await projectService.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const statusColors = {
    IN_PROGRESS: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    COMPLETED: "bg-green-500/20 text-green-400 border-green-500/30",
    ARCHIVED: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  const statusLabels = {
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    ARCHIVED: "Archived",
  };

  return (
    <div className="container" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
      {project.imageUrl && (
        <div style={{ position: "relative", width: "100%", height: "400px", marginBottom: "2rem", borderRadius: "12px", overflow: "hidden" }}>
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
        <h1 style={{ margin: 0 }}>{project.title}</h1>
        <span
          className={`${statusColors[project.status]}`}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: 500,
            border: "1px solid",
          }}
        >
          {statusLabels[project.status]}
        </span>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {project.tags.map((projectTag) => (
          <Link
            key={projectTag.tag.id}
            href={`/projects?tag=${projectTag.tag.slug}`}
            className="tag"
            style={{ cursor: "pointer", transition: "opacity 0.2s" }}
          >
            {projectTag.tag.name}
          </Link>
        ))}
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <MarkdownRenderer content={project.description} />
      </div>

      {project.resources.length > 0 && (
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Resources</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            {project.resources
              .sort((a, b) => a.order - b.order)
              .map((resource) => (
                <div
                  key={resource.id}
                  className="card"
                  style={{ padding: "1.5rem" }}
                >
                  <div style={{ display: "flex", alignItems: "start", gap: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>
                        {resource.title}
                      </h3>
                      {resource.description && (
                        <p style={{ color: "#a1a1aa", marginBottom: "0.75rem" }}>
                          {resource.description}
                        </p>
                      )}
                      {resource.type === "DOCUMENT" && resource.content && (
                        <div style={{ marginTop: "1rem" }}>
                          <MarkdownRenderer content={resource.content} />
                        </div>
                      )}
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--accent-primary)",
                            textDecoration: "underline",
                            fontSize: "0.875rem",
                          }}
                        >
                          {resource.type === "REPOSITORY" && "View Repository →"}
                          {resource.type === "LINK" && "Visit Link →"}
                          {resource.type === "VIDEO" && "Watch Video →"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View on GitHub
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
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
