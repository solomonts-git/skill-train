"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTrash3, BsPencilSquare } from "react-icons/bs";
import { GiRead } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trainee = () => {
  const [data, setData] = useState([]);

  const handleDelete = async (id: string) => {
    await fetch("/api/trainee", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      cache: "no-store",
    });
    toast.info("Record Deleted Successfuly");
  };
  async function fetchTraineesData() {
    try {
      const res = await fetch("/api/trainee/", {
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
    fetchTraineesData();
    console.log("Data", data);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-start pt-5 items-start">
      <div className="my-4 ml-3">
        <Link
          href="/dashboard/trainee/add-trainee"
          className="bg-blue-400 p-4 rounded-md font-mono text-white text-xl mb-4 ml-2"
        >
          Add Trainee
        </Link>
      </div>
      <div className="mt-4 w-[95%] mx-3 overflow-x-auto">
        <table className="table-auto border-spacing-y-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>First Name</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Training name</th>
              <th>Trainer Organization</th>
              <th>Year</th>
              <th>Status</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt: TraineeT) => (
              <tr key={dt._id}>
                <td>{dt._id}</td>
                <td>{dt.title}</td>
                <td>{dt.firstname}</td>
                <td>{dt.lastname}</td>
                <td>{dt.gender}</td>
                <td>{dt.email}</td>
                <td>
                  {JSON.parse(JSON.stringify(dt.trainingname)).trainingname}
                </td>
                <td>
                  {JSON.parse(JSON.stringify(dt.trainerorg)).organizationname}
                </td>
                <td>{dt.year}</td>
                <td>{dt.status}</td>
                <td className="flex border-0">
                  <Link
                    href={`/dashboard/trainee/read/${dt._id}`}
                    title="Read detail"
                    className="text-blue-400 p-3 rounded-md text-2xl cursor-pointer m-1"
                  >
                    <GiRead />
                  </Link>
                  <Link
                    title="Edit"
                    href={`/dashboard/trainee/edit-trainee/${dt._id}`}
                    className="text-yellow-500 p-3 rounded-md text-2xl cursor-pointer m-2"
                  >
                    <BsPencilSquare />
                  </Link>
                  <Link
                    title="Delete Info"
                    href="#"
                    onClick={() => handleDelete(dt._id)}
                    className="text-red-700 p-3 rounded-md text-2xl cursor-pointer m-1"
                  >
                    <BsTrash3 />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Trainee;
