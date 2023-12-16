"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReadTraining = ({ params }: { params: { id: string } }) => {
  const [file, setFile] = useState<File | null>(null);
  const [trainingName, setTrainingName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setID] = useState("");
  // const [training, setTraining] = useState({});
  async function fetchTrainingData(id: string) {
    try {
      const res = await fetch(`/api/training/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch training data");
      }
      const training = await res.json();
      setFile(training.imagePath);
      setTrainingName(training.trainingname);
      setDescription(training.description);
      setID(training._id);

      // setTraining(training);
      console.log("training", training);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTrainingData(params.id);
    // const { imagePath, trainingname, description, _id } = training;
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <div className="flex flex-col justify-start items-start m-10 p-10">
        <h1 className="font-mono text-2xl font-semibold py-3">
          Training <span className="italic">{trainingName}</span> Detail
        </h1>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Training Idenfification:{" "}
          </span>
          <span className="block font-thin pl-5">{id}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Training Name:</span>
          <span className="block font-thin pl-5">{trainingName}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Trining Description:</span>
          <span className="block font-thin pl-5">{description}</span>
        </p>
        <Image
          src={`/${file}`}
          alt={trainingName}
          width={300}
          height={200}
          className="shadow-sm shadow-slate-200 hover:scale-110 mt-3"
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default ReadTraining;
