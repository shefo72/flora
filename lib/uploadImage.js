import axios from "axios";

export const uploadImage = async (imageFile) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const formData = new FormData();

  formData.append("image", imageFile);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData,
    );
    return response.data.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};
