import React, { useState,useEffect  } from "react";
import { RiInstagramFill } from "react-icons/ri";
import { FaGithubSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { FaEdit } from "react-icons/fa"; // Import the edit icon
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests

const Profile = () => {
  const [image, setImage] = useState(null);

  

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('profilePhoto', image);
const tlid=sessionStorage.getItem("TLID");
    try {
      const response = await axios.put(`http://localhost:3001/TL/TLProfilePhoto?TL_id=${tlid}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
      
      console.log(response.data);
      alert("Image uploaded successfully");
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error);
    }
  };

  const handleImageReset = () => {
    setImage(null);
  };

  return (
    <div className="relative h-full bg-bgSky p-10">
      <div className=" bg-white shadow-md rounded-lg p-5 w-full h-1/2 pt-14 mt-11 ">
      <div className="flex items-center">
      {image && (
        <div className="relative">
          <img
            src={URL.createObjectURL(image)}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full mr-4"
          />
          <button
            onClick={handleImageReset}
            className="absolute bottom-0 right-0 bg-white rounded-full p-1"
          >
            <FaCamera className="text-red-500" />
          </button>
        </div>
      )}
      {!image && (
        <label htmlFor="imageUpload">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <span className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer mr-4">
            <FaCamera />
          </span>
        </label>
      )}
      <div>
        <h2 className="text-2xl font-semibold text-customSky">
          Jeremy Rose
        </h2>
        <p className="text-gray-600">Product Designer</p>
      </div>
      {image && (
        <button onClick={handleImageUpload}>Upload</button>
      )}
    </div>

        <div className="grid grid-rows-1 h-fit grid-flow-col gap-7 mt-12  leading-10">
          <div className="row-span-2 bg-lightBg w-96 p-9 rounded-3xl">
            <div className="">
              <h3 className="text-xl font-semibold mb-2 text-customSky">
                Personal Information
              </h3>
              <ul className=" list-inside ml-5 ">
                <li>
                  <p className="">
                    <strong>Date Of Birth : </strong>
                    <span>12/1/1990</span>
                  </p>
                </li>

                <li className="mt-4">
                  <p className="">
                    <strong>Age :</strong> <span>40</span>
                  </p>
                </li>

                <li className="mt-4">
                  <ul>
                    <li>
                      <strong> Address</strong>
                      <ul className="leading-6">
                        <li>
                          <p className="ml-10">
                            <strong>State :</strong> <span>Gujarat</span>
                          </p>
                        </li>
                        <li>
                          <p className="ml-10">
                            <strong>Country :</strong> <span>India</span>
                          </p>
                        </li>
                        <li>
                          <p className="ml-10">
                            <strong> City : </strong>
                            <span>Surat</span>
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="mt-4">
                  <p className="">
                    <strong>Skills :</strong> <span>Java , Python</span>
                  </p>
                </li>
                <li className="mt-4">
                  <p className="">
                    <strong>Qualification :</strong> <span>BCA , MCA </span>
                  </p>
                </li>
                <li className="mt-4">
                  <p className="">
                    <strong>Password :</strong> <span>12345</span>
                  </p>
                </li>
                <li className="mt-4">
                  <p className="">
                    <strong>Uniq ID :</strong> <span>222</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-2  bg-lightBg p-9 rounded-3xl">
            <h3 className="text-xl font-semibold mb-2 text-customSky">
              Contact Information
            </h3>
            <ul className=" list-inside leading-10 pl-12 ">
              <li>
                <strong>Email: </strong>
                <span>smita@gmail.com</span>
              </li>
              <li>
                <strong>Phone Number: </strong>
                <span>1234567890</span>
              </li>
              <li>
                <strong>Social Media</strong>
              </li>
            </ul>

            <div className="mb-6">
              <h3 className="text-xl flex justify-evenly font-semibold mb-2"></h3>
              <ul className="gap-9 list-inside flex pl-12 ">
                <li>
                  {/* <a href="#" className="text-blue-500 hover:underline"> */}
                  <RiInstagramFill className="w-7 h-8 text-black" />
                  {/* </a> */}
                </li>
                <li>
                  <FaGithubSquare className="w-7 h-8 text-black" />
                </li>
                <li>
                  <FaTwitter className="w-7 h-8 text-black" />
                </li>
                <li>
                  <FaLinkedin className="w-7 h-8 text-black" />
                </li>
              </ul>
            </div>
          </div>

          <div className="row-span-1 col-span-2  bg-lightBg p-9 rounded-3xl">
            <div className="w-2/3 pl-4 col-span-1 ">
              <h3 className="text-xl font-semibold mb-2 text-customSky">
                Professional Information
              </h3>
              <ul className="list-inside pl-12 leading-10">
                <li>
                  <strong>Company Name:</strong> <span>Smita Enetrprise</span>
                </li>
                <li>
                  <strong> Company Address :</strong>
                  <span> c.67 , Madhuvan society , Chhaprabhata road</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
