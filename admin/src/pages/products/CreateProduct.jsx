import React, { useEffect, useState } from "react";
import { useUserState } from "../../context/User";
import axios from "axios";
import { Baseurl } from "../../config/Baseurl";
import { uploadImage } from "../../config/UploadImg";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const { user } = useUserState();

  const createProduct = async (e) => {
    e.preventDefault();

    const imgUrl = await uploadImage(image);

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      await axios.post(
        `${Baseurl}/api/v1/product`,
        {
          name,
          description,
          price,
          image: imgUrl,
          stock,
          category,
          brand,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/category`);
      setCategories(data?.categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBrands = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/brand`);
      setBrands(data?.brands);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-5">
      <h2 className="font-semibold text-lg text-center">Create Product</h2>
      <form className="mt-6 space-y-4 bg-[#a1cca5] px-3 py-6 rounded-md">
        {/* name */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Name</label>
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* description */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Description</label>
          <textarea
            className="border-[3px] border-white rounded-md outline-none p-1"
            cols="10"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {/* price */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Price</label>
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {/* stock */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Stock</label>
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        {/* category */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Category</label>
          <select
            className="border-[3px] border-white rounded-md outline-none p-1"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">none</option>
            {categories &&
              categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        {/* brand */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Brand</label>
          <select
            className="border-[3px] border-white rounded-md outline-none p-1"
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">none</option>
            {brands &&
              brands.map((brand) => (
                <option value={brand._id} key={brand._id}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
        {/* product image */}
        <div className="flex flex-col">
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {/* button */}
        <div className="text-center">
          <button
            className="bg-[#49416d] text-white px-4 py-2 rounded-md w-full mt-6"
            onClick={createProduct}
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
