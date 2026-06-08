"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CvService } from "@/services/cv.service";
import { validateRenderCvYaml } from "@/lib/rendercv-validator";

const cvService = new CvService();

export async function createCvVersion(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const content = formData.get("content") as string;
  const isPublic = formData.get("isPublic") === "true";

  if (!name || !content) {
    return { error: "Name and content are required" };
  }

  const validation = validateRenderCvYaml(content);
  if (!validation.valid) {
    return { error: "Invalid YAML", validationErrors: validation.errors };
  }

  try {
    await cvService.createVersion({ name, content, isPublic });
    revalidatePath("/admin/cv");
    revalidatePath("/about");
  } catch (error: any) {
    return { error: error.message || "Failed to create CV version" };
  }

  redirect("/admin/cv");
}

export async function updateCvVersion(id: number, prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const content = formData.get("content") as string;

  if (!name || !content) {
    return { error: "Name and content are required" };
  }

  const validation = validateRenderCvYaml(content);
  if (!validation.valid) {
    return { error: "Invalid YAML", validationErrors: validation.errors };
  }

  try {
    await cvService.updateVersion(id, { name, content });
    revalidatePath("/admin/cv");
    revalidatePath("/about");
  } catch (error: any) {
    return { error: error.message || "Failed to update CV version" };
  }

  redirect("/admin/cv");
}

export async function publishCvVersion(id: number | string) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  await cvService.publishVersion(numericId);
  revalidatePath("/admin/cv");
  revalidatePath("/about");
}

export async function cloneCvVersion(id: number | string) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  await cvService.cloneVersion(numericId);
  revalidatePath("/admin/cv");
}

export async function deleteCvVersion(id: number | string) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  try {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    await cvService.deleteVersion(numericId);
    revalidatePath("/admin/cv");
    revalidatePath("/about");
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete CV version");
  }
}
