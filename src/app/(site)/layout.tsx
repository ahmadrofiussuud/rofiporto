import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MARS | Portfolio",
  description: "Personal portfolio of MARS - Journey, Projects, and Competitions.",
};

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeDebug } from "@/components/ThemeDebug";
import { PlasmaBackground } from "@/components/ui/plasma-background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PlasmaBackground />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ThemeDebug />
        </ThemeProvider>
      </body>
    </html>
  );
}
