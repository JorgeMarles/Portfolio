import { TagService } from "@/services/tag.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tagService = new TagService();
    const tag = await tagService.getTagById(parseInt(id));

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error) {
    console.error("Error fetching tag:", error);
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 });
  }
}
