import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Order from "./Order";
import { BaseUrl } from "../config/Baseurl";
import axios from "axios";
import { useSelector } from "react-redux";

const Account = () => {
  const [isProfile, setIsProfile] = useState(true);
  const [orders, setOrders] = useState([]);

  const token = useSelector((state) => state?.signinData?.token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/api/v1/order/usr-ord`,
        config
      );
      setOrders(data.order);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-around lg:items-center w-11/12 mx-auto mt-6 lg:mt-2 min-h-[80vh]">
      <div className="flex lg:block items-center justify-center [&_p]:text-lg [&_p]:font-bold [&_p]:tracking-widest [&_p]:uppercase [&_p]:cursor-pointer">
        <p
          className="border-r-2 lg:border-r-0 pr-4 lg:pr-0 lg:border-b-[1px] border-black lg:pb-4 hover:text-blue-500"
          onClick={() => setIsProfile(true)}
        >
          Profile
        </p>
        <p
          className="pl-4 lg:pl-0 lg:pt-4 hover:text-blue-500"
          onClick={() => setIsProfile(false)}
        >
          Orders
        </p>
      </div>
      <div className="text-center mt-24 lg:mt-0">
        {isProfile ? <Profile /> : <Order orders={orders} />}
      </div>
    </div>
  );
};

export default Account;
