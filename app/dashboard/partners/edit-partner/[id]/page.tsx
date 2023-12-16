"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPartner = ({ params }: { params: { id: string } }) => {
  const [file, setFile] = useState<File | null>(null);
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");
  const [orgType, setOrgType] = useState("");

  async function fetchPartnerData(id: string) {
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch partner data");
      }
      const partner = await res.json();
      console.log(partner);

      setOrgName(partner.organizationname);
      setDescription(partner.description);
      setOrgType(partner.org_type);
      // console.log(trainings);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPartnerData(params.id);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Error uploading file");
      return;
    }
    const formData = new FormData();
    formData.set("org_logo", file);
    formData.set("organizationname", orgName);
    formData.set("description", description);
    formData.set("org_type", orgType);
    formData.set("id", params.id);

    try {
      const res = await fetch(`/api/partners/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        setDescription("");
        setFile(null);
        setOrgName("");
        setOrgType("");
        toast.success("Partner Updated successfully");
      } else {
        toast.error("Failed to update Partner");
      }
    } catch (error) {
      toast.error("Failed to update Partner");
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex  flex-col justify-center items-start py-5"
      >
        <h1 className="my-4 text-center font-mono font-semibold text-3xl ">
          Edit Partner Organization
        </h1>
        <div className="w-full  flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            name="organizationname"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Organization Name"
          />
          <select
            name="org_type"
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
            onChange={handleFileChange}
          />
        </div>
        <textarea
          className="p-5 my-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          cols={50}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Bio Discription of trainer"
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

export default EditPartner;
