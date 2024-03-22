import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import Welcome from "../AdminDashboard/Assest/Vector/Dashboard.png";
import Cards from "./Layouts/Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Editor } from "@tinymce/tinymce-react";
import {
  checkEmpty,
  validateDropdown,
  validateEmail,
  validatePhoneNumber,
} from "../../JS/FormValidation";

const Team = () => {
  const ID = sessionStorage.getItem("TLID");

  const [TeamMember, setTeamMember] = useState([]);
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    tlid: ID,
    name: "",
    email: "",
    phone: "",
    roles: "",
    qualification: "",
    skills: "",
  });
  const Roles = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Utilities/roles`);
      const roles = response.data.data;
      setRoles(roles);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };
  const openDrawer = () => {
    setFormData({
      tlid: ID,
      name: "",
      email: "",
      phone: "",
      roles: "",
      qualification: "",
      skills: "",
    });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const TeamMemberList = async () => {
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Team/TeamInformationForDashbord?tlid=${tlid}`
      );
      const TeamMember = response.data.data;
      setTeamMember(TeamMember);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };
  useEffect(() => {
    TeamMemberList();
    Roles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    var result =
      checkEmpty("name", "Name", "namespan") &&
      checkEmpty("email", "Email", "emailspan") &&
      validateEmail("email", "emailspan") &&
      checkEmpty("phone", "Phone Number", "phonespan") &&
      validatePhoneNumber("phone", "phonespan") &&
      validateDropdown("roles", "Designations", "rolespan") &&
      checkEmpty("qualification", "Qualification", "qualificationspan") &&
      checkEmpty("skills", "Skills", "skillsspan");
    // alert(result);
    if (result) {
      try {
        const response = await axios.post(
          "http://localhost:3001/Team/addNewTeamMember",
          formData
        );
        var count = response.data.data.affectedRows;

        if (count >= 1) {
          alert("Team Member Added Successfully");
        } else {
          alert("there are some error");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
    TeamMemberList();
  };

  const clearFields = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      roles: "",
      qualification: "",
      skills: "",
    });
  };

  // Close the drawer

  console.log(formData);

  const drawerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleCloseForm = () => {
    closeDrawer();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        buttonRef.current !== event.target
      ) {
        closeDrawer();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-screen pt-10">
      <div className="p-5 bg-bgSky h-full grid grid-cols-1 gap-y-4">
        <div className="w-full p-5 h-full">
          <div className="justify-end -mt-5">
            <button
              ref={buttonRef}
              className="float-end mx-4 bg-customBlue text-white font-semibold p-2 mt-5 rounded-md flex w-72 items-center"
              onClick={openDrawer}
            >
              <span>
                <FaPlus className="h-4 w-4 text-white mr-3" />
              </span>
              Add New Team Member
            </button>
          </div>
         
          <div
          ref={drawerRef}
          id="drawer-right-example"
          className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          } bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[40%] xl:w-[40%] dark:bg-gray-800 border-l border-gray-300`}
        >
            <section className="p-7">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-center text-gray-900 -mt-3">
                  Team Member Form
                </h1>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={handleCloseForm}
                >
                  <FaTimes />
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Here"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                  <span id="namespan" className="text-red-700"></span>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="xyz@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                  <span id="emailspan" className="text-red-700"></span>
                </div>
                <div>
                  <label
                    htmlFor="priority"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Phone Number
                  </label>
                  <div class="relative flex items-center">
                    <span class="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-600">
                      91
                    </span>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      class="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <span id="phonespan" className="text-red-700"></span>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:space-x-0 md:space-x-5  lg:space-x-5 ">
                  <div>
                    <label
                      htmlFor="teamid"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Designations
                    </label>
                    <select
                      name="roles"
                      id="roles"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={formData.roles}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select One
                      </option>
                      {roles.map((roles) => (
                        <option
                          key={roles.roles_names}
                          value={roles.roles_names}
                        >
                          {roles.roles_names}
                        </option>
                      ))}
                    </select>
                    <span id="rolespan" className="text-red-700"></span>
                  </div>

                  <div>
                    <label
                      htmlFor="priority"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      id="qualification"
                      placeholder="BCA , MCA"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />

                    <span
                      id="qualificationspan"
                      className="text-red-700"
                    ></span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="roles"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    placeholder="JAVA , REACT"
                    value={formData.skills}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />

                  <span id="skillsspan" className="text-red-700"></span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-customBlue text-white px-5 py-2.5 text-center rounded-md"
                >
                  Add Team Member
                </button>
              </form>
            </section>
          </div>

          <div className="w-full">
            <div className="mx-auto bg-white rounded-xl shadow-lg px-5 py-5 mt-7">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
                Team Members
              </h2>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead className="border-t border-b bg-gray-400">
                    <tr className="text-left">
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2 ">
                        Name
                      </th>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                        Email
                      </th>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                        Designation
                      </th>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                        Phone Number
                      </th>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                        Qualification
                      </th>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                        Skills
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {BudgetList.map(({ TL_fname, TL_lname, Budget, Project_name }, index) => ( */}
                    {TeamMember.map(
                      (
                        {
                          Team_name,
                          Email,
                          Roles,
                          Phone_number,
                          Qualification,
                          Skills,
                        },
                        index
                      ) => (
                        <tr key={index} className="text-left">
                          <td className="border border-blue-gray-300 p-2">
                            {Team_name}
                          </td>
                          <td className="border border-blue-gray-300 p-2">
                            {Email}
                          </td>
                          <td className="border border-blue-gray-300 p-2">
                            {Roles}
                          </td>
                          <td className="border border-blue-gray-300 p-2">
                            {Phone_number}
                          </td>
                          <td className="border border-blue-gray-300 p-2">
                            {Qualification}
                          </td>
                          <td className="border border-blue-gray-300 p-2">
                            {Skills}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
