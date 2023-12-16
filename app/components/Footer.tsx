import React from "react";
import Image from "next/image";
import sifalogo from "@/public/images/sifalogo.png";
import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex flex-col border-t-2 dark:border-slate-100 border-slate-900">
      <div className="grid gird-cols-1 md:grid-cols-3 w-full">
        <div className="w-full flex flex-col justify-center items-center h-80">
          <Image src={sifalogo} alt="Logo image" width={250} height={200} />
          <div className="mt-4 px-5">
            <p className="font-serif text-justify px-4">
              SIFA is an initiative of the African Union Commission (AUC)
              supported by the German Government to strengthen occupational
              prospects of young people in Africa.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center h-80">
          <ul>
            <li className="py-1  cursor-pointer  hover:opacity-50">
              <Link href="/">Home</Link>
            </li>
            <li className="py-1  cursor-pointer  hover:opacity-50">
              <Link href="/trainer"> Trainer</Link>
            </li>
            <li className="py-1 cursor-pointer  hover:opacity-50">
              <Link href="/trainee">Trainee</Link>
            </li>
            <li className="py-1  cursor-pointer  hover:opacity-50">
              <Link href="/partners">Partner</Link>
            </li>
            <li className="py-1 cursor-pointer  hover:opacity-50">
              <Link href="/events"> Events</Link>
            </li>
          </ul>
        </div>
        <div className="w-full h-80 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-serif  font-semibold">
            Connect with us
          </h1>
          <div className="flex gap-5 mt-5">
            <Link
              href="https://www.facebook.com/solomonts2023"
              className="text-xl hover:scale-110 hover:text-slate-200"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://twitter.com/solomontseth"
              className="text-xl hover:scale-110 hover:text-slate-200"
            >
              <FaXTwitter />
            </Link>
            <Link
              href="https://www.linkedin.com/in/solomon-tsegaye-8619a9a1/"
              className="text-xl hover:scale-110 hover:text-slate-200"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t-2 dark:border-slate-950 border-slate-200 flex justify-center">
        <p className="py-4">&copy; 2023 sifa-linkage. All rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
