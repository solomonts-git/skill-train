"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
const Events = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events", {
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

    fetchEvents();
  }, []);
  return (
    <div className="flex flex-col justify-center  px-4 md:px-24 py-4">
      <div className="w-full py-10 ">
        <p className="text-3xl font-mono font-bold">Events</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
        {data.length ? (
          data.map((dt: EventT) => (
            <div
              key={dt._id}
              className="flex flex-col items-start justify-center overflow-hidden rounded-md shadow-md dark:shadow-slate-950 shadow-slate-200"
            >
              <Image
                src={`/${dt.photo}`}
                alt={dt.eventname}
                width={300}
                height={400}
                className="w-full h-80 object-cover"
              />
              <h3 className="font-mono font-semibold text-xl py-3">
                {dt.eventname}
              </h3>
              <p className="font-mono">
                {dt.description.slice(0, 200) + " ..."}
              </p>
              <Link
                href={`/events/${dt._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 m-3 rounded-md text-center"
              >
                Read more ...
              </Link>
            </div>
          ))
        ) : (
          <p>No Event data found</p>
        )}
      </div>
    </div>
  );
};

export default Events;
