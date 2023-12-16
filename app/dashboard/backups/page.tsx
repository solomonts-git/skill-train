"use client";
import React, { useState } from "react";
const Backups = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/backup", {
        method: "GET",
      });
      console.log("Response", response);
      const data = await response.json();

      //convert backup data to blob format
      const blob = new Blob([data], { type: "application/json" });
      console.log("blob data", blob);
      // // create a temporary link element
      // const link = document.createElement("a");
      // link.href = URL.createObjectURL(blob);
      // link.download = "backup.json";
      // //append the link to the document body and triger the download
      // link.setAttribute("download", "./databackup/backup.json");
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    } catch (err) {
      console.log("Error occurred during backup", err);
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full h-4/5 flex justify-center items-center">
      <form onSubmit={handleBackup}>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-400 p-5 rounded-sm"
        >
          {isLoading ? "Backing up..." : "Backup Database"}
        </button>
      </form>
    </div>
  );
};

export default Backups;
