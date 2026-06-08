"use client";

import { useActionState } from "react";
import { updateTag } from "../../../actions/tag.actions";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTagPage() {
  const params = useParams();
  const tagId = params.id as string;
  const [tag, setTag] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tags/${tagId}`)
      .then((res) => res.json())
      .then((data) => {
        setTag(data);
        setLoading(false);
      });
  }, [tagId]);

  const [state, formAction, pending] = useActionState(updateTag, null);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/tags" style={{ color: "#a1a1aa", textDecoration: "none" }}>
          ← Back to Tags
        </Link>
      </div>

      <h1 style={{ marginBottom: "2rem" }}>Edit Tag</h1>

      <form action={formAction}>
        <input type="hidden" name="id" value={tagId} />

        <div className="card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="name" className="admin-label">
              Tag Designation
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={tag?.name}
              placeholder=">>> TYPESCRIPT / REACT / POSTGRESQL"
              className="admin-input"
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="category" className="admin-label">
              Classification
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue={tag?.category || "OTHER"}
              className="admin-input admin-select"
            >
              <option value="LANGUAGE">/// LANGUAGE</option>
              <option value="FRAMEWORK">/// FRAMEWORK</option>
              <option value="TOOL">/// TOOL</option>
              <option value="DATABASE">/// DATABASE</option>
              <option value="OTHER">/// OTHER</option>
            </select>
          </div>
        </div>

        {state?.error && (
          <div
            style={{
              padding: "1rem",
              marginBottom: "1.5rem",
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
          <button type="submit" className="btn" disabled={pending}>
            {pending ? "Updating..." : "Update Tag"}
          </button>
          <Link href="/admin/tags" className="btn btn-outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
