"use client";

import { useRouter } from "next/navigation";
import { publishCvVersion, cloneCvVersion, deleteCvVersion } from "../actions/cv.actions";
import { DeleteButton } from "../components/DeleteButton";

interface CvVersion {
  id: number;
  name: string;
  isPublic: boolean;
  updatedAt: Date;
}

export function CvClient({ initialVersions }: { initialVersions: CvVersion[] }) {
  const router = useRouter();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>CV Versions</h1>
        <button
          onClick={() => router.push("/admin/cv/new")}
          className="btn"
        >
          + New Version
        </button>
      </div>

      {initialVersions.length === 0 ? (
        <div
          className="card"
          style={{
            padding: "3rem",
            textAlign: "center",
            color: "#a1a1aa",
          }}
        >
          <p>No CV versions yet. Create your first one!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {initialVersions.map((version) => (
            <div
              key={version.id}
              className="card"
              style={{
                padding: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                  <h3>{version.name}</h3>
                  {version.isPublic && (
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        background: "rgba(34, 197, 94, 0.2)",
                        color: "#4ade80",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                      }}
                    >
                      Public
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>
                  Updated {new Date(version.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => router.push(`/admin/cv/${version.id}/edit`)}
                  className="admin-btn admin-btn-secondary"
                >
                  Edit
                </button>
                {!version.isPublic && (
                  <form action={publishCvVersion.bind(null, version.id)}>
                    <button
                      type="submit"
                      className="admin-btn admin-btn-success"
                    >
                      Publish
                    </button>
                  </form>
                )}
                <form action={cloneCvVersion.bind(null, version.id)}>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-secondary"
                  >
                    Clone
                  </button>
                </form>
                <button
                  onClick={() => window.location.href = `/api/cv/${version.id}/export`}
                  className="admin-btn admin-btn-secondary"
                >
                  Export
                </button>
                {!version.isPublic && (
                  <form action={deleteCvVersion.bind(null, version.id)}>
                    <DeleteButton confirmMessage="Are you sure you want to delete this CV version?">
                      Delete
                    </DeleteButton>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
