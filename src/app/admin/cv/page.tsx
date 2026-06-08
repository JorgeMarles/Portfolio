import { CvService } from "@/services/cv.service";
import { CvClient } from "./CvClient";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminCvPage() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/admin/login");
  const cvService = new CvService();
  const versions = await cvService.getAllVersions();

  return <CvClient initialVersions={versions} />;
}
