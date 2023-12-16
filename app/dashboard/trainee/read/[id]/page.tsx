"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GiFirstAidKit } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReadTrainee = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [startYear, setStartYear] = useState("");
  const [trainerorg, setTrianerOrg] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [biodesc, setBioDesc] = useState("");
  //   const [partners, setPartners] = useState([]);

  // const [training, setTraining] = useState({});
  async function fetchTraineeData(id: string) {
    try {
      const res = await fetch(`/api/trainee/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Trainer data");
      }
      const trainee = await res.json();
      setTitle(trainee.title);
      setFirstName(trainee.firstname);
      setLastName(trainee.lastname);
      setEmail(trainee.email);
      setStatus(trainee.specialization);
      setStartYear(trainee.exprience);
      setTrianerOrg(trainee.affiliation);
      setPhoto(trainee.photo);
      setBioDesc(trainee.biodesc);
      setGender(trainee.gender);

      // setTrainerData(trainer);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTraineeData(params.id);
    // const { imagePath, trainingname, description, _id } = training;
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <div className="flex flex-col justify-start items-start m-10 p-10">
        <h1 className="font-mono text-2xl font-semibold py-3">
          Trainee Name
          <span className="italic">
            {title + " " + firstName + " " + lastName}
          </span>{" "}
          Detail
        </h1>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Trianee Idenfification:
          </span>
          <span className="block font-thin pl-5">{params.id}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainee Name:</span>
          <span className="block font-thin pl-5">
            {title + " " + firstName + " " + lastName}
          </span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Trainer Orgainization:
          </span>
          <span className="block font-thin pl-5">{trainerorg}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainer Status:</span>
          <span className="block font-thin pl-5">{status}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainee Start:</span>
          <span className="block font-thin pl-5">{"since" + startYear}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainee email:</span>
          <span className="block font-thin pl-5">{email}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainee gender:</span>
          <span className="block font-thin pl-5">{gender}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Trainee Biography Description:
          </span>
          <span className="block font-thin pl-5">{biodesc}</span>
        </p>
        <Image
          src={`/${photo}`}
          alt={firstName + "" + lastName}
          width={300}
          height={200}
          className="shadow-sm shadow-slate-200 hover:scale-110 mt-3"
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default ReadTrainee;
