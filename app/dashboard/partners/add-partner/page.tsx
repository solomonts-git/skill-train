"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPartner = () => {
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [orgDesc, setOrgDesc] = useState("");
  const [orgLogo, setOrgLogo] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setOrgLogo(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orgLogo) {
      toast.info("Organization Logo Required");
      return;
    }

    const data = new FormData();
    data.set("organizationname", orgName);
    data.set("org_logo", orgLogo);
    data.set("org_type", orgType);
    data.set("description", orgDesc);

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setOrgDesc("");
        setOrgLogo(null);
        setOrgType("");
        setOrgName("");
        toast.success("Partner Registered successfully");
      } else {
        toast.error("Failed to Register partner");
      }
    } catch (error) {
      toast.error("Failed to Register partner");
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex  flex-col justify-center items-start py-5"
      >
        <h1 className="my-4 text-center font-mono font-semibold text-3xl ">
          Partner Organization Registration
        </h1>
        <div className="w-full  flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            name="organizationname"
            placeholder="Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
          <select
            value={orgType}
            onChange={(e) => setOrgType(e.target.value)}
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select Organization type</option>
            <option value="employer">Employer Organization</option>
            <option value="trainer">Trainer Organization</option>
          </select>
        </div>

        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <h1 className="w-full block font-semibold font-mono text-xl">
            Organization Photo
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
          value={orgDesc}
          onChange={(e) => setOrgDesc(e.target.value)}
          placeholder="Enter Bio Discription of trainer"
        ></textarea>
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

export default AddPartner;
