import React from "react";
import User from "./Assest/img/Profile.jpg";

const Profile = () => {
  return (
    <div className="w-full mt-32">
      <div className="mx-10 grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg items-center">
        <div className="flex justify-center items-center sm:ml-0 lg:-ml-80">
          <img src={User} alt="Illustration" className="w-60 h-60" />
        </div>
        <div className="sm:text-left md:text-left sm:ml-0 lg:-ml-80">
          <h1 className="text-4xl font-bold mb-2">John Deo</h1>
          <p className="text-gray-600 text-lg">UI/UX Designer</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 mb-10">
        <div className="mx-10 bg-white shadow-lg mt-10">
          {/* Skills Container */}
          <div className="md:p-8 md:border-r md:border-gray-300 md:ml-0 lg:ml-0">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-1">JavaScript</p>
              <div className="bg-gray-300 h-2 rounded-md">
                <div
                  className="bg-blue-500 h-full rounded-md"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-1">React</p>
              <div className="bg-gray-300 h-2 rounded-md">
                <div
                  className="bg-blue-500 h-full rounded-md"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-1">Node.js</p>
              <div className="bg-gray-300 h-2 rounded-md">
                <div
                  className="bg-blue-500 h-full rounded-md"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 ml-10">About</h3>
            <div className="ml-10">
              <h3 className="text-lg font-medium text-gray-600 mb-4">
                Personal Information
              </h3>
              <p className="text-base">Name: John Doe</p>
              <p className="text-base">Phone: +1234567890</p>
              <p className="text-base">
                Address: 123 Main Street, City, Country
              </p>
              <p className="text-base">E-mail: john.doe@example.com</p>
              <h3 className="font-lg font-medium  text-gray-600 mb-4 mt-5">
                Contact Information
              </h3>
              <p className="text-base">
                LinkedIn:
                <a href="" target="_blank">
                  John Doe
                </a>
              </p>
              <p className="text-base">
                Twitter:
                <a href="" target="_blank">
                  @johndoe
                </a>
              </p>
              <p className="text-base">
                GitHub:
                <a href="" target="_blank">
                  johndoe
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mx-10 bg-white shadow-lg mt-10">
          {/* Update Profile Container */}
          <div className="p-8">
            <form className="grid grid-cols-1 gap-4">
              <h3 className="text-xl font-semibold mb-2">Update Profile</h3>
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="border border-gray-400 p-2 w-full rounded-md"
                  type="text"
                  id="username"
                  name="username"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border border-gray-400 p-2 w-full rounded-md"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="username"
                >
                  Phone Number
                </label>
                <input
                  className="border border-gray-400 p-2 w-full rounded-md"
                  type="numbar"
                  id="pnumber"
                  name="pnumber"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border border-gray-400 p-2 w-full rounded-md"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              {/* Add more form fields for other settings */}
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;