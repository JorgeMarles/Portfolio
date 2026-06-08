"use client";

import { useRouter } from "next/navigation";
import { deleteTag } from "../actions/tag.actions";
import { DeleteButton } from "../components/DeleteButton";

interface Tag {
  id: number;
  name: string;
  category: string;
  _count?: { projects: number };
}

export function TagsClient({ initialTags }: { initialTags: Tag[] }) {
  const router = useRouter();

  // Group tags by category (languages, frameworks, tools, etc.)
  const groupedTags = initialTags.reduce((acc, tag) => {
    const category = tag.category.toLowerCase();
    if (!acc[category]) acc[category] = [];
    acc[category].push(tag);
    return acc;
  }, {} as Record<string, Tag[]>);

  const categoryLabels: Record<string, string> = {
    language: "Languages",
    framework: "Frameworks & Libraries",
    tool: "Tools & Platforms",
    database: "Databases",
    other: "Other",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1>Tags</h1>
          <p style={{ color: "#a1a1aa", fontSize: "0.875rem", marginTop: "0.5rem" }}>
            Total: {initialTags.length} tags
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/tags/new")}
          className="btn"
        >
          + New Tag
        </button>
      </div>

      {initialTags.length === 0 ? (
        <div
          className="card"
          style={{
            padding: "3rem",
            textAlign: "center",
            color: "#a1a1aa",
          }}
        >
          <p>No tags yet. Create your first one!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "2rem" }}>
          {Object.entries(groupedTags).map(([category, categoryTags]) => (
            <div key={category}>
              <h2 style={{ fontSize: "1.125rem", marginBottom: "1rem", color: "#e5e5e5" }}>
                {categoryLabels[category] || category}
                <span style={{ marginLeft: "0.5rem", color: "#a1a1aa", fontSize: "0.875rem" }}>
                  ({categoryTags.length})
                </span>
              </h2>
              <div style={{ display: "grid", gap: "1rem" }}>
                {categoryTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="card"
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span className="tag">{tag.name}</span>
                        <span style={{ fontSize: "0.875rem", color: "#a1a1aa" }}>
                          Used in {tag._count?.projects || 0} projects
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => router.push(`/admin/tags/${tag.id}/edit`)}
                        className="admin-btn admin-btn-secondary"
                      >
                        Edit
                      </button>
                      <form action={deleteTag.bind(null, tag.id)}>
                        <DeleteButton confirmMessage="Are you sure you want to delete this tag?">
                          Delete
                        </DeleteButton>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
