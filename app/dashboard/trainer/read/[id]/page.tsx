"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GiFirstAidKit } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReadTrainer = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [exprience, setExprience] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [biodesc, setBioDesc] = useState("");
  //   const [partners, setPartners] = useState([]);

  // const [training, setTraining] = useState({});
  async function fetchTrainerData(id: string) {
    try {
      const res = await fetch(`/api/trainer/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Trainer data");
      }
      const trainer = await res.json();
      setTitle(trainer.title);
      setFirstName(trainer.firstname);
      setLastName(trainer.lastname);
      setEmail(trainer.email);
      setSpecialization(trainer.specialization);
      setExprience(trainer.exprience);
      setAffiliation(trainer.affiliation);
      setPhoto(trainer.photo);
      setBioDesc(trainer.biodesc);
      setGender(trainer.gender);

      // setTrainerData(trainer);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTrainerData(params.id);
    // const { imagePath, trainingname, description, _id } = training;
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <div className="flex flex-col justify-start items-start m-10 p-10">
        <h1 className="font-mono text-2xl font-semibold py-3">
          Trainer Name
          <span className="italic">
            {title + " " + firstName + " " + lastName}
          </span>{" "}
          Detail
        </h1>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Trianer Idenfification:
          </span>
          <span className="block font-thin pl-5">{params.id}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainer Name:</span>
          <span className="block font-thin pl-5">
            {title + " " + firstName + " " + lastName}
          </span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainer Affiliation:</span>
          <span className="block font-thin pl-5">{affiliation}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Trainer Speciliation:
          </span>
          <span className="block font-thin pl-5">{specialization}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainer experience:</span>
          <span className="block font-thin pl-5">{exprience + " Years"}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainer email:</span>
          <span className="block font-thin pl-5">{email}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trainer gender:</span>
          <span className="block font-thin pl-5">{gender}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Trainer Biography Description:
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

export default ReadTrainer;
