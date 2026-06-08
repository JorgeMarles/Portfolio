"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("[LOGIN] Received:", { email, passwordLength: password?.length });

  if (!email || !password) {
    console.log("[LOGIN] Missing credentials");
    return { error: "Email and password are required" };
  }

  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  console.log("[LOGIN] Config:", {
    adminEmail,
    adminEmailDefined: !!adminEmail,
    passwordDefined: !!adminPassword,
    emailMatch: email === adminEmail,
  });

  if (email !== adminEmail) {
    console.log("[LOGIN] Email mismatch:", { provided: email, expected: adminEmail });
    return { error: "Invalid credentials" };
  }

  console.log("[LOGIN] Comparing password...");
  const isValidPassword = password === adminPassword;
  console.log("[LOGIN] Password comparison result:", isValidPassword);

  if (!isValidPassword) {
    console.log("[LOGIN] Password invalid");
    return { error: "Invalid credentials" };
  }

  console.log("[LOGIN] Creating session...");
  const session = await getSession();
  session.isLoggedIn = true;
  session.email = email;
  await session.save();

  console.log("[LOGIN] Success, redirecting...");
  redirect("/admin");
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}
