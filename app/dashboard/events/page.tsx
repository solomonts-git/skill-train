"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTrash3, BsPencilSquare } from "react-icons/bs";
import { GiRead } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import dateFormater from "@/app/utils/dateFormatter";

const Events = () => {
  const [data, setData] = useState([]);

  const handleDelete = async (id: string) => {
    await fetch("/api/events", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      cache: "no-store",
    });
    toast.info("Record Deleted Successfuly");
  };
  async function fetchEventsData() {
    try {
      const res = await fetch("/api/events/", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch partner data");
      }

      const events = await res.json();
      setData(events);
      //console.log(events);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchEventsData();
    //console.log("Data", data);
  }, []);

  return (
    <section className="w-full h-screen flex flex-col justify-start pt-5 items-start">
      <div className="my-4 ml-3">
        <Link
          href="/dashboard/events/add-event"
          className="bg-blue-400 p-4 rounded-md font-mono text-white text-xl mb-4 ml-2"
        >
          Add Event
        </Link>
      </div>
      <div className="mt-4 w-[95%] mx-3 overflow-x-auto">
        {data.length ? (
          <table className="table-auto border-spacing-y-3">
            <thead>
              <tr>
                <th>Id</th>
                <th>Event Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Address</th>
                <th>Organizer</th>
                <th>Event Type</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dt: EventT) => (
                <tr key={dt._id}>
                  <td>{dt._id.slice(0, 4)}</td>
                  <td>{dt.eventname}</td>
                  <td>{dateFormater(dt.startdate)}</td>
                  <td>{dateFormater(dt.enddate)}</td>
                  <td>{dt.address}</td>
                  <td>
                    {JSON.parse(JSON.stringify(dt.organizer)).organizationname}
                  </td>
                  <td>Job Fair</td>
                  <td className="flex border-0">
                    <Link
                      href={`/dashboard/events/read/${dt._id}`}
                      title="Read detail"
                      className="text-blue-400 p-3 rounded-md text-2xl cursor-pointer m-1"
                    >
                      <GiRead />
                    </Link>
                    <Link
                      title="Edit"
                      href={`/dashboard/events/edit-event/${dt._id}`}
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
          <p>No data found</p>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Events;
