import Image from "next/image";
import FeaturedSlider from "./components/FeaturedSlider";
import { ProjectService } from "@/services/project.service";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projectService = new ProjectService();
  const projects = await projectService.getFeaturedProjects();

  return (
    <div className="min-h-screen">
      <div className="bg-grid" />
      <div className="grain" />

      <main className="container">
        <section className="hero">
          <div className="hero-content">
            <h1>
              Hi, I'm <span className="text-gradient">Jorge Marles</span>
            </h1>
            <p style={{
              fontSize: "1.25rem",
              color: "#999",
              marginBottom: "2.5rem",
              fontWeight: 500,
              lineHeight: 1.7
            }}>
              Full stack developer and software engineer in training. Focused on system architecture and cloud computing. Building efficient, maintainable solutions for complex problems.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <a href="#projects" className="btn">View Projects</a>
              <a
                href="https://github.com/JorgeMarles"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                GitHub
              </a>
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

        <section id="projects" style={{ padding: "3rem 0 4rem" }}>
          <h2 style={{
            marginBottom: "2rem",
            fontWeight: 800,
            textTransform: "uppercase",
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
              [ FEATURED PROJECTS ]
            </span>
            Selected Work
          </h2>

          <FeaturedSlider projects={projects} />
        </section>
      </main>

      <footer style={{
        borderTop: "2px solid var(--accent)",
        padding: "2rem 0",
        marginTop: "3rem"
      }}>
        <div className="container" style={{
          textAlign: "center",
          fontFamily: "var(--mono)",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#666"
        }}>
          <p>© {new Date().getFullYear()} JORGE MARLES // BUILT WITH NEXT.JS</p>
        </div>
      </footer>
    </div>
  );
}
