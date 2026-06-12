import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { I18nProvider } from "@/i18n/client";
import { getLocale, getDictionary } from "@/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jorge Marles | Software Engineer",
  description: "Portfolio showing backend projects, system architecture, and full stack solutions.",
  keywords: ["Backend Developer", "Full Stack", "Portfolio", "Node.js", "Go", "Spring", "Python", "Typescript", "Software Architecture"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider locale={locale} dictionary={dictionary}>
          <Header />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
