"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTrash3, BsPencilSquare } from "react-icons/bs";
import { GiRead } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [data, setData] = useState([]);

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      toast.info("Record Deleted Successfuly");
    } catch (error) {}
  };

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch training data");
      }

      const users = await res.json();
      setData(users);
    } catch (error) {
      throw new Error("Failed to Fetch User data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <section className="w-full min-h-screen flex flex-col justify-start pt-5 items-start">
      <div className="my-4 ml-3">
        <Link
          href="/dashboard/users/add-user"
          className="bg-blue-400 p-4 rounded-md font-mono text-white text-xl mb-4 ml-2"
        >
          Add User
        </Link>
      </div>
      <div className="mt-4 w-[95%] mx-3 overflow-x-auto">
        {data.length ? (
          <table className="table-auto border-spacing-y-3">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>

                <th>Role</th>
                <th>isActive</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dt: User) => (
                <tr key={dt._id}>
                  <td>{dt._id.slice(0, 4)}</td>
                  <td>{dt.firstname}</td>
                  <td>{dt.lastname}</td>
                  <td>{dt.email}</td>
                  <td>{dt.role}</td>
                  <td>{dt.isactive}</td>
                  <td className="flex border-0">
                    <Link
                      href={`/dashboard/users/read/${dt._id}`}
                      title="Read detail"
                      className="text-blue-400 p-3 rounded-md text-2xl cursor-pointer m-1"
                    >
                      <GiRead />
                    </Link>
                    <Link
                      title="Edit"
                      href={`/dashboard/users/edit-user/${dt._id}`}
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
          <p className="font-mono text-xl">No user Record</p>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Users;
