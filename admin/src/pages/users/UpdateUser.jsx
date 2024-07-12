import axios from "axios";
import React, { useEffect, useState } from "react";
import { Baseurl } from "../../config/Baseurl";
import { useParams } from "react-router-dom";
import { useUserState } from "../../context/User";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { user } = useUserState();
  const { id } = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      await axios.put(
        `${Baseurl}/api/v1/user/${id}`,
        {
          name,
          email,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/user/${id}`, config);
      setName(data?.user?.name);
      setEmail(data?.user?.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-2/4 mx-auto my-5">
      <h2 className="font-semibold text-lg text-center">Update User</h2>
      <form className="mt-6 space-y-4 bg-[#a1cca5] px-3 py-6 rounded-md">
        {/* name */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Name</label>
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* email */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Email</label>
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* button */}
        <div className="text-center">
          <button
            className="bg-[#49416d] text-white px-4 py-2 rounded-md w-full mt-6"
            onClick={submitHandler}
          >
            Update user
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
