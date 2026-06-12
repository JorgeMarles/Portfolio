import { cookies } from "next/headers";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import type { Dictionary } from "./dictionaries/en";

export type Locale = "en" | "es";

const dictionaries: Record<Locale, Dictionary> = { en, es };

export const COOKIE_NAME = "locale";
export const DEFAULT_LOCALE: Locale = "en";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (value === "en" || value === "es") return value;
  return DEFAULT_LOCALE;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
