import { prisma } from "@/lib/prisma";
import { Project, Resource } from "@/generated/prisma";

export type ProjectWithRelations = Project & {
  resources: Resource[];
};

export class ProjectRepository {
  async findAll(): Promise<ProjectWithRelations[]> {
    return prisma.project.findMany({
      include: { resources: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findFeatured(): Promise<ProjectWithRelations[]> {
    return prisma.project.findMany({
      where: { featured: true },
      include: { resources: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findBySlug(slug: string): Promise<ProjectWithRelations | null> {
    return prisma.project.findUnique({
      where: { slug },
      include: { resources: true },
    });
  }

  async findByTag(tag: string): Promise<ProjectWithRelations[]> {
    return prisma.project.findMany({
      where: { tags: { has: tag } },
      include: { resources: true },
      orderBy: { createdAt: "desc" },
    });
  }

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
      tags: string[];
    },
    resources: Array<{
      type: string;
      title: string;
      description?: string;
      url?: string;
      content?: string;
      order: number;
    }>
  ): Promise<ProjectWithRelations> {
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
        tags: data.tags,
        resources: {
          create: resources.map((r) => ({
            type: r.type as any,
            title: r.title,
            description: r.description,
            url: r.url,
            content: r.content,
            order: r.order,
          })),
        },
      },
      include: { resources: true },
    });
  }

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
      tags: string[];
    },
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
      await tx.resource.deleteMany({ where: { projectId: id } });

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
          tags: data.tags,
          resources: {
            create: resources.map((r) => ({
              type: r.type as any,
              title: r.title,
              description: r.description,
              url: r.url,
              content: r.content,
              order: r.order,
            })),
          },
        },
        include: { resources: true },
      });
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.project.delete({ where: { id } });
  }

  async findById(id: number): Promise<ProjectWithRelations | null> {
    return prisma.project.findUnique({
      where: { id },
      include: { resources: true },
    });
  }

  async getAllTags(): Promise<string[]> {
    const projects = await prisma.project.findMany({
      select: { tags: true },
    });
    const tagSet = new Set<string>();
    for (const p of projects) {
      for (const t of p.tags) tagSet.add(t);
    }
    return Array.from(tagSet).sort();
  }
}
