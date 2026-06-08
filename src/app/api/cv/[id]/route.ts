import { CvService } from "@/services/cv.service";
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

  return NextResponse.json(version);
}
