"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsTrash3, BsPencilSquare } from "react-icons/bs";
import { GiRead } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Training = () => {
  // Fetch training data

  const [data, setData] = useState([]);

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/training", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
        cache: "no-store",
      });
      toast.success("Record Deleted Successfuly");
    } catch (error) {
      toast.error("Error Deleteing data");
    }
  };
  async function fetchTrainingData() {
    try {
      const res = await fetch("/api/training/", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch training data");
      }

      const trainings = await res.json();
      setData(trainings);
      console.log(trainings);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchTrainingData();
    console.log("Data", data);
  }, []);
  return (
    <section className="w-full min-h-screen flex flex-col justify-start pt-5 items-start">
      <div className="my-4 ml-3">
        <Link
          href="/dashboard/training/add-training"
          className="bg-blue-400 p-4 rounded-md font-mono text-white text-xl mb-4 ml-2"
        >
          Add Training
        </Link>
      </div>
      <div className="mt-4 w-[95%] mx-3 overflow-auto h-80">
        {data.length ? (
          <table className="table-auto border-spacing-y-3">
            <thead>
              <tr>
                <th>Id</th>
                <th>Training Name</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((d: Trianing) => (
                <tr key={d._id}>
                  <td>{d._id}</td>
                  <td>{d.trainingname}</td>
                  <td className="flex border-0">
                    <Link
                      href={`/dashboard/training/read-training/${d._id}`}
                      title="Read detail"
                      className="text-blue-400 p-3 rounded-md text-2xl cursor-pointer m-1"
                    >
                      <GiRead />
                    </Link>
                    <Link
                      title="Edit"
                      href={`/dashboard/training/edit-training/${d._id}`}
                      className="text-yellow-500 p-3 rounded-md text-2xl cursor-pointer m-2"
                    >
                      <BsPencilSquare />
                    </Link>
                    <button
                      title="Delete Info"
                      onClick={() => handleDelete(d._id)}
                      className="text-red-700 p-3 rounded-md text-2xl cursor-pointer m-1"
                    >
                      <BsTrash3 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="font-semibold font-mono text-2xl">
            There is no registered Training data
          </p>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Training;
