import { ProjectService } from "@/services/project.service";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getLocale, getDictionary } from "@/i18n";

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
  const locale = await getLocale();
  const t = getDictionary(locale);

  if (!project) {
    notFound();
  }

  const statusLabels = {
    IN_PROGRESS: t.projectDetail.statusInProgress,
    COMPLETED: t.projectDetail.statusCompleted,
    ARCHIVED: t.projectDetail.statusArchived,
  };

  const resourceLabels = {
    REPOSITORY: t.projectDetail.viewRepo,
    LINK: t.projectDetail.visitLink,
    VIDEO: t.projectDetail.watchVideo,
    DOCUMENT: t.projectDetail.viewDocument,
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
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", textTransform: "uppercase" }}>{t.projectDetail.resources}</h2>
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
                      {resourceLabels[resource.type as keyof typeof resourceLabels]}
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
            {t.projectDetail.viewOnGithub}
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            {t.projectDetail.liveDemo}
          </a>
        )}
        <Link href="/projects" className="btn btn-outline">
          {t.projectDetail.backToProjects}
        </Link>
      </div>
    </div>
  );
}
