"use client";

import { ResourceType } from "@/generated/prisma";

interface Resource {
  type: ResourceType;
  title: string;
  description?: string;
  url?: string;
  content?: string;
  order: number;
}

interface ResourceManagerProps {
  resources: Resource[];
  onChange: (resources: Resource[]) => void;
}

export function ResourceManager({ resources, onChange }: ResourceManagerProps) {
  const addResource = () => {
    onChange([
      ...resources,
      {
        type: "LINK" as ResourceType,
        title: "",
        description: "",
        url: "",
        order: resources.length,
      },
    ]);
  };

  const updateResource = (index: number, field: keyof Resource, value: string) => {
    const updated = [...resources];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeResource = (index: number) => {
    onChange(resources.filter((_, i) => i !== index));
  };

  return (
    <div>
      {resources.map((resource, index) => (
        <div
          key={index}
          style={{
            padding: "1.5rem",
            marginBottom: "1rem",
            background: "#0A0A0A",
            border: "2px solid #1A1A1A",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h4 className="admin-label" style={{ marginBottom: 0 }}>
              Resource Unit
              <span style={{ color: "#E61919", marginLeft: "0.5rem" }}>#{String(index + 1).padStart(2, "0")}</span>
            </h4>
            <button
              type="button"
              onClick={() => removeResource(index)}
              className="admin-btn admin-btn-danger"
              style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}
            >
              Delete
            </button>
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label className="admin-label">Resource Type</label>
              <select
                value={resource.type}
                onChange={(e) => updateResource(index, "type", e.target.value)}
                className="admin-input admin-select"
              >
                <option value="LINK">/// LINK</option>
                <option value="DOCUMENT">/// DOCUMENT</option>
                <option value="VIDEO">/// VIDEO</option>
                <option value="REPOSITORY">/// REPOSITORY</option>
              </select>
            </div>

            <div>
              <label className="admin-label">Title Designation</label>
              <input
                type="text"
                value={resource.title}
                onChange={(e) => updateResource(index, "title", e.target.value)}
                className="admin-input"
                placeholder=">>> RESOURCE TITLE"
              />
            </div>

            <div>
              <label className="admin-label">Description</label>
              <input
                type="text"
                value={resource.description || ""}
                onChange={(e) => updateResource(index, "description", e.target.value)}
                className="admin-input"
                placeholder=">>> BRIEF DESCRIPTION"
              />
            </div>

            {resource.type !== "DOCUMENT" && (
              <div>
                <label className="admin-label">Resource URI</label>
                <input
                  type="url"
                  value={resource.url || ""}
                  onChange={(e) => updateResource(index, "url", e.target.value)}
                  className="admin-input"
                  placeholder="https://resource.url"
                />
              </div>
            )}

            {resource.type === "DOCUMENT" && (
              <div>
                <label className="admin-label">Document Content</label>
                <textarea
                  value={resource.content || ""}
                  onChange={(e) => updateResource(index, "content", e.target.value)}
                  rows={4}
                  className="admin-input admin-textarea"
                  placeholder=">>> MARKDOWN CONTENT HERE"
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addResource}
        className="admin-btn admin-btn-secondary"
        style={{ width: "100%" }}
      >
        + Add Resource
      </button>
    </div>
  );
}
