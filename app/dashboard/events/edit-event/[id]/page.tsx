"use client";
import React, { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormater from "@/app/utils/dateFormatter";

const EditEvent = ({ params }: { params: { id: string } }) => {
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [partners, setPartners] = useState([]);

  async function fetchEventData(id: string) {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch partner data");
      }
      const event = await res.json();
      //console.log("Event ....", event);

      setEventName(event.eventname);
      setEventType(event.eventtype);
      setOrganizer(event.organizer);
      setDescription(event.description);
      setStartDate(dateFormater(event.startdate));
      setEndDate(dateFormater(event.enddate));
      setAddress(event.address);
      // console.log(trainings);
    } catch (error) {
      console.error(error);
    }
  }
  const getAffiliation = async () => {
    try {
      const res = await fetch("/api/partners", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to Fetch Trainier Organization");
      }

      const data = await res.json();
      setPartners(data);
    } catch (error) {
      throw new Error("Failed to fetch Trainer Organization");
    }
  };
  useEffect(() => {
    fetchEventData(params.id);
    getAffiliation();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
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
    data.set("photo", file);
    data.set("description", description);
    data.set("id", params.id);
    try {
      const res = await fetch(`/api/events/${params.id}`, {
        method: "PUT",
        body: data,
      });
      if (!res.ok) {
        toast.error("Error");
      }
      if (res.ok) {
        // console.log("res", res);
        setEventName("");
        setStartDate("");
        setEndDate("");
        setOrganizer("");
        setAddress("");
        setDescription("");
        toast.success("Event Updated successfuly");
      }
    } catch (e) {
      toast.error("Failed to Update Events");
    }
  };
  useEffect(() => {
    getAffiliation();
    fetchEventData(params.id);
  }, []);
  return (
    <section className="w-full min-h-4/5 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex  flex-col justify-center items-start py-5"
      >
        <h1 className="my-4 text-center font-mono font-semibold text-3xl ">
          Edit Event
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
            <option>Select Event Type</option>
            <option>Job Fair</option>
            <option>Exprience Exchange</option>
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
          value="Update"
        />
      </form>
      <ToastContainer />
    </section>
  );
};

export default EditEvent;
