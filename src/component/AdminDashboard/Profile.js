import React, { useState } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { Link } from "react-router-dom";


const Profile = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const profileData = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Software Engineer",
    phone: "123-456-7890",
    skills: "React, JavaScript, CSS",
    qualification: "Bachelor's in Computer Science",
    state: "California",
    city: "San Francisco",
    hometown: "New York",
    github: "johndoe",
    facebook: "johndoe",
    twitter: "johndoe",
    instagram: "johndoe",
    birthday: "January 1, 1990",
    age: "32"
  };

  return (
    <div className="container mx-auto py-20 w-full h-full p-16">
      <h1 className="text-3xl font-semibold mb-8">Profile Page</h1>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-4 md:mr-4">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <ul className="grid grid-cols-2 gap-4">
            <li><strong>Team member name:</strong> {profileData.name}</li>
            <li><strong>Email:</strong> {profileData.email}</li>
            <li><strong>Phone number:</strong> {profileData.phone}</li>
            <li><strong>Skills:</strong> {profileData.skills}</li>
            <li><strong>Qualification:</strong> {profileData.qualification}</li>
            <li><strong>Address:</strong> {profileData.city}, {profileData.state}, {profileData.hometown}</li>
            <li><strong>Birthday:</strong> {profileData.birthday}</li>
            <li><strong>Age:</strong> {profileData.age}</li>
          </ul>
        </div>

        <div className="w-full md:w-2/3 relative">
          <h2 className="text-xl font-semibold mb-2">Profile Image</h2>
          <div className="max-w-xs border border-gray-300 rounded-lg overflow-hidden relative">
            {image ? (
              <img src={image} alt="Uploaded" className="w-full h-auto" />
            ) : (
              <div className="h-48 bg-gray-100 flex justify-center items-center">
                <span className="text-gray-500">Upload Image</span>
              </div>
            )}
            <label htmlFor="fileInput" className="absolute bottom-0 right-0 mb-2 mr-2 cursor-pointer">
              <MdOutlinePhotoCamera className="w-9 h-9" />
              <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Remaining profile information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
        <ul>
          <li><strong>Role:</strong> {profileData.role}</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Social Media</h2>
        <ul className="flex space-x-4">
          <li>
            <a href={`https://github.com/${profileData.github}`} target="_blank" rel="noopener noreferrer">
              {/* GitHub icon */}
            </a>
          </li>
          <li>
            <a href={`https://facebook.com/${profileData.facebook}`} target="_blank" rel="noopener noreferrer">
              {/* Facebook icon */}
            </a>
          </li>
          <li>
            <a href={`https://twitter.com/${profileData.twitter}`} target="_blank" rel="noopener noreferrer">
              {/* Twitter icon */}
            </a>
          </li>
          <li>
            <a href={`https://instagram.com/${profileData.instagram}`} target="_blank" rel="noopener noreferrer">
              {/* Instagram icon */}
            </a>
          </li>
        </ul>
      </div>
      <Link to="/AdminDashboard/profile/ProfileForm"><button>Edit</button></Link>
    </div>
  );
};

export default Profile;
