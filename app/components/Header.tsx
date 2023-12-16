"use client";
import React, { useState } from "react";
import Image from "next/image";

import sifalogo from "@/public/images/sifalogo.png";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isOpen, setIsOpened] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between w-full border-b-4 border-gray-200">
        <div className="flex justify-center items-center p-5">
          <Image src={sifalogo} alt="sifa-logo" width={200} height={150} />
        </div>
        <ul className="hidden sm:flex px-5 me-20  justify-end">
          <li className="p-5 cursor-pointer  hover:text-gray-300 rounded-md">
            <Link href="/">Home</Link>
          </li>
          <li className="p-5 cursor-pointer  hover:text-gray-300 rounded-md">
            <Link href="/training"> Training</Link>
          </li>
          <li className="p-5 cursor-pointer  hover:text-gray-300 rounded-md">
            <Link href="/trainer"> Trainer</Link>
          </li>
          <li className="p-5 cursor-pointer  hover:text-gray-300 rounded-md">
            <Link href="/trainee">Trainee</Link>
          </li>
          <li className="p-5 cursor-pointer  hover:text-gray-300 rounded-md">
            <Link href="/partners">Partners</Link>
          </li>
          <li className="p-5  cursor-pointer  hover:text-gray-300 rounded-md">
            <Link href="/events"> Events</Link>
          </li>
          <li className="p-5 cursor-pointer  hover:text-gray-300 rounded-md">
            <Link href="/login">Login</Link>
          </li>
        </ul>
        <div className="flex sm:hidden mr-5">
          <span className="text-2xl m-2" onClick={() => setIsOpened(!isOpen)}>
            <FaBars />
          </span>
        </div>
      </div>
      {isOpen && <MobileMenu isOpen={isOpen} setIsOpened={setIsOpened} />}
    </>
  );
};

export default Header;
