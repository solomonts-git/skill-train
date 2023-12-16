"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Trainees = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTrainee = async () => {
      try {
        const res = await fetch("/api/trainee", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const trainee = await res.json();
        setData(trainee);
      } catch (error) {
        throw new Error("Error");
      }
    };

    fetchTrainee();
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
        <p className="text-3xl font-mono font-bold">Graduated Trainee</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
        {data.length ? (
          data.map((dt: TraineeT) => (
            <div className="flex flex-col items-start justify-center overflow-hidden rounded-md shadow-md dark:shadow-slate-950 shadow-slate-200">
              <Image
                src={`/${dt.photo}`}
                alt={dt.firstname}
                width={300}
                height={400}
                className="w-full h-80 object-cover"
              />
              <h3 className="font-mono font-semibold text-xl py-3">
                {dt.firstname + " " + dt.lastname}
              </h3>
              <p className="font-mono">{dt.biodesc.slice(0, 100) + " ..."}</p>
              <Link
                href={`/trainee/${dt._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 m-3 rounded-md text-center"
              >
                Read more ...
              </Link>
            </div>
          ))
        ) : (
          <p>Loading Training data ...</p>
        )}
      </div>
    </div>
  );
};

export default Trainees;
