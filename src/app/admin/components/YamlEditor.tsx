"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CodeMirror = dynamic(
  () => import("@uiw/react-codemirror").then((mod) => mod.default),
  { ssr: false }
);

interface YamlEditorProps {
  value: string;
  onChange: (value: string) => void;
  errors?: string[];
}

export function YamlEditor({ value, onChange, errors }: YamlEditorProps) {
  const [extensions, setExtensions] = useState<any[]>([]);

  useEffect(() => {
    import("@codemirror/lang-yaml").then(({ yaml }) => {
      setExtensions([yaml()]);
    });
  }, []);

  if (extensions.length === 0) {
    return <div>Loading editor...</div>;
  }

  return (
    <div>
      <div data-color-mode="dark">
        <CodeMirror
          value={value}
          height="500px"
          extensions={extensions}
          onChange={onChange}
          theme="dark"
        />
      </div>
      {errors && errors.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
          }}
        >
          <h4 style={{ fontSize: "0.875rem", marginBottom: "0.5rem", color: "#f87171" }}>
            Validation Errors:
          </h4>
          <ul style={{ margin: 0, paddingLeft: "1.5rem", color: "#f87171", fontSize: "0.875rem" }}>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
