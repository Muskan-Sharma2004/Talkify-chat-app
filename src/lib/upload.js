console.log("LIB UPLOAD FILE RUNNING");
const upload = async (file) => {

  if (!file) return null;

  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "Talkify");

  try {

    console.log("Before fetch");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dbptqdiqy/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    console.log("After fetch");

    const result = await res.json();

    console.log("Cloudinary Result:", result);

    if (result.secure_url) {

      console.log("Upload Success");

      return result.secure_url;
    }

    console.log("No secure_url found");

    return null;

  } catch (error) {

    console.error("Upload error:", error);

    return null;
  }
};

export default upload;