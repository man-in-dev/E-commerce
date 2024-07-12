import React, { useEffect, useState } from "react";
import { useUserState } from "../../context/User";
import axios from "axios";
import { Baseurl } from "../../config/Baseurl";
import { NavLink } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const Brands = () => {
  const [brands, setBrands] = useState([]);

  const { user } = useUserState();

  const getBrands = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/brand`);
      setBrands(data.brands);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBrand = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      await axios.delete(`${Baseurl}/api/v1/brand/${id}`, config);
      getBrands();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-semibold">{brands.length} Brands</span>
        <NavLink to="/crt-brnd">
          <button className="flex items-center space-x-2 bg-blue-500 text-white text-sm font-semibold px-3 py-2 rounded-md">
            <span>Create Brand</span>
            <span>
              <IoMdAdd fontWeight={600} size={20} />
            </span>
          </button>
        </NavLink>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-l mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {brands?.map((brnd) => (
              <tr
                key={brnd._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-2">{brnd._id}</td>
                <td className="px-6 py-2">{brnd.name}</td>
                <td className="px-6 py-2">
                  <img
                    src={
                      brnd.image ||
                      "https://t4.ftcdn.net/jpg/01/40/32/05/360_F_140320549_wK5uQGxlYGt9BkBULkNCWvJ00QpoHBl3.jpg"
                    }
                    alt={brnd.name}
                    className="w-9 h-9"
                  />
                </td>
                <td className="flex items-center space-x-2 px-6 py-2">
                  <span>
                    <NavLink to={`/upd-brnd/${brnd._id}`}>
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
                      onClick={() => deleteBrand(brnd._id)}
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

export default Brands;
