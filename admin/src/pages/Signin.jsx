import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Baseurl } from "../config/Baseurl";
import { useUserState } from "../context/User";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user } = useUserState();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${Baseurl}/api/v1/user/signin`, {
        email,
        password,
      });

      if (data?.user?.isAdmin) {
        localStorage.setItem(
          "E-commerce-prac-admin",
          JSON.stringify({
            user: data.user,
            token: data.token,
          })
        );

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="w-1/3 mx-auto p-3 bg-blue-gray-200 rounded-md">
      <h3 className="font-heading font-semibold text-lg text-center mt-8 mb-4">
        Signin
      </h3>
      <form className="mt-6 space-y-4 bg-[#a1cca5] px-3 py-6 rounded-md">
        {/* email */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Email</label>
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* password */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Password</label>
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* button */}
        <div className="text-center">
          <button
            className="bg-[#49416d] text-white px-4 py-2 rounded-md w-full mt-6"
            onClick={submitHandler}
          >
            Signin
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
