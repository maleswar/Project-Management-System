import React, { useState } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";

const ProfileForm = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    qualification: "",
    city: "",
    state: "",
    hometown: "",
    birthday: "",
    age: "",
    role: "",
    github: "",
    facebook: "",
    twitter: "",
    instagram: ""
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto py-20 w-full h-full p-16">
      <h1 className="text-3xl font-semibold mb-8">Profile Page</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-4 md:mr-4">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <ul className="grid grid-cols-2 gap-4">
            {Object.entries(formData).map(([key, value]) => (
              <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:</strong>{" "}
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="border-b border-gray-300 focus:outline-none"
                />
              </li>
            ))}
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
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
        <ul>
          <li>
            <strong>Role:</strong>{" "}
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border-b border-gray-300 focus:outline-none"
            />
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Social Media</h2>
        <ul className="flex space-x-4">
          {['github', 'facebook', 'twitter', 'instagram'].map((socialMedia) => (
            <li key={socialMedia}>
              <input
                type="text"
                name={socialMedia}
                value={formData[socialMedia]}
                onChange={handleChange}
                placeholder={`Enter ${socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1)}`}
                className="border-b border-gray-300 focus:outline-none"
              />
            </li>
          ))}
        </ul>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save
      </button>
    </form>
  );
};

export default ProfileForm;
