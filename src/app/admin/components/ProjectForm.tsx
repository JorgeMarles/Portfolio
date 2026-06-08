"use client";

import { useActionState } from "react";
import { useState, useEffect } from "react";
import { Tag, ProjectStatus, TagCategory } from "@/generated/prisma";
import { MarkdownEditor } from "./MarkdownEditor";
import { TagSelector } from "./TagSelector";
import { ResourceManager } from "./ResourceManager";
import { ProjectWithRelations } from "@/repositories/project.repo";
import { createTagDirect } from "../actions/tag.actions";

interface ProjectFormProps {
  project?: ProjectWithRelations;
  availableTags: Tag[];
  action: (prevState: any, formData: FormData) => Promise<any>;
}

export function ProjectForm({ project, availableTags: initialTags, action }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [availableTags, setAvailableTags] = useState(initialTags);

  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [status, setStatus] = useState<ProjectStatus>(project?.status || "COMPLETED");
  const [featured, setFeatured] = useState(project?.featured || false);
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || "");
  const [demoUrl, setDemoUrl] = useState(project?.demoUrl || "");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    project?.tags.map((pt) => pt.tagId) || []
  );
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

  const handleCreateTag = async (name: string, category: TagCategory) => {
    const newTag = await createTagDirect(name, category);
    setAvailableTags([...availableTags, newTag]);
    return newTag;
  };

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
    formData.set("tagIds", JSON.stringify(selectedTagIds));
    formData.set("resources", JSON.stringify(resources));
    return formAction(formData);
  };

  return (
    <form action={handleSubmit}>
      <div style={{ display: "grid", gap: "2rem" }}>
        <div className="admin-field-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <label className="admin-label">
              Project Title
            </label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="admin-input"
              placeholder=">>> ENTER PROJECT DESIGNATION"
            />
          </div>

          <div>
            <label className="admin-label">
              URL Slug
            </label>
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
          <label className="admin-label">
            Display Name
          </label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="admin-input"
            placeholder=">>> PUBLIC FACING NAME"
          />
        </div>

        <div className="admin-field-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <label className="admin-label">
              Operational Status
            </label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className="admin-input admin-select"
            >
              <option value="IN_PROGRESS">/// IN PROGRESS</option>
              <option value="COMPLETED">/// COMPLETED</option>
              <option value="ARCHIVED">/// ARCHIVED</option>
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
              <span className="admin-label" style={{ marginBottom: 0 }}>
                Featured Unit
              </span>
            </label>
          </div>
        </div>

        <div className="admin-field-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          <div>
            <label className="admin-label">
              Repository URI
            </label>
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
            <label className="admin-label">
              Live Demo URI
            </label>
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
            <label className="admin-label">
              Asset URI
            </label>
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
          <label className="admin-label" style={{ marginBottom: "1rem" }}>
            Technical Documentation
          </label>
          <input type="hidden" name="description" value={description} />
          <MarkdownEditor value={description} onChange={setDescription} />
        </div>

        <div>
          <label className="admin-label" style={{ marginBottom: "1rem" }}>
            Classification Tags
          </label>
          <TagSelector
            availableTags={availableTags}
            selectedTagIds={selectedTagIds}
            onChange={setSelectedTagIds}
            onCreateTag={handleCreateTag}
          />
        </div>

        <div>
          <label className="admin-label" style={{ marginBottom: "1rem" }}>
            Attached Resources
          </label>
          <ResourceManager resources={resources} onChange={(r) => setResources(r.map(res => ({
            ...res,
            description: res.description || "",
            url: res.url || "",
            content: res.content || ""
          })))} />
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
