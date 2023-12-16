import type { Metadata } from "next";
import { Suspense } from "react";
import "../globals.css";
import DashboardHeader from "./components/DashboardHeader";
import SideBar from "./components/SideBar";
import DashboardFooter from "./components/DashboardFooter";
import MobileMenu from "./components/MobileMenu";

export const metadata: Metadata = {
  title: "SIFA Linkage",
  description: "Skill initiative for africa youth employability linkage",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [isOpen,setIsOpened] = useState(false)
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <DashboardHeader />
      <div className="flex min-h-4/5 w-full">
        <SideBar />
        <div className="w-4/5">
          <Suspense fallback={<p>Loading Data...</p>}>{children}</Suspense>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}
