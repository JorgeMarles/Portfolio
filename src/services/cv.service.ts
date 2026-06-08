import { CvRepository } from "@/repositories/cv.repo";
import { CvVersion } from "@/generated/prisma";

export class CvService {
  private cvRepo: CvRepository;

  constructor() {
    this.cvRepo = new CvRepository();
  }

  async getAllVersions(): Promise<CvVersion[]> {
    return this.cvRepo.findAll();
  }

  async getPublicVersion(): Promise<CvVersion | null> {
    return this.cvRepo.findPublic();
  }

  async getVersionById(id: number): Promise<CvVersion | null> {
    return this.cvRepo.findById(id);
  }

  async createVersion(data: { name: string; content: string; isPublic?: boolean }): Promise<CvVersion> {
    return this.cvRepo.create(data);
  }

  async updateVersion(id: number, data: { name?: string; content?: string }): Promise<CvVersion> {
    return this.cvRepo.update(id, data);
  }

  async publishVersion(id: number): Promise<CvVersion> {
    return this.cvRepo.setPublic(id);
  }

  async cloneVersion(id: number): Promise<CvVersion> {
    const original = await this.cvRepo.findById(id);
    if (!original) {
      throw new Error("Version not found");
    }
    return this.cvRepo.create({
      name: `${original.name} (Copy)`,
      content: original.content,
      isPublic: false,
    });
  }

  async deleteVersion(id: number): Promise<void> {
    const version = await this.cvRepo.findById(id);
    if (!version) {
      throw new Error("Version not found");
    }
    if (version.isPublic) {
      const allVersions = await this.cvRepo.findAll();
      if (allVersions.length === 1) {
        throw new Error("Cannot delete the only public version");
      }
    }
    await this.cvRepo.delete(id);
  }
}
