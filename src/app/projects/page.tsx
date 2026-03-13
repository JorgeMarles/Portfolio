import ProjectCard from "../components/project";
import { ProjectService } from "@/services/project.service";

export const metadata = {
    title: "Projects | Jorge Marles",
    description: "Complete catalog of backend projects, APIs, and distributed systems.",
};

export default async function ProjectsPage() {
    const projects = await ProjectService.getAllProjects();

    return (
        <main className="container" style={{ padding: "4rem 1.5rem" }}>
            <h1 style={{ marginBottom: "1rem" }}>My Projects</h1>
            <p style={{ color: "#a1a1aa", marginBottom: "3rem", fontSize: "1.2rem" }}>
                A collection of technical solutions, ranging from microservices to distributed systems.
            </p>

            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
                {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </main>
    );
}
