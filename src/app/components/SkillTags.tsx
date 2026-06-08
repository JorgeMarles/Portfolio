'use client';

interface Skill {
    label: string;
    details: string;
}

export function SkillTags({ skills }: { skills: Skill[] }) {
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.875rem"
        }}>
            {skills.map(skill => (
                <span
                    key={skill.label}
                    style={{
                        background: "rgba(234, 234, 234, 0.03)",
                        padding: "0.625rem 1.125rem",
                        borderRadius: "0",
                        border: "1px solid var(--card-border)",
                        color: "#EAEAEA",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        fontFamily: "var(--mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        transition: "all 100ms ease",
                        cursor: "default"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--accent)";
                        e.currentTarget.style.color = "var(--background)";
                        e.currentTarget.style.borderColor = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(234, 234, 234, 0.03)";
                        e.currentTarget.style.color = "#EAEAEA";
                        e.currentTarget.style.borderColor = "var(--card-border)";
                    }}
                >
                    {skill.details}
                </span>
            ))}
        </div>
    );
}
