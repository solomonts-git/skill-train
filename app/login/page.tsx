"use client";
import React, { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        console.log(error);
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[400px] flex justify-center items-center shadow-md dark:shadow-slate-100 shadow-slate-200">
        <form
          onSubmit={handleSubmit}
          className="w-full py-10 flex flex-col items-center justify-center"
        >
          <h1 className="font-mono font-thin text-3xl dark:text-slate-100 text-slate-950">
            Login
          </h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-3/4 p-4 my-3 font-mono font-thin focus:outline-none text-slate-950"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-3/4 p-4 my-3 focus:outline-none text-slate-950"
          />
          <input
            type="submit"
            value="Login"
            className="w-3/4 p-4 my-3 cursor-pointer text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          />
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
