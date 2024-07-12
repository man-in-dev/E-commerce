import React, { useEffect, useState } from "react";
import { useUserState } from "../../context/User";
import axios from "axios";
import { Baseurl } from "../../config/Baseurl";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../config/UploadImg";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [img, setImg] = useState("");
  const [isModifiedImg, setIsModifiedImg] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const { user } = useUserState();
  const { id } = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/product/${id}`);
      setName(data?.product?.name);
      setDescription(data?.product?.description);
      setPrice(data?.product?.price);
      setImage(data?.product?.image);
      setStock(data?.product?.stock);
      setCategory(data?.product?.category?._id);
      setBrand(data?.product?.brand?._id);
    } catch (error) {
      console.log(error.message);
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

  const updateProduct = async (e) => {
    e.preventDefault();

    let imgUrl = image;
    if (isModifiedImg) {
      imgUrl = await uploadImage(img);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      await axios.put(
        `${Baseurl}/api/v1/product/${id}`,
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

  useEffect(() => {
    getProduct();
    getCategories();
    getBrands();
  }, []);

  return (
    <div className="w-2/4 mx-auto">
      <h2 className="font-semibold text-lg text-center">Update Product</h2>
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
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* price */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Price</label>
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {/* stock */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-white">Stock</label>
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="text"
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
            <option value={category}>none</option>
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
            <option value={brand}>none</option>
            {brands &&
              brands.map((b) => (
                <option value={b._id} key={b._id}>
                  {b.name}
                </option>
              ))}
          </select>
        </div>
        {/* image */}
        <div className="flex flex-col">
          <input
            className="border-[3px] border-white rounded-md outline-none p-1"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImg(e.target.files[0]);
              setIsModifiedImg(true);
            }}
          />
        </div>
        {/* button */}
        <div className="text-center">
          <button
            className="bg-[#49416d] text-white px-4 py-2 rounded-md w-full mt-6"
            onClick={updateProduct}
          >
            Update user
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
