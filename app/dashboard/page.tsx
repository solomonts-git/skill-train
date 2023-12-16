"use client";
import React from "react";
import { useSession } from "next-auth/react";
export default async function Dashboard() {
  const { data: session } = useSession();
  return (
    <div className="w-full min-h-screen">
      <p className="text-2xl px-5 py-4">
        Welcome {session?.user?.firstname + " " + session?.user?.lastname}
      </p>
    </div>
  );
}
