import { useState, useEffect } from "react";
import { Baseurl } from "../../config/Baseurl";
import { useUserState } from "../../context/User";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateOrder = () => {
  const [status, setStatus] = useState("");

  const { user } = useUserState();
  const { id } = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}/api/v1/order/adm/${id}`,
        config
      );
      setStatus(data?.order?.status);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${Baseurl}/api/v1/order/upd-ord/${id}`,
        {
          status,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="w-2/4 mx-auto">
      <h2 className="font-semibold text-lg text-center">Update Order</h2>
      <form className="mt-6 space-y-4 bg-[#a1cca5] px-3 py-6 rounded-md">
        {/* order status */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Status</label>
          <select
            className="border-[3px] border-white rounded-md outline-none p-1"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={status}>none</option>
            <option value="PENDING">PENDING</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
        {/* button */}
        <div className="text-center">
          <button
            className="bg-[#49416d] text-white px-4 py-2 rounded-md w-full mt-6"
            onClick={updateOrder}
          >
            Update Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrder;
