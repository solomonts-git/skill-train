"use client";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTrainee = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [biodesc, setBioDesc] = useState("");
  const [status, setStatus] = useState("");
  const [startYear, setStartYear] = useState("");
  const [training, setTraining] = useState("");
  const [partners, setPartners] = useState([]);
  const [trainings, setTrainings] = useState([]);

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
        throw new Error("Failed to Fetch Trainier Organization");
      }

      const data = await res.json();
      setPartners(data);
    } catch (error) {
      throw new Error("Failed to fetch Trainer Organization");
    }
  };
  const getTrainings = async () => {
    try {
      const res = await fetch("/api/training", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to Fetch Trainings");
      }

      const data = await res.json();
      setTrainings(data);
    } catch (error) {
      throw new Error("Failed to fetch Trainings");
    }
  };
  async function fetchTraineeData(id: string) {
    try {
      const res = await fetch(`/api/trainee/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch training data");
      }
      const trainee: Trainee = await res.json();
      console.log(trainee);

      setTitle(trainee.title);
      setFirstName(trainee.firstname);
      setLastName(trainee.lastname);
      setEmail(trainee.email);
      setStatus(trainee.status);
      setTraining(trainee.trainingname);
      setAffiliation(trainee.trainerorg);
      setPhoto(null);
      setBioDesc(trainee.biodesc);
      setGender(trainee.gender);
      setStartYear(JSON.stringify(trainee.year));

      // console.log(trainings);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!photo) {
      toast.info("Trainee Photo Required");
      return;
    }

    const data = new FormData();
    data.set("title", title);
    data.set("firstname", firstName);
    data.set("lastname", lastName);
    data.set("email", email);
    data.set("status", status);
    data.set("trainingname", training);
    data.set("trainerorg", affiliation);
    data.set("photo", photo);
    data.set("gender", gender);
    data.set("biodesc", biodesc);
    data.set("year", startYear);
    data.set("id", params.id);

    try {
      const res = await fetch(`/api/trainee/${params.id}`, {
        method: "PUT",
        body: data,
      });

      if (res.ok) {
        setTitle("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setStatus("");
        setTraining("");
        setAffiliation("");
        setPhoto(null);
        setBioDesc("");
        setGender("");
        setStartYear("");

        toast.success("Trainee updated successfully");
      } else {
        toast.error("Failed to updated Trainee");
      }
    } catch (error) {
      toast.error("Failed to update Trainee");
    }
  };

  useEffect(() => {
    getAffiliation();
    getTrainings();
    fetchTraineeData(params.id);
  }, []);

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex  flex-col justify-center items-start py-5"
      >
        <h1 className="my-4 text-center font-mono font-semibold text-3xl ">
          Trainee Registration
        </h1>
        <div className="w-full  flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
          <input
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            placeholder="Training Start Year"
          />
          <input
            className="p-5 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <select
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select trainer Organization</option>
            {partners.map((p: Partner) => (
              <option key={p._id} value={p._id}>
                {p.organizationname}
              </option>
            ))}
          </select>
          <select
            value={training}
            onChange={(e) => setTraining(e.target.value)}
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select training name</option>
            {trainings.map((t: Trianing) => (
              <option key={t._id} value={t._id}>
                {t.trainingname}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select trainee title</option>
            <option value="Mr. ">Mr.</option>
            <option value="Mss. ">Mss.</option>
            <option value="Dr. ">Dr.</option>
            <option value="Professor">Professor</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Trainee Status</option>
            <option value="open">Open for work</option>
            <option value="hired">Hired</option>
            <option value="ontraining">On Training</option>
          </select>
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select trainee Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <h1 className="w-full block font-semibold font-mono text-xl">
            Trainee Profile Photo
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
          required
        ></textarea>
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

export default EditTrainee;
