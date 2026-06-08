import { TagService } from "@/services/tag.service";
import { ProjectForm } from "../../components/ProjectForm";
import { createProject } from "../../actions/project.actions";

export default async function NewProjectPage() {
  const tagService = new TagService();
  const availableTags = await tagService.getAllTags();

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Create New Project</h1>
      <ProjectForm availableTags={availableTags} action={createProject} />
    </div>
  );
}
