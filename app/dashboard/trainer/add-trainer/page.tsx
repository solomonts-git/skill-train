"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTrainer = () => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [exprience, setExprience] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [biodesc, setBioDesc] = useState("");
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
        throw new Error("Failed to Fetch Affiliation");
      }

      const data = await res.json();
      setPartners(data);
    } catch (error) {
      throw new Error("Failed to fetch partner");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!photo) {
      toast.info("Trainer Photo Required");
      return;
    }

    const data = new FormData();
    data.set("title", title);
    data.set("firstname", firstName);
    data.set("lastname", lastName);
    data.set("email", email);
    data.set("specialization", specialization);
    data.set("exprience", exprience);
    data.set("affiliation", affiliation);
    data.set("photo", photo);
    data.set("gender", gender);
    data.set("biodesc", biodesc);

    try {
      const res = await fetch("/api/trainer", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setTitle("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setSpecialization("");
        setExprience("");
        setAffiliation("");
        setPhoto(null);
        setBioDesc("");
        setGender("");

        toast.success("Trainer Registered successfully");
      } else {
        toast.error("Failed to Register Trainer");
      }
    } catch (error) {
      toast.error("Failed to Register Trainer");
    }
  };

  useEffect(() => {
    getAffiliation();
  }, []);
  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex  flex-col justify-center items-start py-5"
      >
        <h1 className="my-4 text-center font-mono font-semibold text-3xl ">
          Trainer Registration
        </h1>
        <div className="w-full  flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            name="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
          <input
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            name="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="last name"
          />
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <select
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select trainer title</option>
            <option value="Mr.">Mr.</option>
            <option value="Mss.">Mss.</option>
            <option value="Dr.">Dr.</option>
            <option value="Professor">Professor</option>
          </select>
          <input
            className="p-5 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            name="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Your specialization"
          />
          <input
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="number"
            name="exprience"
            value={exprience}
            onChange={(e) => setExprience(e.target.value)}
            placeholder="Your exprience in years"
          />
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <select
            name="affiliation"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select trainer title</option>
            {partners.map((p: Partner) => (
              <option key={p._id} value={p._id}>
                {p.organizationname}
              </option>
            ))}
          </select>

          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select trainer Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <h1 className="w-full block font-semibold font-mono text-xl">
            Trainer Profile Photo
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
          value={biodesc}
          onChange={(e) => setBioDesc(e.target.value)}
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

export default AddTrainer;
