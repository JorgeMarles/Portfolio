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
   * Find projects by tag slug
   */
  async findByTagSlug(slug: string): Promise<ProjectWithRelations[]> {
    return prisma.project.findMany({
      where: {
        tags: {
          some: {
            tag: {
              slug,
            },
          },
        },
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
   * Create a new project with tags and resources
   */
  async create(
    data: {
      title: string;
      slug: string;
      name: string;
      description: string;
      status: string;
      featured: boolean;
      githubUrl?: string;
      demoUrl?: string;
      imageUrl?: string;
    },
    tagIds: number[],
    resources: Array<{
      type: string;
      title: string;
      description?: string;
      url?: string;
      content?: string;
      order: number;
    }>
  ): Promise<ProjectWithRelations> {
    // @ts-ignore
    return prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        name: data.name,
        description: data.description,
        status: data.status as any,
        featured: data.featured,
        githubUrl: data.githubUrl,
        demoUrl: data.demoUrl,
        imageUrl: data.imageUrl,
        tags: {
          create: tagIds.map((tagId) => ({ tagId })),
        },
        resources: {
          create: resources.map(r => ({
            type: r.type as any,
            title: r.title,
            description: r.description,
            url: r.url,
            content: r.content,
            order: r.order,
          })),
        },
      },
      include: {
        tags: { include: { tag: true } },
        resources: true,
      },
    });
  }

  /**
   * Update a project with tags and resources
   */
  async update(
    id: number,
    data: {
      title: string;
      slug: string;
      name: string;
      description: string;
      status: string;
      featured: boolean;
      githubUrl?: string;
      demoUrl?: string;
      imageUrl?: string;
    },
    tagIds: number[],
    resources: Array<{
      type: string;
      title: string;
      description?: string;
      url?: string;
      content?: string;
      order: number;
    }>
  ): Promise<ProjectWithRelations> {
    return prisma.$transaction(async (tx) => {
      // Delete existing tags and resources
      await tx.projectTag.deleteMany({
        where: { projectId: id },
      });
      await tx.resource.deleteMany({
        where: { projectId: id },
      });

      // Update project with new tags and resources
      // @ts-ignore
      return tx.project.update({
        where: { id },
        data: {
          title: data.title,
          slug: data.slug,
          name: data.name,
          description: data.description,
          status: data.status as any,
          featured: data.featured,
          githubUrl: data.githubUrl,
          demoUrl: data.demoUrl,
          imageUrl: data.imageUrl,
          tags: {
            create: tagIds.map((tagId) => ({ tagId })),
          },
          resources: {
            create: resources.map(r => ({
              type: r.type as any,
              title: r.title,
              description: r.description,
              url: r.url,
              content: r.content,
              order: r.order,
            })),
          },
        },
        include: {
          tags: { include: { tag: true } },
          resources: true,
        },
      });
    });
  }

  /**
   * Delete a project
   */
  async delete(id: number): Promise<void> {
    await prisma.project.delete({
      where: { id },
    });
  }

  /**
   * Find a project by ID
   */
  async findById(id: number): Promise<ProjectWithRelations | null> {
    return prisma.project.findUnique({
      where: { id },
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
}
