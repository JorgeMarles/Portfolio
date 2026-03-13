import { prisma } from "@/lib/prisma";
import { Project, ProjectTag, Tag, Resource } from "@/generated/prisma";

export type ProjectWithRelations = Project & {
  tags: (ProjectTag & { tag: Tag })[];
  resources: Resource[];
};

export class ProjectRepository {
  /**
   * Obtener todos los proyectos con sus tags y recursos
   */
  async findAll(): Promise<ProjectWithRelations[]> {
    return prisma.project.findMany({
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        resources: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Obtener proyectos destacados
   */
  async findFeatured(): Promise<ProjectWithRelations[]> {
    return prisma.project.findMany({
      where: {
        featured: true,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        resources: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Buscar un proyecto por su slug
   */
  async findBySlug(slug: string): Promise<ProjectWithRelations | null> {
    return prisma.project.findUnique({
      where: { slug },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        resources: true,
      },
    });
  }

  /**
   * Crear o actualizar un proyecto (ejemplo simple)
   */
  async upsert(data: any) {
    // Implementar lógica de creación/actualización aquí
    // Esto lo usaremos más adelante para las Server Actions
  }
}
