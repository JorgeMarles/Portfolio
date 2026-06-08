"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SessionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/auth/session");
        if (!response.ok || !(await response.json()).isLoggedIn) {
          router.push("/admin/login");
        } else {
          setIsChecking(false);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        router.push("/admin/login");
      }
    }

    checkSession();
  }, [router]);

  if (isChecking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
