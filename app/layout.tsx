import type { Metadata } from "next";
import { AuthProvider } from "./Provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Skill Train SIFA Linkage",
  description: "Skill initiative for africa youth employability linkage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative flex flex-col  bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-slate-100 min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
