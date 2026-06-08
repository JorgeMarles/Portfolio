"use server";

import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTag(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const categoryInput = formData.get("category") as string;
  const category = (categoryInput || "OTHER") as "LANGUAGE" | "FRAMEWORK" | "TOOL" | "OTHER";

  if (!name) {
    return { error: "Name is required" };
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  try {
    await prisma.tag.create({
      data: { name, slug, category },
    });
    revalidatePath("/admin/tags");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create tag" };
  }
}

export async function createTagDirect(name: string, category: string) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const validCategory = (category || "OTHER") as "LANGUAGE" | "FRAMEWORK" | "TOOL" | "OTHER";

  const tag = await prisma.tag.create({
    data: { name, slug, category: validCategory },
  });

  revalidatePath("/admin/tags");
  revalidatePath("/admin/projects");
  return tag;
}

export async function updateTag(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "Unauthorized" };
  }

  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const categoryInput = (formData.get("category") as string) || "OTHER";
  const category = categoryInput as "LANGUAGE" | "FRAMEWORK" | "TOOL" | "OTHER";

  if (!name) {
    return { error: "Name is required" };
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  try {
    await prisma.tag.update({
      where: { id },
      data: { name, slug, category },
    });
    revalidatePath("/admin/tags");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update tag" };
  }
}

export async function deleteTag(id: number | string) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

  const projectCount = await prisma.projectTag.count({
    where: { tagId: numericId },
  });

  if (projectCount > 0) {
    throw new Error("Cannot delete tag that is used by projects");
  }

  await prisma.tag.delete({
    where: { id: numericId },
  });

  revalidatePath("/admin/tags");
  revalidatePath("/admin/projects");
}
