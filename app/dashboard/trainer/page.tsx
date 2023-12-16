"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTrash3, BsPencilSquare } from "react-icons/bs";
import { GiRead } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trainer = () => {
  const [data, setData] = useState([]);

  const handleDelete = async (id: string) => {
    await fetch("/api/trainer", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      cache: "no-store",
    });
    toast.info("Record Deleted Successfuly");
  };
  async function fetchTrainersData() {
    try {
      const res = await fetch("/api/trainer/", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch trainer data");
      }

      const trainers = await res.json();
      setData(trainers);
      console.log(trainers);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchTrainersData();
    console.log("Data", data);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-start pt-5 items-start">
      <div className="my-4 ml-3">
        <Link
          href="/dashboard/trainer/add-trainer"
          className="bg-blue-400 p-4 rounded-md font-mono text-white text-xl mb-4 ml-2"
        >
          Add Trainer
        </Link>
      </div>
      <div className="mt-4 w-[95%] mx-3 overflow-x-auto">
        {data.length ? (
          <table className="table-auto border-spacing-y-3">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>First Name</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Affiliation</th>
                <th>Gender</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              {data.map((trainer: TrainerT) => (
                <tr key={trainer._id}>
                  <td>{trainer._id.slice(0, 4)}</td>
                  <td>{trainer.title}</td>
                  <td>{trainer.firstname}</td>
                  <td>{trainer.lastname}</td>
                  <td>{trainer.email}</td>
                  <td>{trainer.specialization}</td>
                  <td>{trainer.exprience}</td>
                  <td>
                    {
                      JSON.parse(JSON.stringify(trainer.affiliation))
                        .organizationname
                    }
                  </td>
                  <td>{trainer.gender}</td>
                  <td className="flex border-0">
                    <Link
                      href={`/dashboard/trainer/read/${trainer._id}`}
                      title="Read detail"
                      className="text-blue-400 p-3 rounded-md text-2xl cursor-pointer m-1"
                    >
                      <GiRead />
                    </Link>
                    <Link
                      title="Edit"
                      href={`/dashboard/trainer/edit-trainer/${trainer._id}`}
                      className="text-yellow-500 p-3 rounded-md text-2xl cursor-pointer m-2"
                    >
                      <BsPencilSquare />
                    </Link>
                    <Link
                      title="Delete Info"
                      href="#"
                      onClick={() => handleDelete(trainer._id)}
                      className="text-red-700 p-3 rounded-md text-2xl cursor-pointer m-1"
                    >
                      <BsTrash3 />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="font-thin font-mono">No Trainer data Registered</p>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Trainer;
