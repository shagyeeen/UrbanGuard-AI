import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ParticleBackground } from "@/components/visuals/ParticleBackground";
import { IntervalProvider } from "@/components/providers/IntervalProvider";
import { EmergencyOverlay } from "@/components/visuals/EmergencyOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "UrbanGuard AI | Urban Health Platform",
  description: "Next-gen infrastructure monitoring and anomaly detection.",
};

import { AIChatBot } from "@/components/ai/AIChatBot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans flex min-h-screen`}>
        <IntervalProvider>
          <ParticleBackground />
          <EmergencyOverlay />
          <Sidebar />
          <main className="flex-1 ml-64 p-8 relative min-h-screen">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
          <AIChatBot />
        </IntervalProvider>
      </body>
    </html>
  );
}
