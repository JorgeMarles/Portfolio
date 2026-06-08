import { Metadata } from "next";
import { CvService } from "@/services/cv.service";
import { parseCvYaml } from "@/lib/cv-parser";
import { SkillTags } from "@/app/components/SkillTags";

export const metadata: Metadata = {
    title: "About Me | Jorge Marles",
    description: "Professional background, education and technical skills of Jorge Marles.",
};

export default async function AboutPage() {
    const cvService = new CvService();
    const publicVersion = await cvService.getPublicVersion();

    const cv = publicVersion ? parseCvYaml(publicVersion.content) : null;

    if (!cv) {
        return (
            <main className="container" style={{ padding: "6rem 2rem", maxWidth: "840px" }}>
                <h1>About</h1>
                <p style={{ color: "#999", marginTop: "1rem" }}>No public CV available yet.</p>
            </main>
        );
    }

    const timeline = [
        ...cv.experience.map(exp => ({
            year: exp.startDate.substring(0, 4),
            title: exp.position,
            org: exp.company,
            desc: exp.highlights[0] || "",
            type: "experience"
        })),
        ...cv.education.map(edu => ({
            year: edu.startDate.substring(0, 4),
            title: edu.degree,
            org: edu.institution,
            desc: edu.highlights[0] || `${edu.area}`,
            type: "education"
        }))
    ].sort((a, b) => b.year.localeCompare(a.year));

    return (
        <main className="container" style={{ padding: "4rem 2rem", maxWidth: "840px" }}>
            <section style={{ marginBottom: "3rem" }}>
                <h1>About</h1>
                <p style={{
                    fontSize: "1.125rem",
                    color: "#999",
                    marginBottom: "2.5rem",
                    marginTop: "1rem",
                    fontWeight: 500
                }}>
                    {cv.headline || "Software Engineer"}
                </p>

                {publicVersion && (
                    <a
                        href={`/api/cv/${publicVersion.id}/export`}
                        download
                        className="btn"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.625rem"
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download CV
                    </a>
                )}
            </section>

            <section style={{ marginBottom: "3rem" }}>
                <h2 style={{ marginBottom: "2rem" }}>Experience & education</h2>

                <div className="timeline">
                    {timeline.map((item, i) => (
                        <div key={i} style={{
                            borderLeft: "2px solid var(--accent)",
                            paddingLeft: "2rem",
                            marginBottom: "2rem",
                            position: "relative"
                        }}>
                            <div style={{
                                position: "absolute",
                                left: "-7px",
                                top: "0",
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                background: "var(--accent)",
                                boxShadow: "0 0 0 3px var(--background)"
                            }} />
                            <span style={{
                                color: "var(--accent)",
                                fontWeight: 700,
                                fontSize: "0.8125rem",
                                letterSpacing: "0.05em",
                                textTransform: "uppercase"
                            }}>
                                {item.year}
                            </span>
                            <h3 style={{
                                fontSize: "1.125rem",
                                margin: "0.375rem 0",
                                fontWeight: 600
                            }}>
                                {item.title}
                            </h3>
                            <p style={{
                                color: "#777",
                                fontSize: "0.9375rem",
                                marginBottom: "0.625rem",
                                fontWeight: 500
                            }}>
                                {item.org}
                            </p>
                            <p style={{ color: "#999", lineHeight: 1.6 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {cv.skills.length > 0 && (
                <section>
                    <h2 style={{ marginBottom: "2rem" }}>Tech stack</h2>
                    <SkillTags skills={cv.skills} />
                </section>
            )}
        </main>
    );
}
