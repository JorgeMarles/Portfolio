"use client";

import { useActionState } from "react";
import { login } from "../actions/auth.actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
        }}
      >
        <h1 style={{ marginBottom: "0.5rem", fontSize: "2rem" }}>Admin Login</h1>
        <p style={{ color: "#a1a1aa", marginBottom: "2rem" }}>
          Sign in to access the admin panel
        </p>

        <form action={formAction}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="email" className="admin-label">
              User Credentials
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="admin-input"
              placeholder="admin@system.local"
              style={{ textTransform: "none" }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" className="admin-label">
              Access Code
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="admin-input"
              placeholder="******************"
              style={{ textTransform: "none" }}
            />
          </div>

          {state?.error && (
            <div
              style={{
                padding: "0.75rem",
                marginBottom: "1.5rem",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
                color: "#f87171",
                fontSize: "0.875rem",
              }}
            >
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="btn"
            style={{
              width: "100%",
              opacity: pending ? 0.6 : 1,
              cursor: pending ? "not-allowed" : "pointer",
            }}
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
