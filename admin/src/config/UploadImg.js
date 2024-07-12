import axios from "axios"

export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "E-commerce");
    formData.append("cloud_name", "dncrxdct8");

    const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dncrxdct8/image/upload",
        formData
    );

    return data?.url
};