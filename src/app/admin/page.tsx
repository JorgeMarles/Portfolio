import { ProjectService } from "@/services/project.service";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  const projectService = new ProjectService();
  const [allProjects, featuredProjects, allTags] = await Promise.all([
    projectService.getAllProjects(),
    projectService.getFeaturedProjects(),
    projectService.getAllTags(),
  ]);

  const stats = [
    { label: "Total Projects", value: allProjects.length },
    { label: "Featured Projects", value: featuredProjects.length },
    { label: "Total Tags", value: allTags.length },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "0.5rem" }}>Dashboard</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "2rem" }}>
        Welcome to your portfolio admin panel
      </p>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card"
            style={{ padding: "1.5rem", textAlign: "center" }}
          >
            <div style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--accent)",
              marginBottom: "0.5rem",
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Recent Projects</h2>
        <div style={{ display: "grid", gap: "1rem" }}>
          {allProjects.slice(0, 5).map((project) => (
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
              <div>
                <h3 style={{ marginBottom: "0.25rem" }}>{project.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>{project.status}</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
