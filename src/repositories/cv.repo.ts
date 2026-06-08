import { prisma } from "@/lib/prisma";
import { CvVersion } from "@/generated/prisma";

export class CvRepository {
  async findAll(): Promise<CvVersion[]> {
    return prisma.cvVersion.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async findPublic(): Promise<CvVersion | null> {
    return prisma.cvVersion.findFirst({
      where: { isPublic: true },
    });
  }

  async findById(id: number): Promise<CvVersion | null> {
    return prisma.cvVersion.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string; content: string; isPublic?: boolean }): Promise<CvVersion> {
    return prisma.cvVersion.create({
      data,
    });
  }

  async update(id: number, data: { name?: string; content?: string; isPublic?: boolean }): Promise<CvVersion> {
    return prisma.cvVersion.update({
      where: { id },
      data,
    });
  }

  async setPublic(id: number): Promise<CvVersion> {
    return prisma.$transaction(async (tx) => {
      await tx.cvVersion.updateMany({
        where: { isPublic: true },
        data: { isPublic: false },
      });
      return tx.cvVersion.update({
        where: { id },
        data: { isPublic: true },
      });
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.cvVersion.delete({
      where: { id },
    });
  }
}
