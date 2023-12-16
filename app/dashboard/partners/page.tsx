"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTrash3, BsPencilSquare } from "react-icons/bs";
import { GiRead } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Partners = () => {
  const [data, setData] = useState([]);

  const handleDelete = async (id: string) => {
    await fetch("/api/partners", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      cache: "no-store",
    });
    toast.info("Record Deleted Successfuly");
  };
  async function fetchPartnerData() {
    try {
      const res = await fetch("/api/partners/", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch partner data");
      }

      const partners = await res.json();
      setData(partners);
      console.log(partners);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchPartnerData();
    //console.log("Data", data);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-start pt-5 items-start">
      <div className="my-4 ml-3">
        <Link
          href="/dashboard/partners/add-partner"
          className="bg-blue-400 p-4 rounded-md font-mono text-white text-xl mb-4 ml-2"
        >
          Add Partner
        </Link>
      </div>
      <div className="mt-4 w-[95%] mx-3 overflow-x-auto">
        {data.length ? (
          <table className="table-auto border-spacing-y-3">
            <thead>
              <tr>
                <th>Id</th>
                <th>Organization Name</th>
                <th>Organization Type</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dt: PartnerT) => (
                <tr key={dt._id}>
                  <td>{dt._id}</td>
                  <td>{dt.organizationname}</td>
                  <td>{dt.org_type}</td>
                  <td className="flex border-0">
                    <Link
                      href={`/dashboard/partners/read/${dt._id}`}
                      title="Read detail"
                      className="text-blue-400 p-3 rounded-md text-2xl cursor-pointer m-1"
                    >
                      <GiRead />
                    </Link>
                    <Link
                      title="Edit"
                      href={`/dashboard/partners/edit-partner/${dt._id}`}
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
        ) : (
          <p>No Partner Data Registered</p>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Partners;
