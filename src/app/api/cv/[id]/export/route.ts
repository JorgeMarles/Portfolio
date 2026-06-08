import { CvService } from "@/services/cv.service";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const cvId = parseInt(id);

  const cvService = new CvService();
  const version = await cvService.getVersionById(cvId);

  if (!version) {
    return NextResponse.json({ error: "CV version not found" }, { status: 404 });
  }

  // Check if public or user is authenticated
  if (!version.isPublic) {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const filename = `CV_${version.name.replace(/\s+/g, "_")}.yaml`;

  return new NextResponse(version.content, {
    headers: {
      "Content-Type": "text/yaml",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
