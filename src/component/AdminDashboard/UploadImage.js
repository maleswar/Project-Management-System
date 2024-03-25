import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
function UploadImage() {
  const [image, setImage] = useState(null);
    // const [imageUrl, setImageUrl] = useState(null);
    // const tlid = sessionStorage.getItem("TLID");
  //  alert(imageUrl);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // const handleImageReset = () => {
  //   setImage(null);
  // };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const tlid = sessionStorage.getItem("TLID");
    try {
      const response = await axios.post(
        `http://localhost:3001/TL/TLProfilePhoto?tlid=${tlid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data.data.affectedRows;
      // alert(data);
      if (data === 1) {
        alert("Image uploaded successfully");
      } else {
        alert("failed");
      }
      // console.log(response.data);
    } catch (error) {
      // alert('Error uploading image');
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-bgSky flex justify-center items-center">
    <div className="p-5 bg-white rounded-lg shadow-lg flex  w-96 justify-center">
    <div className="flex flex-col items-center">
  <label htmlFor="upload-image" className="cursor-pointer">
    <div className="rounded-full w-64 h-64 flex justify-center items-center bg-gray-200 border border-double ">
      {image ? (
        <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-full rounded-full object-cover" />
      ) : (
        <FaCamera size={64} color="#333" />
      )}
    </div>
  </label>
  <input
    type="file"
    id="upload-image"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
  />
  <div className="gap-x-4 mt-4">
    <button onClick={handleImageUpload} className="px-4 mr-2 py-2 bg-blue-500 text-white rounded-md">
      Upload Image
    </button>
    <Link to="ProfileForm">
      <button className="px-4 py-2 w-40 bg-blue-500 ml-2 text-white rounded-md">
        Next
      </button>
    </Link>
  </div>
</div>

    </div>
  </div>
  );
}

export default UploadImage;
