"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Partners = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const partners = await res.json();
        setData(partners);
      } catch (error) {
        throw new Error("Error");
      }
    };

    fetchPartners();
  }, []);
  return (
    <div className="flex flex-col justify-center  px-4 md:px-24 py-4">
      <div className="w-full py-10 ">
        <p className="text-3xl font-mono font-bold">
          Trainer Partner Organization
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
        {data.length ? (
          data.map((dt: PartnerT) => (
            <div
              key={dt._id}
              className="flex flex-col items-start justify-center overflow-hidden rounded-md shadow-md dark:shadow-slate-950 shadow-slate-200"
            >
              <Image
                src={`/${dt.org_logo}`}
                alt={dt.organizationname}
                width={300}
                height={400}
                className="w-full h-80 object-cover"
              />
              <h3 className="font-mono font-semibold text-xl py-3">
                {dt.organizationname}
              </h3>
              <p className="font-mono">
                {dt.description.slice(0, 100) + " ..."}{" "}
              </p>
              <Link
                href={`/partners/${dt._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 m-3 rounded-md text-center"
              >
                Read more ...
              </Link>
            </div>
          ))
        ) : (
          <p>Loading Partner data</p>
        )}
      </div>
      <div className="w-full py-10 ">
        <p className="text-3xl font-mono font-bold">
          Employer Partner Organization
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
        {data.length ? (
          data.map((dt: PartnerT) => (
            <div
              key={dt._id}
              className="flex flex-col items-start justify-center overflow-hidden rounded-md shadow-md dark:shadow-slate-950 shadow-slate-200"
            >
              <Image
                src={`/${dt.org_logo}`}
                alt={dt.organizationname}
                width={300}
                height={400}
                className="w-full h-80 object-cover"
              />
              <h3 className="font-mono font-semibold text-xl py-3">
                {dt.organizationname}
              </h3>
              <p className="font-mono">
                {dt.description.slice(0, 100) + " ..."}{" "}
              </p>
              <Link
                href="/trainer/trainee-one"
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 m-3 rounded-md text-center"
              >
                Read more ...
              </Link>
            </div>
          ))
        ) : (
          <p>Loading Partner data</p>
        )}
      </div>
    </div>
  );
};

export default Partners;
