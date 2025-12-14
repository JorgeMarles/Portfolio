import Image from "next/image";
import projectsData from "@/data/projects.json";
import ProjectCard from "./components/project";
import Project from "./components/project";

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
        <section className="hero">
          <div className="hero-content">
            <h1 className="title">
              Hi, I'm <span className="text-gradient">Jorge Marles</span>
            </h1>
            <p style={{ fontSize: "1.25rem", color: "#a1a1aa", maxWidth: "600px", marginBottom: "2rem" }}>
              Full Stack Developer | Backend Focused | In-Formation Systems Engineer. Passionate about System Architecture and Cloud Computing. Turning complex problems into efficient, maintainable code.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="#projects" className="btn">See Projects</a>
              <a href="https://github.com/JorgeMarles" target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub</a>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="hero-img">
              <Image
                src="/profile.jpg"
                alt="Jorge Marles"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" style={{ padding: "4rem 0" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Featured Projects</h2>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid var(--card-border)", padding: "2rem 0", marginTop: "4rem", textAlign: "center", color: "#666" }}>
        <p>© {new Date().getFullYear()} Jorge Marles. Built with Next.js</p>
      </footer>
    </div>
  );
}
