import type { Metadata } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "SIFA Linkage",
  description: "Skill initiative for africa youth employability linkage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
