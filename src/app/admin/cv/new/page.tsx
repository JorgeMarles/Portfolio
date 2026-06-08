"use client";

import { useActionState, useState } from "react";
import { YamlEditor } from "../../components/YamlEditor";
import { createCvVersion } from "../../actions/cv.actions";

const TEMPLATE_YAML = `cv:
  name: Your Name
  headline: Software Engineer
  location: City, Country
  email: email@example.com
  website: https://yourwebsite.com
  social_networks:
    - network: LinkedIn
      username: yourprofile
    - network: GitHub
      username: yourusername
  sections:
    experience:
      - company: Company Name
        position: Senior Software Engineer
        start_date: 2020-01
        end_date: present
        location: City, Country
        highlights:
          - "Led development of microservices architecture"
          - "Reduced deployment time by 60%"
    education:
      - institution: University Name
        area: Computer Science
        degree: Bachelor of Science
        start_date: 2015-09
        end_date: 2019-06
        highlights:
          - "GPA: 3.8/4.0"
          - "Dean's List all semesters"
    skills:
      - label: Languages
        details: TypeScript, Python, Go, Java
      - label: Frameworks
        details: React, Next.js, Node.js, Django
      - label: Tools
        details: Docker, Kubernetes, AWS, PostgreSQL
`;

export default function NewCvPage() {
  const [state, formAction, pending] = useActionState(createCvVersion, null);
  const [name, setName] = useState("");
  const [content, setContent] = useState(TEMPLATE_YAML);
  const [isPublic, setIsPublic] = useState(false);

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Create New CV Version</h1>

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
              placeholder=">>> MAIN CV / TECH RESUME / ACADEMIC CV"
              required
              className="admin-input"
            />
          </div>

          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
              <input
                name="isPublic"
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                value="true"
                className="admin-checkbox"
              />
              <span className="admin-label" style={{ marginBottom: 0 }}>
                Public Display Unit
              </span>
            </label>
            <p style={{
              fontSize: "0.6875rem",
              color: "#4A4A4A",
              marginTop: "0.5rem",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em"
            }}>
              /// RENDERS ON ABOUT PAGE WHEN ACTIVATED
            </p>
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
              {pending ? "Creating..." : "Create CV Version"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
