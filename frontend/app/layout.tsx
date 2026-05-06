import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EngineerMind AI — Engineering Intelligence Platform",
  description: "AI-powered insights for software teams. Understand codebases, review PRs, predict risks, and search organizational knowledge with enterprise-grade ML.",
  keywords: ["engineering intelligence", "AI code review", "sprint risk prediction", "developer productivity", "RAG search"],
  authors: [{ name: "EngineerMind AI" }],
  openGraph: {
    title: "EngineerMind AI",
    description: "Engineering Intelligence Platform for world-class software teams",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EngineerMind AI",
    description: "Engineering Intelligence Platform",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
