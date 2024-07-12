import React, { useEffect, useState } from "react";
import { useUserState } from "../../context/User";
import axios from "axios";
import { Baseurl } from "../../config/Baseurl";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../config/UploadImg";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [img, setImg] = useState("");
  const [isModifiedImg, setIsModifiedImg] = useState(false);

  const { user } = useUserState();
  const { id } = useParams();

  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/category/${id}`);
      setName(data?.category?.name);
      setImage(data?.category?.image);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateCategory = async (e) => {
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
        `${Baseurl}/api/v1/category/${id}`,
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

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-2/4 mx-auto my-5">
      <h2 className="font-semibold text-lg text-center">Update Category</h2>
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
            onClick={updateCategory}
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
