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

import React, { useState, useRef, useEffect } from "react";
import User from "./Assest/img/Profile.jpg";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithubSquare, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
// Import the edit icon
// import { Link } from "react-router-dom99";
import axios from "axios"; //

function Profile() {
  const [Data, setData] = useState([]);
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
    AllData();
  }, []);

  // Placeholder functions
  const handleImageChange = () => {};
  const handleImageReset = () => {};
  const handleEditButtonClick = () => {};
  const image = null; // Placeholder for image

  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(User);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const AllData = async () => {
    const tlid = sessionStorage.getItem("TLID");

    await axios
      .get(`http://localhost:3001/TL/TLData?tlid=${tlid}`)
      .then((res) => {
        let list = res.data;
        let Data = list.data;
        setData(Data);
        // (project);
      });
  };
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" }; // Customize date format
    return date.toLocaleDateString(undefined, options); // Customize based on options
  };
  return (
    <div className="w-full h-full">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4">
        <div className="min-h-screen flex flex-col justify-center items-center mt-20">
          <div
            className="bg-cover bg-center w-full h-60 md:h-80 lg:h-64 rounded-lg shadow-lg mx-10"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
          ></div>

          {Data.map(
            (
              {
                TL_fname,
                TL_lname,
                C_name,
                Email,
                Uniq_id,
                Password,
                role,
                Phone_number,
                Skill,
                Qualification,
                Date_of_birth,
                city,
                state,
                country,
                instagram,
                linkedin,
                github,
                twitter,
                company_address,
                Age,
              },
              index
            ) => (
              <div className="bg-white w-[90%] rounded-lg -mt-20 gap-4 px-4">
                <div className="justify-end items-end flex">
                  <Link to="UploadImage">
                  <button className="bg-customBlue text-white font-bold py-2 px-4 rounded mt-5">
                    Edit Profile
                  </button></Link>
                </div>

                <div className="flex flex-col items-center md:flex-row justify-center md:justify-start mb-11">
                  <input type="file" className="hidden" />
                  {imageUrl && (
                    <img
                      src={require(`../../image/${imageUrl}`)}
                      alt="student profile"
                      className="h-40 w-40 rounded-full cursor-pointer"
                    />
                  )}

                  <div className="md:ml-4">
                    <h1 className="font-bold text-4xl text-customBlue">
                      {TL_fname} {TL_lname}
                    </h1>
                    <h4 className="text-lg">{role}</h4>
                    <ul className="flex gap-4">
                      <li>
                      <a href={`https://www.instagram.com/${Data && Data.instagram}`} target="_blank">
                          <FaSquareInstagram className="w-6 h-6 text-black" />
                        </a>
                      </li>
                      <li>
                        <a href={`https://github.com/${Data && Data.github}`} target="_blank">
                          <FaGithubSquare className="w-6 h-6 text-black" />
                        </a>
                      </li>
                      <li>
                      <a href={`https://twitter.com/${Data && Data.twitter}`} target="_blank">
                          <FaTwitter className="w-6 h-6 text-black" />
                        </a>
                      </li>
                      <li>
                      <a href={`https://www.linkedin.com/${Data && Data.linkedin}`} target="_blank">
                          <FaLinkedin className="w-6 h-6 text-black" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                  <div className="mb-2">
                    <h1 className="font-bold text-xl text-customBlue mb-2">
                      Personal Information
                    </h1>
                    <div className="text-gray-700 leading-7">
                      <p>Date of Birth: {formatTimestamp(Date_of_birth)}</p>
                      <p>Age: {Age}</p>
                      <p>City: {city}</p>
                      <p>State: {state} </p>
                      <p>Country: {country}</p>
                      <p>Skills: {Skill}</p>
                      <p>Qualification: {Qualification}</p>
                      <p>Password: {Password}</p>
                      <p>Uniq ID: {Uniq_id}</p>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold text-xl text-customBlue mb-2">
                      Contact Information
                    </h1>
                    <div className="text-gray-700 leading-7">
                      <p>Email Address: {Email}</p>
                      <p>Phone Number: {Phone_number}</p>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold text-xl text-customBlue mb-2">
                      Professional Information
                    </h1>
                    <div className="text-gray-700 leading-7">
                      <p>Company Name: {C_name}</p>
                      <p>Company Address: {company_address} </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
