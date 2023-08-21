"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const handleLogoutClick = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <p>profile page</p>
      <h2 className='p-1 rounded bg-green-400'>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-sm my-2'
        onClick={handleLogoutClick}
      >
        Logout
      </button>
      <button
        className='bg-green-800 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-sm my-2'
        onClick={getUserDetails}
      >
        getUser Details
      </button>
    </div>
  );
};

export default ProfilePage;
