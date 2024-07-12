import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../redux/signupSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = () => {
    if (password !== confirmPassword) return;

    dispatch(signup({ name, email, password }));
  };

  return (
    <div className="w-4/5 lg:w-[40%] min-h-[75vh] mx-auto mt-12">
      <p className="text-xl lg:text-2xl font-semibold uppercase underline tracking-widest text-center mb-11">
        Signup
      </p>

      <div className="flex flex-col space-y-6">
        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            Name
          </FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            borderRadius="0"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            Email
          </FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            borderRadius="0"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            Password
          </FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderRadius="0"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel
            fontWeight="600"
            textTransform="uppercase"
            letterSpacing="2px"
          >
            Confirm Password
          </FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            borderRadius="0"
          />
        </FormControl>
      </div>

      <button
        className="text-base md:text-lg border-[1px] border-black rounded-none bg-transparent tracking-widest uppercase cursor-pointer mt-12 w-full py-2 md:py-3 hover:bg-gray-100"
        onClick={submitHandler}
      >
        Signup
      </button>

      <NavLink to="/signin">
        <p className="tracking-wide uppercase underline font-semibold cursor-pointer text-center mt-6">
          Signin
        </p>
      </NavLink>
    </div>
  );
};

export default Signup;
