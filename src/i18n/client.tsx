"use client";

import { createContext, useContext, useTransition } from "react";
import type { Dictionary } from "./dictionaries/en";
import type { Locale } from "./index";

type I18nContextValue = {
  locale: Locale;
  t: Dictionary;
  switchLocale: (locale: Locale) => void;
  isPending: boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
};

export function I18nProvider({ locale, dictionary, children }: I18nProviderProps) {
  const [isPending, startTransition] = useTransition();

  function switchLocale(newLocale: Locale) {
    startTransition(async () => {
      document.cookie = `locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
      window.location.reload();
    });
  }

  return (
    <I18nContext value={{ locale, t: dictionary, switchLocale, isPending }}>
      {children}
    </I18nContext>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
