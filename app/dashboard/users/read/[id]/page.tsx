"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReadUser = ({ params }: { params: { id: string } }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState("");

  const [photo, setPhoto] = useState("");
  const [id, setID] = useState("");
  // const [training, setTraining] = useState({});
  async function fetchTrainingData(id: string) {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch User data");
      }
      const user: User = await res.json();
      console.log("User", user);

      setFirstName(user?.firstname);
      setLastName(user?.lastname);
      setEmail(user?.email);
      setRole(user?.role);
      setIsActive(user?.isactive);
      setID(user._id);
      setPhoto(user?.photo);
      // setTraining(training);
      // console.log("training", training);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTrainingData(params.id);
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <div className="flex flex-col justify-start items-start m-10 p-10">
        <h1 className="font-mono text-2xl font-semibold py-3">
          User <span className="italic">{firstName + " " + lastName}</span>{" "}
          Detail
        </h1>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">User Idenfification:</span>
          <span className="block font-thin pl-5">{id}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">User Role:</span>
          <span className="block font-thin pl-5">{role}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">User Email:</span>
          <span className="block font-thin pl-5">{email}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">User Status</span>
          <span className="block font-thin pl-5">
            {isActive ? "Active" : "InActive"}
          </span>
        </p>
        <Image
          src={`/${photo}`}
          alt={firstName}
          width={300}
          height={200}
          className="shadow-sm shadow-slate-200 hover:scale-110 mt-3"
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default ReadUser;
