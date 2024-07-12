import React, { useEffect, useState } from "react";
import { Baseurl } from "../../config/Baseurl";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useUserState } from "../../context/User";

const Products = () => {
  const [products, setProducts] = useState([]);

  const { user } = useUserState();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteProduct = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      await axios.delete(`${Baseurl}/api/v1/product/${id}`, config);
      getProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-semibold">{products.length} Products</span>
        <NavLink to="/crt-prod">
          <button className="flex items-center space-x-2 bg-blue-500 text-white text-sm font-semibold px-3 py-2 rounded-md">
            <span>Create Product</span>
            <span>
              <IoMdAdd fontWeight={600} size={20} />
            </span>
          </button>
        </NavLink>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
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
                description
              </th>
              <th scope="col" className="px-6 py-3">
                price
              </th>
              <th scope="col" className="px-6 py-3">
                image
              </th>
              <th scope="col" className="px-6 py-3">
                stock
              </th>
              <th scope="col" className="px-6 py-3">
                category
              </th>
              <th scope="col" className="px-6 py-3">
                brand
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 text-center"
              >
                <td className="py-3">{product._id}</td>
                <td className="py-3 text-[12px]">
                  {product.name.substring(0, 21)}...
                </td>
                <td className="py-3 text-[12px]">
                  {product.description.substring(0, 21)}...
                </td>
                <td className="py-3">₹ {product.price}</td>
                <td className="py-3 flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-9 h-9"
                  />
                </td>
                <td className="py-3">{product.stock}</td>
                <td className="py-3">{product.category.name}</td>
                <td className="py-3">{product.brand.name}</td>
                <td className="flex items-center justify-center space-x-2 py-3">
                  <span>
                    <NavLink to={`/upd-prod/${product._id}`}>
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
                      onClick={() => deleteProduct(product._id)}
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

export default Products;
