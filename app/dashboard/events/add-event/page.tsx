"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [partners, setPartners] = useState([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const getAffiliation = async () => {
    try {
      const res = await fetch("/api/partners", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to Fetch Event");
      }

      const data = await res.json();
      setPartners(data);
    } catch (error) {
      throw new Error("Failed to fetch Event");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!photo) {
      toast.info("Event Photo required");
      return;
    }

    const data = new FormData();
    data.set("eventname", eventName);
    data.set("startdate", startDate);
    data.set("enddate", endDate);
    data.set("address", address);
    data.set("organizer", organizer);
    data.set("eventtype", eventType);
    data.set("description", description);
    data.set("photo", photo);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setEventName("");
        setStartDate("");
        setEndDate("");
        setOrganizer("");
        setAddress("");
        setDescription("");
        toast.success("Event Registered successfuly");
      }
    } catch (e) {
      toast.error("Failed to Register Events");
    }
  };

  useEffect(() => {
    getAffiliation();
  }, []);
  return (
    <section className="w-full min-h-4/5 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex  flex-col justify-center items-start py-5"
      >
        <h1 className="my-4 text-center font-mono font-semibold text-3xl ">
          Event Registration
        </h1>
        <div className="w-full  flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Event Name"
          />
          <input
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>

        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <p className="w-full md:mr-4">
            Start Date
            <input
              className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="start Date"
            />
          </p>
          <p className="w-full">
            End Date
            <input
              className="p-5 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
          </p>
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <select
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          >
            <option>Select Organizer Organization</option>
            {partners.map((p: Partner) => (
              <option key={p._id} value={p._id}>
                {p.organizationname}
              </option>
            ))}
          </select>
          <select
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Select Event Type</option>
            <option value="Job Fair">Job Fair</option>
            <option value="Trainee Selection">Trianee Selection</option>
          </select>
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <h1 className="w-full block font-semibold font-mono text-xl">
            Event Photo
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter  Discription of trainer"
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

export default AddEvent;
