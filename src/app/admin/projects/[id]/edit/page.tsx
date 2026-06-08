import { TagService } from "@/services/tag.service";
import { ProjectRepository } from "@/repositories/project.repo";
import { ProjectForm } from "../../../components/ProjectForm";
import { updateProject } from "../../../actions/project.actions";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const projectId = parseInt(id);

  const tagService = new TagService();
  const projectRepo = new ProjectRepository();

  const [availableTags, project] = await Promise.all([
    tagService.getAllTags(),
    projectRepo.findById(projectId),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Edit Project</h1>
      <ProjectForm
        project={project}
        availableTags={availableTags}
        action={updateProject.bind(null, projectId)}
      />
    </div>
  );
}
