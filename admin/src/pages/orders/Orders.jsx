import React from "react";
import { useUserState } from "../../context/User";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Baseurl } from "../../config/Baseurl";
import OrderModal from "../../components/OrderModal";
import { MdDelete, MdEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useUserState();

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}/api/v1/order/adm-ord`,
        config
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${Baseurl}/api/v1/order/del-ord/${id}`, config);
      getOrders();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Shipping Address
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((ord) => (
              <tr
                key={ord._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center"
              >
                <td className="pl-3 py-3">{ord._id}</td>
                <td className="py-3 text-[12px]">
                  <OrderModal content={ord.items} address={false}>
                    See
                  </OrderModal>
                </td>
                <td className="py-3">₹ {ord.price}</td>
                <td className="flex flex-col space-y-1 py-3">
                  <OrderModal content={ord.address} address={true}>
                    See
                  </OrderModal>
                </td>
                <td className="py-3">Paid</td>
                <td className="py-3">{ord.status}</td>
                <td className="flex items-center justify-center space-x-2 py-3">
                  <span>
                    <NavLink to={`/upd-ord/${ord._id}`}>
                      <MdEdit
                        size={20}
                        className="text-blue-600 cursor-pointer"
                      />
                    </NavLink>
                  </span>
                  <span>
                    <MdDelete
                      size={20}
                      className="text-blue-600 cursor-pointer"
                      onClick={() => deleteOrder(ord._id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
