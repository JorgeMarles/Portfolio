import { getSession } from "@/lib/session";
import { logout } from "./actions/auth.actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import "./admin.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If not logged in, show only children (login page)
  if (!session.isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "250px",
          background: "rgba(255, 255, 255, 0.02)",
          borderRight: "1px solid var(--card-border)",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "2rem", fontSize: "1.5rem" }}>Admin Panel</h2>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link
                href="/admin"
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                }}
                className="nav-link"
              >
                Dashboard
              </Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link
                href="/admin/projects"
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                }}
                className="nav-link"
              >
                Projects
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "2rem", borderTop: "1px solid var(--card-border)" }}>
          <p style={{ fontSize: "0.875rem", color: "#a1a1aa", marginBottom: "0.5rem" }}>
            Logged in as
          </p>
          <p style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>
            {session.email}
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="admin-btn admin-btn-secondary"
              style={{ width: "100%" }}
            >
              Logout
            </button>
          </form>
        </div>
      </aside>

      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}
