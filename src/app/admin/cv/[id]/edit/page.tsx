"use client";

import { useActionState, useState, useEffect } from "react";
import { YamlEditor } from "../../../components/YamlEditor";
import { updateCvVersion } from "../../../actions/cv.actions";
import { use } from "react";

interface EditCvPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCvVersion(id: number) {
  const response = await fetch(`/api/cv/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch CV version");
  }
  return response.json();
}

export default function EditCvPage({ params }: EditCvPageProps) {
  const { id } = use(params);
  const cvId = parseInt(id);

  const [state, formAction, pending] = useActionState(
    updateCvVersion.bind(null, cvId),
    null
  );

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getCvVersion(cvId).then((cv) => {
      setName(cv.name);
      setContent(cv.content);
      setLoading(false);
    });
  }, [cvId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Edit CV Version</h1>

      <form action={formAction}>
        <div style={{ display: "grid", gap: "2rem" }}>
          <div>
            <label className="admin-label">
              CV Version Identifier
            </label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="admin-input"
              placeholder=">>> MAIN CV / TECH RESUME / ACADEMIC CV"
            />
          </div>

          <div>
            <label className="admin-label" style={{ marginBottom: "1rem" }}>
              YAML Configuration Document
            </label>
            <input type="hidden" name="content" value={content} />
            <YamlEditor
              value={content}
              onChange={setContent}
              errors={state?.validationErrors}
            />
          </div>

          {state?.error && !state?.validationErrors && (
            <div
              style={{
                padding: "1rem",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
                color: "#f87171",
              }}
            >
              {state.error}
            </div>
          )}

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              type="submit"
              disabled={pending}
              className="btn"
              style={{ opacity: pending ? 0.6 : 1 }}
            >
              {pending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
