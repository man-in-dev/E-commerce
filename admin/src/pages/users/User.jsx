import React, { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "../../config/Baseurl";
import { useUserState } from "../../context/User";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  const { user } = useUserState();

  const getUsers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/user`, config);
      setUsers(data.users);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      await axios.delete(`${Baseurl}/api/v1/user/${id}`, config);
      getUsers();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              pic
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={user._id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4">{user._id}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                <img src={user.pic} alt={user.name} className="w-9 h-9" />
              </td>
              <td className="flex items-center space-x-2 px-6 py-4">
                <span>
                  <NavLink to={`/upd-user/${user._id}`}>
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
                    onClick={() => deleteUser(user._id)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
