"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectWithRelations } from "@/repositories/project.repo";

type FeaturedSliderProps = {
  projects: ProjectWithRelations[];
};

export default function FeaturedSlider({ projects }: FeaturedSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = projects.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setActiveIndex((index + total) % total);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [total, isTransitioning]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-advance every 6 seconds, paused on hover
  useEffect(() => {
    if (isHovered || total <= 1) return;
    const id = setInterval(goNext, 6000);
    return () => clearInterval(id);
  }, [isHovered, goNext, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  if (total === 0) return null;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="region"
      aria-label="Featured projects carousel"
      aria-roledescription="carousel"
      style={{
        position: "relative",
        width: "100%",
        outline: "none",
      }}
    >
      {/* Slide viewport */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          border: "1px solid var(--card-border)",
          background: "var(--card-bg)",
        }}
      >
        {/* Track */}
        <div
          style={{
            display: "flex",
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform",
          }}
        >
          {projects.map((proj, i) => (
            <div
              key={proj.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${total}: ${proj.title}`}
              style={{
                minWidth: "100%",
                display: "grid",
                gridTemplateColumns: proj.imageUrl ? "1fr 1fr" : "1fr",
                minHeight: "520px",
              }}
            >
              {/* Image panel */}
              {proj.imageUrl && (
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.02)",
                    borderRight: "1px solid var(--card-border)",
                  }}
                >
                  <Image
                    src={proj.imageUrl}
                    alt={proj.title}
                    fill
                    style={{
                      objectFit: "cover",
                      opacity: i === activeIndex ? 1 : 0.7,
                      transition: "opacity 0.6s ease",
                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                  />
                  {/* Gradient overlay on image */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, transparent 40%, rgba(10,10,10,0.6) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              )}

              {/* Content panel */}
              <div
                style={{
                  padding: "3rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1.5rem",
                  gridColumn: proj.imageUrl ? undefined : "1 / -1",
                }}
              >
                {/* Project number indicator */}
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.6875rem",
                    color: "var(--accent)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  PROJECT {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  {proj.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: "#aaa",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    maxWidth: "50ch",
                    margin: 0,
                  }}
                >
                  {proj.description}
                </p>

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ fontSize: "0.6875rem" }}
                    >
                      Live Demo
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ fontSize: "0.6875rem" }}
                    >
                      View Code
                    </a>
                  )}
                  <Link
                    href={`/projects/${proj.slug}`}
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "opacity 150ms ease",
                    }}
                  >
                    {">>>"} Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {total > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous project"
            style={{
              position: "absolute",
              top: "50%",
              left: "-1.5rem",
              transform: "translateY(-50%)",
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--background)",
              border: "2px solid var(--card-border)",
              color: "var(--foreground)",
              cursor: "pointer",
              fontFamily: "var(--mono)",
              fontSize: "1.25rem",
              fontWeight: 700,
              transition: "border-color 150ms ease, color 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--card-border)";
              e.currentTarget.style.color = "var(--foreground)";
            }}
          >
            &larr;
          </button>
          <button
            onClick={goNext}
            aria-label="Next project"
            style={{
              position: "absolute",
              top: "50%",
              right: "-1.5rem",
              transform: "translateY(-50%)",
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--background)",
              border: "2px solid var(--card-border)",
              color: "var(--foreground)",
              cursor: "pointer",
              fontFamily: "var(--mono)",
              fontSize: "1.25rem",
              fontWeight: 700,
              transition: "border-color 150ms ease, color 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--card-border)";
              e.currentTarget.style.color = "var(--foreground)";
            }}
          >
            &rarr;
          </button>
        </>
      )}

      {/* Dot indicators + progress bar */}
      {total > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginTop: "1.5rem",
          }}
        >
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              style={{
                width: i === activeIndex ? "2rem" : "0.5rem",
                height: "0.5rem",
                border: "none",
                background:
                  i === activeIndex ? "var(--accent)" : "var(--card-border)",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: i === activeIndex ? 1 : 0.6,
              }}
            />
          ))}
        </div>
      )}

      {/* Responsive styles via inline media query workaround */}
      <style>{`
        @media (max-width: 768px) {
          [aria-roledescription="slide"] {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          [aria-roledescription="slide"] > div:first-child {
            height: 240px;
            border-right: none !important;
            border-bottom: 1px solid var(--card-border);
          }
          [aria-label="Previous project"] {
            left: 0.5rem !important;
            width: 2.5rem !important;
            height: 2.5rem !important;
          }
          [aria-label="Next project"] {
            right: 0.5rem !important;
            width: 2.5rem !important;
            height: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
