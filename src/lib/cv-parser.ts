import { parse } from "yaml";

export interface ParsedCv {
  name: string;
  headline?: string;
  location?: string;
  email?: string;
  website?: string;
  socialNetworks: { network: string; username: string }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location?: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    area: string;
    degree: string;
    startDate: string;
    endDate: string;
    highlights: string[];
  }[];
  skills: { label: string; details: string }[];
  certifications: { name: string; date?: string; url?: string; highlights: string[] }[];
  languages: { label: string; details: string }[];
}

export function parseCvYaml(yamlContent: string): ParsedCv {
  const data = parse(yamlContent);
  const cv = data?.cv || {};

  return {
    name: cv.name || "Unknown",
    headline: cv.label || cv.headline,
    location: cv.location,
    email: cv.email,
    website: cv.website,
    socialNetworks: (cv.social_networks || []).map((sn: any) => ({
      network: sn.network || "",
      username: sn.username || "",
    })),
    experience: (cv.sections?.experience || []).map((exp: any) => ({
      company: exp.company || "",
      position: exp.position || "",
      startDate: exp.start_date || "",
      endDate: exp.end_date || "Present",
      location: exp.location,
      highlights: exp.highlights || [],
    })),
    education: (cv.sections?.education || []).map((edu: any) => ({
      institution: edu.institution || "",
      area: edu.area || "",
      degree: edu.degree || "",
      startDate: edu.start_date || "",
      endDate: edu.end_date || "",
      highlights: edu.highlights || [],
    })),
    skills: (cv.sections?.skills || []).map((skill: any) => ({
      label: skill.label || "",
      details: skill.details || "",
    })),
    certifications: (cv.sections?.certifications || []).map((cert: any) => ({
      name: cert.name || "",
      date: cert.date,
      url: cert.url,
      highlights: cert.highlights || [],
    })),
    languages: (cv.sections?.languages || []).map((lang: any) => ({
      label: lang.label || "",
      details: lang.details || "",
    })),
  };
}
