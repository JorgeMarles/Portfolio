"use client";

import { Tag, TagCategory } from "@/generated/prisma";
import { useState } from "react";

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTagIds: number[];
  onChange: (tagIds: number[]) => void;
  onCreateTag?: (name: string, category: TagCategory) => Promise<Tag>;
}

export function TagSelector({ availableTags, selectedTagIds, onChange, onCreateTag }: TagSelectorProps) {
  const [search, setSearch] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagCategory, setNewTagCategory] = useState<TagCategory>("OTHER");
  const [isCreating, setIsCreating] = useState(false);

  const toggleTag = (tagId: number) => {
    const newSelection = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId];
    onChange(newSelection);
  };

  const handleCreateTag = async () => {
    if (!newTagName.trim() || !onCreateTag) return;

    setIsCreating(true);
    try {
      const newTag = await onCreateTag(newTagName.trim(), newTagCategory);
      onChange([...selectedTagIds, newTag.id]);
      setNewTagName("");
      setShowCreateForm(false);
      setSearch("");
    } catch (error) {
      console.error("Failed to create tag:", error);
      alert("Failed to create tag. It might already exist.");
    } finally {
      setIsCreating(false);
    }
  };

  const filteredTags = search
    ? availableTags.filter((tag) => tag.name.toLowerCase().includes(search.toLowerCase()))
    : availableTags;

  const tagsByCategory = filteredTags.reduce((acc, tag) => {
    if (!acc[tag.category]) acc[tag.category] = [];
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, Tag[]>);

  const categoryLabels: Record<TagCategory, string> = {
    LANGUAGE: "Languages",
    FRAMEWORK: "Frameworks",
    TOOL: "Tools",
    DATABASE: "Databases",
    INFRASTRUCTURE: "Infrastructure",
    OTHER: "Other",
  };

  return (
    <div>
      {/* Search & Create */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder=">>> SEARCH DATABASE"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input"
          style={{
            marginBottom: "0.75rem",
          }}
        />

        {onCreateTag && (
          <div>
            {!showCreateForm ? (
              <button
                type="button"
                onClick={() => setShowCreateForm(true)}
                className="admin-btn admin-btn-secondary"
                style={{ width: "100%" }}
              >
                + Create New Tag
              </button>
            ) : (
              <div
                style={{
                  padding: "1.5rem",
                  background: "#0A0A0A",
                  border: "2px solid #1A1A1A",
                }}
              >
                <div style={{ marginBottom: "0.75rem" }}>
                  <label className="admin-label" style={{ marginBottom: "0.5rem" }}>
                    New Tag Designation
                  </label>
                  <input
                    type="text"
                    placeholder=">>> REACT / POSTGRESQL"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label className="admin-label" style={{ marginBottom: "0.5rem" }}>
                    Classification Type
                  </label>
                  <select
                    value={newTagCategory}
                    onChange={(e) => setNewTagCategory(e.target.value as TagCategory)}
                    className="admin-input admin-select"
                  >
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        /// {label.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={handleCreateTag}
                    disabled={isCreating || !newTagName.trim()}
                    className="admin-btn admin-btn-primary"
                    style={{ flex: 1 }}
                  >
                    {isCreating ? "Creating..." : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewTagName("");
                    }}
                    className="admin-btn admin-btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Selected Tags */}
      {selectedTagIds.length > 0 && (
        <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#0A0A0A", border: "2px solid #1A1A1A" }}>
          <h4 className="admin-label" style={{ marginBottom: "0.75rem" }}>
            Active Selection
            <span style={{ color: "#E61919", marginLeft: "0.5rem" }}>({selectedTagIds.length})</span>
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {availableTags
              .filter((tag) => selectedTagIds.includes(tag.id))
              .map((tag) => (
                <span
                  key={tag.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    background: "#E61919",
                    border: "2px solid #E61919",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#0A0A0A",
                    transition: "opacity 100ms",
                  }}
                  onClick={() => toggleTag(tag.id)}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                  {tag.name}
                  <span style={{ fontSize: "1rem", fontWeight: 900 }}>✕</span>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Available Tags by Category */}
      {Object.keys(tagsByCategory).length === 0 ? (
        <p style={{
          color: "#4A4A4A",
          fontSize: "0.75rem",
          textAlign: "center",
          padding: "2rem",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          letterSpacing: "0.08em"
        }}>
          /// NO TAGS IN DATABASE {onCreateTag && "— CREATE ONE ABOVE"}
        </p>
      ) : (
        Object.entries(tagsByCategory).map(([category, tags]) => (
          <div key={category} style={{ marginBottom: "1.5rem", padding: "1rem", background: "#0A0A0A", border: "2px solid #1A1A1A" }}>
            <h4 className="admin-label" style={{ marginBottom: "0.75rem" }}>
              {categoryLabels[category as TagCategory] || category}
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {tags.map((tag) => {
                const isSelected = selectedTagIds.includes(tag.id);
                return (
                  <label
                    key={tag.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 0.75rem",
                      background: isSelected ? "#121212" : "#0A0A0A",
                      border: `2px solid ${isSelected ? "#252525" : "#1A1A1A"}`,
                      cursor: "pointer",
                      transition: "border-color 100ms",
                      opacity: isSelected ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => !isSelected && (e.currentTarget.style.borderColor = "#252525")}
                    onMouseLeave={(e) => !isSelected && (e.currentTarget.style.borderColor = "#1A1A1A")}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleTag(tag.id)}
                      className="admin-checkbox"
                      style={{ cursor: "pointer" }}
                    />
                    <span style={{
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      {tag.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
