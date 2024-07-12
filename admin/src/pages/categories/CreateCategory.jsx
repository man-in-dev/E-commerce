import React, { useState } from "react";
import { useUserState } from "../../context/User";
import axios from "axios";
import { Baseurl } from "../../config/Baseurl";
import { uploadImage } from "../../config/UploadImg";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const { user } = useUserState();

  const createCategory = async (e) => {
    e.preventDefault();

    const imgUrl = await uploadImage(image);

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };

    try {
      await axios.post(
        `${Baseurl}/api/v1/category`,
        {
          name,
          image: imgUrl,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

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
        {/* image */}
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
            onClick={createCategory}
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
