import React, { useEffect, useState } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { calculateAge, validateEmail } from "../../JS/FormValidation";
import {
  checkEmpty,
  validateNumber,
  validateEmail,
  calculateAge,
  checkPasswordLength,
  validatePhoneNumber,
} from "../../JS/FormValidation";

const ProfileForm = () => {
  const ID = sessionStorage.getItem("TLID");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    TL_ID: ID,
    fname: "",
    lname: "",
    role: "",
    dob: new Date(),
    Age: "",
    state: "",
    country: "",
    city: "",
    skills: "",
    qualification: "",
    password: "",
    uid: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
    instagram: "",
    github: "",
    twitter: "",
    linkedin: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  console.log(formData);

  const handleAgeBlur = () => {
    // Calculate age based on current date of birth value
    const age = calculateAge(formData.dob);

    setFormData((prevState) => ({
      ...prevState,
      Age: age,
    }));
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const config = {
  //         method: "get",
  //         url: "https://api.countrystatecity.in/v1/countries",
  //         headers: {
  //           "X-CSCAPI-KEY": "f796cd27f4ef27194bcb4af75e6c2062",
  //         },
  //       };
  //       const response = await axios(config);
  //       alert(JSON.stringify(response.data));
  //       console.log(JSON.stringify(response.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [Data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/TL/TLData?tlid=${tlid}`
      );
      const Data = response.data.data;
      setData(Data);
      // Update form data with the first project data
      if (Data.length > 0) {
        setFormData({
          fname: Data[0].TL_fname,
          lname: Data[0].TL_lname,
          role: Data[0].role,
          dob: Data[0].Date_of_birth,
          Age: Data[0].Age,
          state: Data[0].null,
          country: Data[0].country,
          city: Data[0].city,
          skills: Data[0].Skill,
          qualification: Data[0].Qualification,
          password: Data[0].Password,
          uid: Data[0].Uniq_id,
          email: Data[0].Email,
          phoneNumber: Data[0].Phone_number,
          companyName: Data[0].C_name,
          companyAddress: Data[0].company_address,
          instagram: Data[0].instagram,
          github: Data[0].github,
          twitter: Data[0].twitter,
          linkedin: Data[0].linkedin,
        });
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result =
      checkEmpty("fname", "First Name", "fnamespan") &&
      checkEmpty("lname", "Last Name", "lnamespan") &&
      checkEmpty("role", "Designation", "rolespan") &&
      checkEmpty("password", "Password", "pasawordspan") &&
      validateNumber("password", "pasawordspan") &&
      checkPasswordLength("password", "pasawordspan") &&
      checkEmpty("uid", "Uniq ID", "uidspan") &&
      validateNumber("uid", "uidspan") &&
      checkEmpty("email", "Email", "emailspan") &&
      validateEmail("email", "emailspan") &&
      checkEmpty("phoneNumber", "Phone Number", "phoneNumberspan") &&
      validatePhoneNumber("phoneNumber", "phoneNumberspan") &&
      checkEmpty("companyName", "Company Name", "companyNamespan");
    //  alert(result);
    if (result) {
      try {
        const formatteddob = formatDate(formData.dob);
        // alert(formatteddob);
        const response = await axios.post(
          "http://localhost:3001/TL/TLProfileUpdate",
          {
            ...formData,
            dob: formatteddob,
          }
        );
        var count = response.data.data.affectedRows;

        if (count === 1) {
          alert("Profile Updated Successfully");
          navigate("profile");
        } else {
          alert("Profile Updated Unsuccessfully");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative h-full bg-bgSky p-10">
      <div className="py-1 bg-blueGray-50">
        <div className="w-full px-4 mx-auto mt-10">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-2xl font-bold">
                  Edit Profile Form
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <h6 className="text-blueGray-400 text-lg mt-3 mb-6 font-bold uppercase">
                  Personal Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="fname"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        id="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="John Deo"
                      />
                      <span id="fnamespan" className="text-red-700"></span>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lname"
                        id="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="John Deo"
                      />
                      <span id="lnamespan" className="text-red-700"></span>
                    </div>
                  </div>

                  <div className="w-full  px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="role"
                      >
                        Designation
                      </label>
                      <input
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Team Leader"
                      />
                      <span id="rolespan" className="text-red-700"></span>
                    </div>
                  </div>
                  <div className=" w-full grid grid-col-2 grid-flow-col gap-8 px-4">
                    <div className="w-full mb-3">
                      <div className="relative w-full mb-3">
                        <label
                          className="block  text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="dob"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          value={formatDate(formData.dob)} // Potential source of error
                          onChange={handleChange}
                          onBlur={() => calculateAge("dob", "Age")}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Enter your Birthdate"
                        />
                        <span id="dobspan" className="text-red-700"></span>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="relative w-full mb-3">
                        <label
                          className="block  text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="Age"
                        >
                          Age
                        </label>
                        <input
                          type="text"
                          name="Age"
                          id="Age"
                          value={formData.Age} // Potential source of error
                          onChange={handleChange}
                          // Pass DOB value to calculate age
                          className="border-0 px-3 h-11 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="20"
                        />
                        <span id="agespan" className="text-red-700"></span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:gap-20 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 px-4 w-full">
                    <div className="w-full ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block  text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="city"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Surat"
                        />
                        <span id="cityspan" className="text-red-700"></span>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="relative w-full mb-3">
                        <label
                          className="block  text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="state"
                        >
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Gujarat"
                        />
                        <span id="statespan" className="text-red-700"></span>
                      </div>
                    </div>
                    <div className="w-full ">
                      <div className="relative w-full mb-3">
                        <label
                          className="block  text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="country"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="India"
                        />
                        <span id="countryspan" className="text-red-700"></span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="skills"
                      >
                        Skills
                      </label>
                      <input
                        type="text"
                        name="skills"
                        id="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Javascript,React"
                      />
                      <span id="skillsspan" className="text-red-700"></span>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="qualification"
                      >
                        Qualification
                      </label>
                      <input
                        type="text"
                        name="qualification"
                        id="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="BCA,MCA"
                      />
                      <span
                        id="qualificationspan"
                        className="text-red-700"
                      ></span>
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          id="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="12345"
                        />
                      </div>
                      <div
                        onClick={togglePasswordVisibility}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          top: "70%",
                          right: "10px",
                          transform: "translateY(-50%)",
                        }}
                      >
                        {passwordVisible ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye-slash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                          </svg>
                        )}
                      </div>
                      <span id="pasawordspan" className="text-red-700"></span>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="uid"
                      >
                        Uniq ID
                      </label>
                      <input
                        type="text"
                        name="uid"
                        id="uid"
                        value={formData.uid}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="222"
                      />
                      <span id="uidspan" className="text-red-700"></span>
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-lg mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="primeproject@gmail.com"
                      />
                      <span id="emailspan" className="text-red-700"></span>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <div className="relative flex items-center">
                        <span class="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-600">
                          91
                        </span>
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="pl-8 pr-4 py-2  border-0 px-3 h-11 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="97473899321"
                        />
                      </div>

                      <span
                        id="phoneNumberspan"
                        className="text-red-700"
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="instagram"
                      >
                        Instagram
                      </label>
                      <input
                        type="text"
                        name="instagram"
                        id="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="@PrimeProject123"
                      />
                      <span id="instagramspan" className="text-red-700"></span>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="github"
                      >
                        GitHub
                      </label>
                      <input
                        type="text"
                        name="github"
                        id="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="@Prime123"
                      />
                      <span id="githubspan" className="text-red-700"></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="twitter"
                      >
                        Twitter
                      </label>
                      <input
                        type="text"
                        name="twitter"
                        id="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Prime123"
                      />
                      <span id="twitterspan" className="text-red-700"></span>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="linkedin"
                      >
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        name="linkedin"
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Prime123"
                      />
                      <span id="linkedinspan" className="text-red-700"></span>
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-lg mt-3 mb-6 font-bold uppercase">
                  Professional Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="companyName"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Prime Project"
                      />
                      <span
                        id="companyNamespan"
                        className="text-red-700"
                      ></span>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="companyAddress"
                      >
                        Company Address
                      </label>
                      <input
                        type="text"
                        name="companyAddress"
                        id="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Udhna,Surat"
                      />
                      <span
                        id="companyAddressspan"
                        className="text-red-700"
                      ></span>
                    </div>
                  </div>
                </div>
                {/* <Link to=""> */}
                <button
                  className="bg-customBlue text-white text-sm font-bold  px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  type="submit"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
