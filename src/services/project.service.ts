import { ProjectRepository, ProjectWithRelations } from "@/repositories/project.repo";

export class ProjectService {
  private projectRepo: ProjectRepository;

  constructor() {
    this.projectRepo = new ProjectRepository();
  }

  async getAllProjects(): Promise<ProjectWithRelations[]> {
    return this.projectRepo.findAll();
  }

  async getFeaturedProjects(): Promise<ProjectWithRelations[]> {
    return this.projectRepo.findFeatured();
  }

  async getProjectBySlug(slug: string): Promise<ProjectWithRelations | null> {
    return this.projectRepo.findBySlug(slug);
  }

  async getProjectsByTag(tag: string): Promise<ProjectWithRelations[]> {
    return this.projectRepo.findByTag(tag);
  }

  async getAllTags(): Promise<string[]> {
    return this.projectRepo.getAllTags();
  }
}
