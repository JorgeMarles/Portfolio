import { TagService } from "@/services/tag.service";
import { TagsClient } from "./TagsClient";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminTagsPage() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/admin/login");
  const tagService = new TagService();
  const tags = await tagService.getAllTags();

  return <TagsClient initialTags={tags} />;
}
