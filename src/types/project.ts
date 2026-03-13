import { ProjectWithRelations } from "@/repositories/project.repo";

/**
 * Agrega aquí cualquier tipo personalizado o utilitario 
 * relacionado con la lógica de negocio que no venga directo de Prisma
 */

export interface ProjectCardDisplay extends Pick<ProjectWithRelations, 'id' | 'title' | 'slug' | 'featured'> {
    mainTag: string;
    excerpt: string;
}
