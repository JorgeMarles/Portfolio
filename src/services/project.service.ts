import { ProjectRepository, ProjectWithRelations } from "@/repositories/project.repo";

export class ProjectService {
  private projectRepo: ProjectRepository;

  constructor() {
    this.projectRepo = new ProjectRepository();
  }

  /**
   * Obtener proyectos para la lista general
   */
  async getAllProjects(): Promise<ProjectWithRelations[]> {
    return this.projectRepo.findAll();
  }

  /**
   * Obtener proyectos destacados para la home
   */
  async getFeaturedProjects(): Promise<ProjectWithRelations[]> {
    return this.projectRepo.findFeatured();
  }

  /**
   * Obtener el detalle de un proyecto por su slug
   * Aquí se podría agregar lógica de transformación si fuera necesario
   */
  async getProjectBySlug(slug: string): Promise<ProjectWithRelations | null> {
    return this.projectRepo.findBySlug(slug);
  }

  /**
   * Filtrar proyectos por tag
   */
  async getProjectsByTag(tagSlug: string): Promise<ProjectWithRelations[]> {
    return this.projectRepo.findByTagSlug(tagSlug);
  }
}
