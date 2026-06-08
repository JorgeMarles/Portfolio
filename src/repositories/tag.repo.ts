import { prisma } from "@/lib/prisma";
import { Tag } from "@/generated/prisma";

export class TagRepository {
  /**
   * Get all tags ordered by category and name
   */
  async findAll() {
    return prisma.tag.findMany({
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
      },
      orderBy: [
        {
          category: "asc",
        },
        {
          name: "asc",
        },
      ],
    });
  }

  /**
   * Get a tag by ID
   */
  async findById(id: number) {
    return prisma.tag.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });
  }

  /**
   * Find a tag by slug
   */
  async findBySlug(slug: string): Promise<Tag | null> {
    return prisma.tag.findUnique({
      where: { slug },
    });
  }
}
