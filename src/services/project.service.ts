import { ProjectRepository, ProjectWithRelations } from "@/repositories/project.repo";

const projectRepo = new ProjectRepository();

export const ProjectService = {
  /**
   * Obtener proyectos para la lista general
   */
  async getAllProjects(): Promise<ProjectWithRelations[]> {
    return projectRepo.findAll();
  },

  /**
   * Obtener proyectos destacados para la home
   */
  async getFeaturedProjects(): Promise<ProjectWithRelations[]> {
    return projectRepo.findFeatured();
  },

  /**
   * Obtener el detalle de un proyecto por su slug
   * Aquí se podría agregar lógica de transformación si fuera necesario
   */
  async getProjectBySlug(slug: string): Promise<ProjectWithRelations | null> {
    return projectRepo.findBySlug(slug);
  },

  /**
   * Filtrar proyectos por tag
   */
  async getProjectsByTag(tagSlug: string) {
    // Lógica adicional de filtrado si fuera necesaria
  }
};
