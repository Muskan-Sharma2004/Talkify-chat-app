import axios from "axios";


export const uploadImage = async (file) => {
  console.log("CLOUDINARY FILE RUNNING");
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "Talkify");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dbptqdiqy/image/upload",
    formData
  );

  return res.data.secure_url;
};