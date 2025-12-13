
import projectsData from "@/data/projects.json";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string | null;
}

export default function Home() {
  const projects: Project[] = projectsData;

  return (
    <div className="min-h-screen">
      <div className="bg-grid" />

      <main className="container">
        {/* Hero Section */}
        <section style={{ padding: "8rem 0 4rem" }}>
          <h1 className="title">
            Hola, soy <span className="text-gradient">Jorge Marles</span>
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#a1a1aa", maxWidth: "600px", marginBottom: "2rem" }}>
            Arquitecto de Software y Desarrollador Backend. Especializado en construir sistemas escalables, microservicios y APIs de alto rendimiento.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#proyectos" className="btn">Ver Proyectos</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub</a>
          </div>
        </section>

        {/* Projects Section */}
        <section id="proyectos" style={{ padding: "4rem 0" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Proyectos Destacados</h2>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {projects.map((project) => (
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
            ))}
          </div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid var(--card-border)", padding: "2rem 0", marginTop: "4rem", textAlign: "center", color: "#666" }}>
        <p>© {new Date().getFullYear()} Jorge Marles. Construido con Next.js</p>
      </footer>
    </div>
  );
}
