"use client";

import { useRouter } from "next/navigation";
import { toggleFeatured, deleteProject } from "../actions/project.actions";
import { DeleteButton } from "../components/DeleteButton";

interface Project {
  id: number;
  title: string;
  featured: boolean;
  status: string;
  tags: Array<{ tag: { id: number; name: string } }>;
}

export function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Projects</h1>
        <button
          onClick={() => router.push("/admin/projects/new")}
          className="btn"
        >
          + New Project
        </button>
      </div>

      <div style={{ display: "grid", gap: "1rem" }}>
        {initialProjects.map((project) => (
          <div
            key={project.id}
            className="card"
            style={{
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                <h3>{project.title}</h3>
                {project.featured && (
                  <span style={{ fontSize: "1.25rem" }}>⭐</span>
                )}
                <span
                  style={{
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {project.status}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {project.tags.slice(0, 5).map((pt) => (
                  <span key={pt.tag.id} className="tag">
                    {pt.tag.name}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className="tag">+{project.tags.length - 5}</span>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                className="admin-btn admin-btn-secondary"
              >
                Edit
              </button>
              <form action={toggleFeatured.bind(null, project.id)}>
                <button
                  type="submit"
                  className="admin-btn admin-btn-secondary"
                >
                  {project.featured ? "Unfeature" : "Feature"}
                </button>
              </form>
              <form action={deleteProject.bind(null, project.id)}>
                <DeleteButton confirmMessage="Are you sure you want to delete this project?">
                  Delete
                </DeleteButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
