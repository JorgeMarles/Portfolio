"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={400}
        preview="edit"
      />
    </div>
  );
}
