import ProjectCard from "../components/project";
import projectsData from "@/data/projects.json";

export const metadata = {
    title: "Projects | Jorge Marles",
    description: "Complete catalog of backend projects, APIs, and distributed systems.",
};

export default function ProjectsPage() {
    return (
        <main className="container" style={{ padding: "4rem 1.5rem" }}>
            <h1 style={{ marginBottom: "1rem" }}>My Projects</h1>
            <p style={{ color: "#a1a1aa", marginBottom: "3rem", fontSize: "1.2rem" }}>
                A collection of technical solutions, ranging from microservices to distributed systems.
            </p>

            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </main>
    );
}
