import type React from "react";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "FutureThought - Because genius deserves to rest",
  description: "Let Lumina do the thinking for you.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
