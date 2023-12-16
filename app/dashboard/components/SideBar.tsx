"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const SideBar = () => {
  const { data: session } = useSession();

  return (
    <div className="w-1/5 min-h-screen dark:bg-slate-950 bg-slate-200 border-b-2 border-slate-900 hidden sm:flex flex-col justify-start items-center pt-10">
      <Link
        href="/dashboard"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Dashboard
      </Link>
      <Link
        href="/dashboard/training"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Training
      </Link>
      <Link
        href="/dashboard/trainee"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Trainee
      </Link>

      <Link
        href="/dashboard/trainer"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Trainer
      </Link>
      <Link
        href="/dashboard/partners"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Partners
      </Link>
      <Link
        href="/dashboard/events"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Events
      </Link>
      {session?.user?.role == "admin" && (
        <Link
          href="/dashboard/users"
          className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
        >
          Users
        </Link>
      )}
      {session?.user?.role == "admin" && (
        <Link
          href="/dashboard/backups"
          className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
        >
          Backups
        </Link>
      )}
    </div>
  );
};

export default SideBar;
