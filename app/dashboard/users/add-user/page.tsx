"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !role ||
      !isActive ||
      !password ||
      !confirmPassword ||
      !photo
    ) {
      toast.error("All Fields Required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password Should match");
      return;
    }
    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        toast.error("User already exists.");
        return;
      }
    } catch (error) {
      toast.error("Error during registration: ");
    }
    const data = new FormData();
    data.set("firstname", firstName);
    data.set("lastname", lastName);
    data.set("email", email);
    data.set("password", password);
    data.set("role", role);
    data.set("isactive", isActive);
    data.set("photo", photo);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
        setIsActive("");
        setPhoto(null);
        toast.success("User Registered Successfully");
      } else {
        toast.error("Failed to Register User");
      }
    } catch (error) {
      toast.error("Failed to Register User");
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex  flex-col justify-center items-start py-5"
      >
        <h1 className="my-4 text-center font-mono font-semibold text-3xl ">
          User Registration
        </h1>
        <div className="w-full  flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="text"
            placeholder="First name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="tech-support">Tech support</option>
            <option value="finance">Finance</option>
            <option value="trainer">trainer</option>
            <option value="project-coordinator">Project Coordinator</option>
          </select>
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="password"
            placeholder="Confirm Enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            required
            className="p-5  mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
          >
            <option value="">Select User Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div className="w-full   flex flex-col md:flex-row justify-between items-center">
          <h1 className="w-full block font-semibold font-mono text-xl">
            User Profile Photo
          </h1>
          <input
            className="p-5 md:mr-4 mb-2 w-full text-slate-950 focus:outline-none rounded-md font-mono font-semibold"
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
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

export default AddUser;
