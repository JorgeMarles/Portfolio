import { ProjectService } from "@/services/project.service";
import { toggleFeatured, deleteProject } from "../actions/project.actions";
import { DeleteButton } from "../components/DeleteButton";
import { ProjectsClient } from "./ProjectsClient";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminProjectsPage() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/admin/login");
  const projectService = new ProjectService();
  const projects = await projectService.getAllProjects();

  return <ProjectsClient initialProjects={projects} />;
}
