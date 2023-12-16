"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReadPartner = ({ params }: { params: { id: string } }) => {
  const [file, setFile] = useState<File | null>(null);
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setID] = useState("");
  const [orgType, setOrgType] = useState("");
  // const [training, setTraining] = useState({});
  async function fetchPartnerData(id: string) {
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch partner data");
      }
      const partner = await res.json();
      setFile(partner.org_logo);
      setOrgName(partner.organizationname);
      setOrgType(partner.org_type);
      setDescription(partner.description);
      setID(partner._id);

      // setTraining(training);
      // console.log("training", partner);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPartnerData(params.id);
    // const { imagePath, trainingname, description, _id } = training;
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <div className="flex flex-col justify-start items-start m-10 p-10">
        <h1 className="font-mono text-2xl font-semibold py-3">
          Partener <span className="italic">{orgName}</span> Detail
        </h1>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Partner Idenfification:{" "}
          </span>
          <span className="block font-thin pl-5">{id}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Partner Name:</span>
          <span className="block font-thin pl-5">{orgName}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Partner Organization Type:
          </span>
          <span className="block font-thin pl-5">{orgType}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Partner Description:</span>
          <span className="block font-thin pl-5">{description}</span>
        </p>
        <Image
          src={`/${file}`}
          alt={orgName}
          width={300}
          height={200}
          className="shadow-sm shadow-slate-200 hover:scale-110 mt-3"
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default ReadPartner;
