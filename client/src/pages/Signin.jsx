import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signin } from "../redux/signinSlice";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state?.signinData?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    dispatch(signin({ email, password }));
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="w-4/5 lg:w-[40%] min-h-[75vh] mx-auto mt-12">
      <p className="text-xl lg:text-2xl font-semibold uppercase underline tracking-widest text-center mb-11">
        Signin
      </p>

      <div className="flex flex-col space-y-6">
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
      </div>

      <button
        className="text-base md:text-lg border-[1px] border-black rounded-none bg-transparent tracking-widest uppercase cursor-pointer mt-12 w-full py-2 md:py-3 hover:bg-gray-100"
        onClick={submitHandler}
      >
        Signin
      </button>

      <NavLink to="/signup">
        <p className="tracking-wide uppercase underline font-semibold cursor-pointer text-center mt-6">
          Signup
        </p>
      </NavLink>
    </div>
  );
};

export default Signin;
