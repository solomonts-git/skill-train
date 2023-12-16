"use client";
import dateFormater from "@/app/utils/dateFormatter";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const ReadEvent = ({ params }: { params: { id: string } }) => {
  const [eventName, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  //   const [partners, setPartners] = useState([]);

  // const [training, setTraining] = useState({});
  async function fetchEventData(id: string) {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Trainer data");
      }
      const event = await res.json();
      setEventName(event.eventname);
      setEventType(event.eventtype);
      setOrganizer(event.organizer);
      setDescription(event.description);
      setStartDate(dateFormater(event.startdate));
      setEndDate(dateFormater(event.enddate));
      setAddress(event.address);
      setFile(event.photo);
      // setTrainerData(trainer);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchEventData(params.id);
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <div className="flex flex-col justify-start items-start m-10 p-10">
        <h1 className="font-mono text-2xl font-semibold py-3">
          Event Name
          <span className="italic">{eventName}</span> Detail
        </h1>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Event Idenfification:
          </span>
          <span className="block font-thin pl-5">{params.id}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Event Start Date:</span>
          <span className="block font-thin pl-5">{startDate}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Event End Date</span>
          <span className="block font-thin pl-5">{endDate}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Event Organizer</span>
          <span className="block font-thin pl-5">{organizer}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Event Address Location:
          </span>
          <span className="block font-thin pl-5">{address}</span>
        </p>
        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">Event Type</span>
          <span className="block font-thin pl-5">{eventType}</span>
        </p>

        <p className="font-mono  text-xl px-3">
          <span className="mr-4 font-semibold block">
            Trainee Biography Description:
          </span>
          <span className="block font-thin pl-5">{description}</span>
        </p>
        <Image
          src={`/${file}`}
          alt={eventName}
          width={300}
          height={200}
          className="shadow-sm shadow-slate-200 hover:scale-110 mt-3"
        />
      </div>
    </section>
  );
};

export default ReadEvent;
