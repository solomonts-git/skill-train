"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import MobileMenu from "./MobileMenu";
import sifalogo from "@/public/images/sifalogo.png";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
const DashboardHeader = () => {
  const [isOpen, setIsOpened] = useState(false);
  const [show, setShow] = useState(false);
  const { data: session } = useSession();
  //console.log("session", session);
  return (
    <>
      <div className="flex justify-between items-center w-full h-[100px]  bg-cyan-700">
        <div className="h-full pl-5 flex justify-center items-center">
          <Image src={sifalogo} alt="sifa-logo" width={200} height={150} />
        </div>
        <div className="h-full pr-5  flex justify-end items-center">
          <div className="mx-3 font-mono font-thin onClick relative">
            <span className="text-3xl" onClick={() => setShow(!show)}>
              <FaGear />
            </span>
            {show && (
              <div className="flex flex-col justify-center items-center absolute top-10 right-1 w-60 h-60 bg-blue-800">
                <Image
                  src={`/${session?.user?.photo}`}
                  alt={`/${session?.user?.firstname}`}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <span className="mx-3 font-mono font-thin  my-3">
                  {session?.user?.firstname + " " + session?.user?.lastname}
                </span>
                <span
                  onClick={() => signOut()}
                  className="mx-3 font-mono font-thin cursor-pointer hover:bg-blue-900 p-4 my-3"
                >
                  Logout
                </span>
              </div>
            )}
          </div>
          <span
            className="flex sm:hidden cursor-pointer dark:text-slate-100"
            onClick={() => {
              setIsOpened(!isOpen);
              // console.log("state", isOpen);
            }}
          >
            <FaBars />
          </span>
        </div>
      </div>
      {isOpen && <MobileMenu isOpen={isOpen} setIsOpened={setIsOpened} />}
    </>
  );
};

export default DashboardHeader;
