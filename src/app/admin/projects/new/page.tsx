import { ProjectForm } from "../../components/ProjectForm";
import { createProject } from "../../actions/project.actions";

export default async function NewProjectPage() {
  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Create New Project</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
