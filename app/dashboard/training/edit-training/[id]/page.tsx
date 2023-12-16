"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTraining = ({ params }: { params: { id: string } }) => {
  const [file, setFile] = useState<File | null>(null);
  const [trainingName, setTrainingName] = useState("");
  const [description, setDescription] = useState("");

  async function fetchTrainingData(id: string) {
    try {
      const res = await fetch(`/api/training/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch training data");
      }
      const training = await res.json();
      console.log(training);

      setTrainingName(training.trainingname);
      setDescription(training.description);
      // console.log(trainings);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTrainingData(params.id);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Error uploading file");
      return;
    }
    const formData = new FormData();
    formData.set("file", file);
    formData.set("trainingname", trainingName);
    formData.set("description", description);
    formData.set("id", params.id);

    try {
      const res = await fetch(`/api/training/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        setDescription("");
        setFile(null);
        setTrainingName("");
        toast.success("Training Updated successfully");
      } else {
        toast.error("Failed to update Training");
      }
    } catch (error) {
      toast.error("Failed to update Training");
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex  flex-col justify-center items-start py-5"
      >
        <h1 className="my-4 text-center font-mono font-semibold text-3xl ">
          Edit Training Detail
        </h1>
        <div className="w-full  flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            name="trainingname"
            placeholder="Training Name"
            value={trainingName}
            onChange={(e) => setTrainingName(e.target.value)}
          />
        </div>

        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <h1 className="w-full block font-semibold font-mono text-xl">
            Training Photo
          </h1>
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <textarea
          className="p-5 my-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          cols={50}
          rows={5}
          name="trainingdesc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Bio Discription of trainer"
        />
        <input
          type="submit"
          className="p-5 my-5 w-full text-slate-950 focus:outline-none cursor-pointer bg-blue-400 hover:opacity-90 rounded-md font-mono font-semibold"
          value="Register"
        />
      </form>
      <ToastContainer />
    </section>
  );
};

export default EditTraining;
