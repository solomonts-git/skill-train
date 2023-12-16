"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
type Trainings = {
  _id: string;
  trainingname: string;
  imagePath: string;
  description: string;
};
const Training = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await fetch("/api/training", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const trainings = await res.json();
        setData(trainings);
      } catch (error) {
        throw new Error("Error");
      }
    };

    fetchTrainings();
  }, []);
  return (
    <div className="flex flex-col justify-center  px-4 md:px-24 py-4">
      <div className="flex justify-start p-4 my-4">
        <p className="font-mono w-3/4 text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas ex quia
          animi, ad a reprehenderit impedit tempore inventore odio iure eum
          aliquid sit adipisci, repudiandae debitis doloremque minus ipsum sed?
        </p>
      </div>
      <div className="w-full py-10 ">
        <p className="text-3xl font-mono font-bold">Available Trainings</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
        {data.length ? (
          data.map((dt: Trainings) => (
            <div
              key={dt._id}
              className="flex flex-col items-start justify-center overflow-hidden rounded-md shadow-md dark:shadow-slate-950 shadow-slate-200"
            >
              <Image
                src={`/${dt.imagePath}`}
                alt="cusine "
                width={300}
                height={400}
                className="w-full h-80 object-cover"
              />
              <h3 className="font-mono font-semibold text-2xl py-3 px-4">
                {dt.trainingname}
              </h3>
              <p className="font-mono px-4">
                {dt.description.slice(0, 200) + "..."}
              </p>
              <Link
                href={`/training/${dt._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 m-3 rounded-md text-center"
              >
                Read more ...
              </Link>
            </div>
          ))
        ) : (
          <p>Trainings data Loading ...</p>
        )}
      </div>
    </div>
  );
};

export default Training;
