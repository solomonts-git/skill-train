import Image from "next/image";

import train from "@/public/images/train.png";
import connect from "@/public/images/connect.png";
import develop from "@/public/images/develop.jpeg";
import empower from "@/public/images/empower.png";

import hawassalogo from "@/public/images/hawassalogo.jpeg";
import infolinklogo from "@/public/images/infolinklogo.jpeg";
import polytechniclogo from "@/public/images/polytechniclogo.jpeg";
import childrenorg from "@/public/images/childrenorg.jpeg";
import selamlogo from "@/public/images/selamlogo.jpeg";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex  min-h-screen flex-col items-center w-full justify-between py-4 px-4 md:px-24">
        <div className="z-10 mt-4 h-[500px] w-full text-black">
          <Slider />
          {/* <Image src={herosection} alt="hero" /> */}
        </div>
        {/* Works to be performed */}
        <div className="flex my-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex flex-col h-60 hover:scale-105 shadow-slate-200 dark:shadow-gray-950 shadow-md rounded-md overflow-hidden">
              <Image src={train} alt="Train" className="h-3/4" />
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-mono font-bold hover:scale-110 ease-linear pt-3">
                  Training
                </h1>
                {/* <p className="px-2">Training youth's</p> */}
              </div>
            </div>
            <div className="flex flex-col h-60 hover:scale-105 shadow-slate-200 dark:shadow-gray-950 shadow-md rounded-md overflow-hidden">
              <Image src={connect} alt="Train" className="h-3/4" />
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-mono font-bold hover:scale-110 ease-linear pt-3">
                  Connect
                </h1>
                {/* <p className="px-2">creating Employee with Employer</p> */}
              </div>
            </div>
            <div className="flex flex-col h-60 hover:scale-105 shadow-slate-200 dark:shadow-gray-950 shadow-md rounded-md overflow-hidden">
              <Image src={empower} alt="Train" className="h-3/4" />
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-mono font-bold hover:scale-110 ease-linear pt-3">
                  Empower
                </h1>
                {/* <p className="px-2">Giving new skills for disadvantged group</p> */}
              </div>
            </div>
            <div className="flex flex-col h-60 hover:scale-105 shadow-slate-200 dark:shadow-gray-950 shadow-md rounded-md overflow-hidden">
              <Image src={develop} alt="Train" className="h-3/4" />
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-mono font-bold hover:scale-110 ease-linear pt-3">
                  Develop
                </h1>
                {/* <p className="px-2">trining youth's</p> */}
              </div>
            </div>
          </div>
        </div>
        {/* end of works to be performed */}

        {/* In collaboration with */}
        <div className="hidden md:flex flex-col items-center justify-center w-full my-12">
          <h1 className="font-semibold font-mono text-5xl dark:text-slate-100 text-slate-900">
            In Collaboration with
          </h1>
          <div className="flex justify-around pt-5 w-full ">
            <Image
              className="w-60 h-20 mx-3 rounded-lg"
              src={hawassalogo}
              alt="Hawassa University"
            />
            <Image
              className="w-60 h-20 mx-3 rounded-lg"
              src={infolinklogo}
              alt="Infolink University college"
            />
            <Image className="w-80 h-20" src={selamlogo} alt="Selam Logo" />
            <Image
              className="w-60 h-20 mx-3 rounded-lg"
              src={childrenorg}
              alt="Tabor Hawassa children organization"
            />
            <Image
              className="w-60 h-20 mx-3 rounded-lg"
              src={polytechniclogo}
              alt="polytechnic  University"
            />
          </div>
        </div>
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 my-10">
          <div className="w-full rounded-md overflow-hidden h-80 ease-in-out hover:scale-105 shadow-sm dark:shadow-slate-950 shadow-slate-200">
            <h1 className="px-4 text-2xl font-semibold">Mission</h1>
            <p className="px-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="w-full rounded-md overflow-hidden h-80 ease-in-out hover:scale-105 shadow-sm dark:shadow-slate-950 shadow-slate-200">
            <h1 className="px-4 text-2xl font-semibold">Vision</h1>
            <p className="px-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
