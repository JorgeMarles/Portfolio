"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ProjectRepository } from "@/repositories/project.repo";

const projectRepo = new ProjectRepository();

export async function createProject(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "Unauthorized" };
  }

  try {
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as any,
      featured: formData.get("featured") === "true",
      githubUrl: formData.get("githubUrl") as string || undefined,
      demoUrl: formData.get("demoUrl") as string || undefined,
      imageUrl: formData.get("imageUrl") as string || undefined,
    };

    const tagIds = JSON.parse(formData.get("tagIds") as string);
    const resources = JSON.parse(formData.get("resources") as string);

    await projectRepo.create(data, tagIds, resources);
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  } catch (error: any) {
    return { error: error.message || "Failed to create project" };
  }

  redirect("/admin/projects");
}

export async function updateProject(id: number, prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "Unauthorized" };
  }

  try {
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as any,
      featured: formData.get("featured") === "true",
      githubUrl: formData.get("githubUrl") as string || undefined,
      demoUrl: formData.get("demoUrl") as string || undefined,
      imageUrl: formData.get("imageUrl") as string || undefined,
    };

    const tagIds = JSON.parse(formData.get("tagIds") as string);
    const resources = JSON.parse(formData.get("resources") as string);

    await projectRepo.update(id, data, tagIds, resources);
    revalidatePath("/projects");
    revalidatePath(`/projects/${data.slug}`);
    revalidatePath("/admin/projects");
  } catch (error: any) {
    return { error: error.message || "Failed to update project" };
  }

  redirect("/admin/projects");
}

export async function deleteProject(id: number | string) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  await projectRepo.delete(numericId);
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function toggleFeatured(id: number | string) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const project = await projectRepo.findById(numericId);
  if (!project) {
    throw new Error("Project not found");
  }

  await projectRepo.update(
    numericId,
    {
      title: project.title,
      slug: project.slug,
      name: project.name,
      description: project.description,
      status: project.status,
      featured: !project.featured,
      githubUrl: project.githubUrl || undefined,
      demoUrl: project.demoUrl || undefined,
      imageUrl: project.imageUrl || undefined,
    },
    project.tags.map((pt) => pt.tagId),
    project.resources.map((r) => ({
      type: r.type,
      title: r.title,
      description: r.description || undefined,
      url: r.url || undefined,
      content: r.content || undefined,
      order: r.order,
    }))
  );

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}
