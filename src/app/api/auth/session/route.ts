import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    return NextResponse.json({
      isLoggedIn: session.isLoggedIn ?? false,
      email: session.email ?? null,
    });
  } catch (error) {
    console.error("[SESSION API] Error:", error);
    return NextResponse.json(
      { isLoggedIn: false, email: null },
      { status: 500 }
    );
  }
}
