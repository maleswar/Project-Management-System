// import React, { useState, useEffect } from "react";
// import { RiInstagramFill } from "react-icons/ri";
// import { FaGithubSquare } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa6";
// import { FaCamera } from "react-icons/fa";
// import { FaEdit } from "react-icons/fa"; // Import the edit icon

// import axios from "axios"; // Import Axios for making HTTP requests
// // import images from "../../image/1710874044501-.png";
// const Profile = () => {
//   const [image, setImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const tlid = sessionStorage.getItem("TLID");
//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };

//   const handleImageUpload = async () => {
//     const formData = new FormData();
//     formData.append("image", image);
//     const tlid = sessionStorage.getItem("TLID");
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/TL/TLProfilePhoto?tlid=${tlid}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       const data = response.data.data.affectedRows;
//       // alert(data);
//       if (data === 1) {
//         alert("Image uploaded successfully");
//       } else {
//         alert("failed");
//       }
//       // console.log(response.data);
//     } catch (error) {
//       // alert('Error uploading image');
//       console.log(error);
//     }
//   };

//   const fetchImage = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/TL/TLPhoto?tlid=${tlid}`
//       );
//       const imageUrl = response.data.imageUrl; // Retrieve imageUrl from the response
//       setImageUrl(imageUrl);
//       alert(imageUrl);// Set the imageUrl state
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchImage();
//   }, []);

//   return (
//     <div className="relative h-full mt-80 bg-bgSky p-10">
//       <div>
//         <input type="file" onChange={handleImageChange} />
//         <button onClick={handleImageUpload}>Upload Image</button>
//         {/* <img src={require(../../../images/${student.profile})} alt="student profile" className="h-12 w-12 rounded-full cursor-pointer" /> */}
//         {imageUrl && <img src={require(`../../image/${imageUrl}`)} alt="student profile" className="h-50 w-50 rounded-full cursor-pointer" />}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import {
  FaCamera,
  FaEdit,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
// Import the edit icon
// import { Link } from "react-router-dom99";
import axios from "axios"; //

function Profile() {
  // const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const tlid = sessionStorage.getItem("TLID");

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/TL/TLPhoto?tlid=${tlid}`
      );
      const imageUrl = response.data.imageUrl; // Retrieve imageUrl from the response
      setImageUrl(imageUrl);
      // alert(imageUrl); // Set the imageUrl state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);
  const data = [
    {
      label: " Personal Information",
      desc: `Date Of Birth : 12/1/1990
      Age : 40
      Address
        State : Gujarat
        Country : India
        City : Surat
      Skills : Java , Python
      Qualification : BCA , MCA
      Password : 12345
      Uniq ID : 222`,
    },
    {
      label: "Contact Information",
      desc: `Email: smita@gmail.com
      Phone Number: 1234567890
      Social Media`,
    },
    {
      label: "Professional Information",
      desc: `Company Name: Smita Enterprise
      Company Address: C/67 , Madhuvan society , Chhaprabhata road`,
    },
  ];

  // Placeholder functions
  const handleImageChange = () => {};
  const handleImageReset = () => {};
  const handleEditButtonClick = () => {};
  const image = null; // Placeholder for image

  return (
    <div className="relative h-full bg-bgSky p-10">
      <div className="bg-white shadow-md rounded-lg p-5 w-full h-full pt-14 mt-5">
        <div className="flex justify-start flex-wrap bg-bgSky w-full p-4 rounded-3xl relative">
          {/* Profile Picture and Information */}
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
            {/* Profile Picture */}
            <div className="relative">
              {imageUrl && (
                <img
                  src={require(`../../image/${imageUrl}`)}
                  alt="student profile"
                  className="h-40 w-40 rounded-full cursor-pointer"
                />
              )}
              
            </div>
            {/* Profile Information */}
            <div className="ml-14">
              <h2 className="text-2xl font-semibold text-customSky sm:items-start items-center">
                Jeremy Rose
              </h2>
              <p className="text-gray-600 ">Product Designer</p>
            </div>
          </div>
          {/* Edit button */}
          <button
            className="w-full sm:w-auto mt-4 sm:mt-0 rounded-full p-4 "
            onClick={handleEditButtonClick} // Open modal when clicked
          >
            <Link to="UploadImage">
              <FaEdit className="text-red-500 w-8 h-5" />
            </Link>
          </button>
        </div>

        {/* Profile information */}
        <div className="mt-8 flex flex-wrap">
          {data.map(({ label, desc }) => (
            <div
              key={label}
              className="w-full sm:w-1/1 md:w-1/1 lg:w-1/3 px-4 border-r border-gray-300 mb-4 lg:mb-0"
            >
              <h3 className="text-xl font-semibold mb-4">{label}</h3>
              <ul className="list-inside text-black">
                {desc.split("\n").map((item, index) => (
                  <li key={index} className="text-lg">
                    {item.trim()}
                  </li>
                ))}
                {label === "Contact Information" && (
                  <li className="flex items-center mt-4">
                    <FaInstagram className="ml-2 h-8 w-8" />
                    <FaGithub className="ml-2 h-8 w-8" />
                    <FaTwitter className="ml-2 h-8 w-8" />
                    <FaLinkedin className="ml-2 h-8 w-8" />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
