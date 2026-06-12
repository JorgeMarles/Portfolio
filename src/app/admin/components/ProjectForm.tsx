"use client";

import { useActionState } from "react";
import { useState, useEffect } from "react";
import { ProjectStatus } from "@/generated/prisma";
import { ResourceManager } from "./ResourceManager";
import { ProjectWithRelations } from "@/repositories/project.repo";

interface ProjectFormProps {
  project?: ProjectWithRelations;
  action: (prevState: any, formData: FormData) => Promise<any>;
}

export function ProjectForm({ project, action }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState<ProjectStatus>(project?.status || "COMPLETED");
  const [featured, setFeatured] = useState(project?.featured || false);
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || "");
  const [demoUrl, setDemoUrl] = useState(project?.demoUrl || "");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const [tagsInput, setTagsInput] = useState(project?.tags.join(", ") || "");
  const [resources, setResources] = useState(
    project?.resources.map((r) => ({
      type: r.type,
      title: r.title,
      description: r.description || "",
      url: r.url || "",
      content: r.content || "",
      order: r.order,
    })) || []
  );

  useEffect(() => {
    if (!slug && title) {
      const autoSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(autoSlug);
    }
  }, [title, slug]);

  const handleSubmit = (formData: FormData) => {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    formData.set("tags", JSON.stringify(tags));
    formData.set("resources", JSON.stringify(resources));
    return formAction(formData);
  };

  return (
    <form action={handleSubmit}>
      <div style={{ display: "grid", gap: "2rem" }}>
        <div className="admin-field-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <label className="admin-label">Project Title</label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="admin-input"
              placeholder="Project title"
            />
          </div>
          <div>
            <label className="admin-label">URL Slug</label>
            <input
              name="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="admin-input"
              placeholder="auto-generated-slug"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Display Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="admin-input"
            placeholder="Public facing name"
          />
        </div>

        <div>
          <label className="admin-label">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={300}
            className="admin-input"
            placeholder="Brief project description (max 300 chars)"
            rows={3}
            style={{ resize: "vertical" }}
          />
          <span style={{ fontSize: "0.75rem", color: "#666", marginTop: "0.25rem", display: "block" }}>
            {description.length}/300
          </span>
        </div>

        <div className="admin-field-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <label className="admin-label">Status</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className="admin-input admin-select"
            >
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
              <input
                name="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                value="true"
                className="admin-checkbox"
              />
              <span className="admin-label" style={{ marginBottom: 0 }}>Featured</span>
            </label>
          </div>
        </div>

        <div className="admin-field-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          <div>
            <label className="admin-label">GitHub URL</label>
            <input
              name="githubUrl"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="admin-input"
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label className="admin-label">Demo URL</label>
            <input
              name="demoUrl"
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="admin-input"
              placeholder="https://demo.example.com"
            />
          </div>
          <div>
            <label className="admin-label">Image URL</label>
            <input
              name="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="admin-input"
              placeholder="https://cdn.example.com/img.jpg"
            />
          </div>
        </div>

        <div>
          <label className="admin-label">Tags</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="admin-input"
            placeholder="TypeScript, Go, Docker (comma separated)"
          />
          <span style={{ fontSize: "0.75rem", color: "#666", marginTop: "0.25rem", display: "block" }}>
            Separate tags with commas
          </span>
        </div>

        <div>
          <label className="admin-label" style={{ marginBottom: "1rem" }}>Resources</label>
          <ResourceManager
            resources={resources}
            onChange={(r) =>
              setResources(
                r.map((res) => ({
                  ...res,
                  description: res.description || "",
                  url: res.url || "",
                  content: res.content || "",
                }))
              )
            }
          />
        </div>

        {state?.error && (
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
            {pending ? "Saving..." : project ? "Update Project" : "Create Project"}
          </button>
        </div>
      </div>
    </form>
  );
}
