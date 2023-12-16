import Link from "next/link";
import React from "react";
import { GiCancel } from "react-icons/gi";

type stateType = {
  isOpen: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu = ({ isOpen, setIsOpened }: stateType) => {
  return (
    <div
      id="mobilemenu"
      className="w-full  h-full dark:bg-slate-950 bg-slate-100 border-b-2 border-slate-900 sm:hidden flex flex-col justify-start items-center pt-10 absolute top-0 z-50"
    >
      <div className="z-50 w-full flex justify-start h-10 border-b-2 border-b-slate-900">
        <span
          className="cursor-pointer dark:text-slate-100 text-2xl ml-4 pl-4"
          onClick={() => {
            setIsOpened(!isOpen);
          }}
        >
          <GiCancel />
        </span>
      </div>
      <Link
        onClick={() => setIsOpened(!isOpen)}
        href="/"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Home
      </Link>
      <Link
        onClick={() => setIsOpened(!isOpen)}
        href="/training"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Training
      </Link>
      <Link
        onClick={() => setIsOpened(!isOpen)}
        href="/trainee"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Trainee
      </Link>

      <Link
        onClick={() => setIsOpened(!isOpen)}
        href="/trainer"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Trainer
      </Link>
      <Link
        onClick={() => setIsOpened(!isOpen)}
        href="/partners"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        partners
      </Link>
      <Link
        onClick={() => setIsOpened(!isOpen)}
        href="/events"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Events
      </Link>
      <Link
        onClick={() => setIsOpened(!isOpen)}
        href="/login"
        className="w-4/5 py-2 bg-slate-950 hover:bg-slate-900 mb-3 text-center rounded-md px-5 cursor-pointer"
      >
        Login
      </Link>
    </div>
  );
};

export default MobileMenu;
