import { TagRepository } from "@/repositories/tag.repo";
import { Tag } from "@/generated/prisma";

export class TagService {
  private tagRepo: TagRepository;

  constructor() {
    this.tagRepo = new TagRepository();
  }

  /**
   * Get all tags ordered by category
   */
  async getAllTags() {
    return this.tagRepo.findAll();
  }

  /**
   * Get a tag by ID
   */
  async getTagById(id: number) {
    return this.tagRepo.findById(id);
  }

  /**
   * Get a tag by slug
   */
  async getTagBySlug(slug: string): Promise<Tag | null> {
    return this.tagRepo.findBySlug(slug);
  }
}
