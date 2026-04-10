import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { SITE_META } from "@/constants";
import { Bebas_Neue, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { InitialLoaderWrapper } from "@/components/shared/InitialLoaderWrapper";
import { Navbar } from "@/components/shared/Navbar";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: `${SITE_META.name} — ${SITE_META.title}`,
  description: `Portfolio of ${SITE_META.name}. ${SITE_META.tagline}. Full Stack Developer specializing in MERN stack, Next.js, and TypeScript.`,
  keywords: [
    "Gourab Dey",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "MERN",
    "Portfolio",
    "Kolkata",
  ],
  authors: [{ name: SITE_META.name }],
  openGraph: {
    title: `${SITE_META.name} — ${SITE_META.title}`,
    description: `Portfolio of ${SITE_META.name}. ${SITE_META.tagline}.`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_META.name} — ${SITE_META.title}`,
    description: `Portfolio of ${SITE_META.name}. ${SITE_META.tagline}.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head></head>
      <body>
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />
        <Providers>
          <InitialLoaderWrapper />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
