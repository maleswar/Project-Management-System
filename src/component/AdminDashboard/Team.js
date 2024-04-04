import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import axios from "axios";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

import {
  checkEmpty,
  validateDropdown,
  validateEmail,
  validatePhoneNumber,
} from "../../JS/FormValidation";

const Team = () => {
  const ID = sessionStorage.getItem("TLID");
  const uid = sessionStorage.getItem("TLUID");
  const password = sessionStorage.getItem("Password");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [TeamId, setTeamId] = useState("");
  const [TeamMember, setTeamMember] = useState([]);
  const [roles, setRoles] = useState([]);
  const [ProjectName, setProjectName] = useState([]);

  const fetchProjectData = async () => {
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Project/ProjectNames?tlid=${tlid}`
      );
      const ProjectName = response.data.data;
      setProjectName(ProjectName);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handleEditClick = (teamId, teamName) => {
    setName(teamName);

    setTeamId(teamId);
    setShowModal(true);
  };
  // console.log(TeamId);
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    // Handle saving changes here
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    tlid: ID,
    name: "",
    email: "",
    phone: "",
    roles: "",
    qualification: "",
    skills: "",
    uid: uid,
    password: password,
    Active: "Active",
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
      uid: uid,
      password: password,
      Active: "Active",
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

  const [AllTeamMember, setAllTeamMember] = useState([]);
  const AllTeamMemberList = async () => {
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Team/TeamDataForTL?tlid=${tlid}`
      );
      const AllTeamMember = response.data.data;
      setAllTeamMember(AllTeamMember);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    TeamMemberList();
    Roles();
    fetchProjectData();
    AllTeamMemberList();
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
          AllTeamMemberList();
        } else {
          alert("there are some error");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
    closeDrawer();
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

  const DeleteTeam = async (Team_id) => {
    const result = window.confirm("Are You sure To Delete the Team Member");
    if (result) {
      const tlid = sessionStorage.getItem("TLID");
      const TeamId = Team_id;

      try {
        const response = await axios.post(
          `http://localhost:3001/Team/DeleteTeamMember?tlid=${tlid}&TeamId=${TeamId}`
        );
        var count = response.data.data.affectedRows;

        if (count >= 1) {
          alert("Team Member Deleted Successfully");
        } else {
          alert("there are some error");
        }
      } catch (err) {
        console.log(err);
      }
    }
    TeamMemberList();
    AllTeamMemberList();
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

  const [modalFormData, setModalFormData] = useState({
    teamid: "",
    projectid: "",
    roles: "",
  });

  const handleChangeForModal = (e) => {
    const { name, value } = e.target;
    setModalFormData({ ...modalFormData, [name]: value });
  };

  useEffect(() => {
    setModalFormData((prevFormData) => ({
      ...prevFormData,
      teamid: TeamId,
    }));
  }, [TeamId]);
  console.log(modalFormData);

  const handleUpdateChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/Team/TeamProjectUpdation",
        modalFormData
      );
      var count = response.data.data.affectedRows;

      if (count >= 1) {
        alert("Updation Successfully");
        TeamMemberList();
      } else {
        alert("there are some error");
      }
    } catch (err) {
      console.log(err);
    }
    TeamMemberList();
    handleModalClose();
    AllTeamMemberList();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500"; // Green color for completed projects
      case "Cancled":
        return "text-red-500"; // Red color for canceled projects
      case "Pending":
        return "text-blue-500"; // Blue color for ongoing projects
      default:
        return ""; // Default color if status doesn't match any case
    }
  };

  const getProjectColor = (projectName) => {
    switch (projectName) {
      case "ProjectA":
        return "text-red-500"; // Red color for ProjectA
      case "ProjectB":
        return "text-blue-500"; // Blue color for ProjectB
      case "ProjectC":
        return "text-green-500"; // Green color for ProjectC
      default:
        return ""; // Default color if project name doesn't match any case
    }
  };

  const exportToCSV = () => {
    // Define headings
    const headings = [
      "Team_id",
      "Name",
      "Email",
      "Role",
      "Phone Number",
      "Qualification",
      "Skills",
      "Profile Image",
      "Project Name",
      "Status",
    ];

    // Transpose the data
    let csvContent = headings.join(",") + "\n";
    TeamMember.forEach((project) => {
      Object.values(project).forEach((value, index) => {
        csvContent += index === 0 ? "" : ",";
        csvContent += value;
      });
      csvContent += "\n";
    });

    // Encode URI
    const encodedUri = encodeURI(csvContent);

    // Create Blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    // Trigger file download
    saveAs(blob, "Project_Team.csv");
  };

  const exportToCSV2 = () => {
    // Define headings
    const headings = [
      "Team id",
      "Uniq ID",
      "Email",
      "Team Name",
      "Phone Number",
      "Role",
      "Skills",
      "Qualification",
      "Task ID",
      "Password",
      "TL ID",
      "Project ID",
      "Profile Image",
      "Active",
      "Date Of Birth",
      "Age",
      "City",
      "State",
      "Country",
      "Instagram",
      "LinkedIn",
      "Github",
      "Twitter",
      "Company Address",
      "Company Name",
    ];

    // Transpose the data
    let csvContent = headings.join(",") + "\n";
    AllTeamMember.forEach((project) => {
      Object.values(project).forEach((value, index) => {
        csvContent += index === 0 ? "" : ",";
        csvContent += value;
      });
      csvContent += "\n";
    });

    // Encode URI
    const encodedUri = encodeURI(csvContent);

    // Create Blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    // Trigger file download
    saveAs(blob, "Team.csv");
  };
  return (
    <div className="w-full h-full pt-10">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4">
        <div className="w-full p-5 h-full">
          <div className="justify-end -mt-5">
            <button
              ref={buttonRef}
              className="float-end mx-4 bg-customBlue text-white font-semibold p-2 mt-5 rounded-md flex w-64 items-center"
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
            <div className="mx-auto bg-white rounded-xl shadow-lg px-5 py-5 mt-20">
              <div className="flex justify-between items-center mb-4">
                {/* Updated Code  */}
                <h2 className="text-2xl font-bold text-customBlue">
                  All Team Members
                </h2>
                <div className="justify-end -mt-5">
                  <button
                    onClick={exportToCSV2}
                    className="bg-blue-500 hover:bg-customBlue text-white font-bold py-2 px-4 rounded mt-3"
                  >
                    Export Data as CSV
                  </button>
                </div>
              </div>
              <div className="overflow-auto">
                <table className="w-full  overflow-x -scroll ">
                  <thead className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2 text-black text-left">
                    <tr>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700 ">
                        Profile
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700 ">
                        Name
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Email
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Designation
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Phone Number
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Qualification
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Skills
                      </th>
                      <th
                        className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700"
                        colSpan={2}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {BudgetList.map(({ TL_fname, TL_lname, Budget, Project_name }, index) => ( */}
                    {AllTeamMember.map(
                      (
                        {
                          Profile_image,
                          Team_id,
                          Team_name,
                          Email,
                          Roles,
                          phone_number,
                          Qualification,
                          Skills,
                        },
                        index
                      ) => (
                        <tr key={index} className="">
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Profile_image ? (
                              <img
                                src={require(`../../image/${Profile_image}`)}
                                alt="student profile"
                                className="h-10 w-10 rounded-full cursor-pointer"
                              />
                            ) : (
                              <span>No profile </span>
                            )}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Team_name}
                          </td>

                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Email}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Roles}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {phone_number}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Qualification}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Skills}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            <button
                              onClick={() =>
                                handleEditClick(Team_id, Team_name, Email)
                              }
                            >
                              <MdEditSquare className="h-7 w-6 " />
                            </button>
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            <button>
                              <MdDelete
                                className="h-7 w-6 "
                                onClick={() => DeleteTeam(Team_id)}
                              />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mx-auto bg-white rounded-xl shadow-lg px-5 py-5 mt-7">
              {/* Updated Code  */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-customBlue">
                  Project Assigned Team Members
                </h2>
                <div className="justify-end -mt-5">
                  <button
                    onClick={exportToCSV2}
                    className="bg-blue-500 hover:bg-customBlue text-white font-bold py-2 px-4 rounded mt-3"
                  >
                    Export Data as CSV
                  </button>
                </div>
              </div>
              <div className="">
                <table className="w-full  overflow-x -scroll text-left">
                  <thead className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                    <tr>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Profile
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Name
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Project Name
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Status
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Email
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Designation
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Phone Number
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Qualification
                      </th>
                      <th className="border-t border-b border-l border-r border-gray-700 bg-gray-300 p-2  text-slate-700">
                        Skills
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {BudgetList.map(({ TL_fname, TL_lname, Budget, Project_name }, index) => ( */}
                    {TeamMember.map(
                      (
                        {
                          Profile_image,
                          Team_id,
                          Team_name,
                          Project_name,
                          Status,
                          Email,
                          Roles,
                          Phone_number,
                          Qualification,
                          Skills,
                        },
                        index
                      ) => (
                        <tr key={index} className="">
                          <td className="border-t border-b border-l border-r border-gray-700 p-2 text-slate-700">
                            {Profile_image ? (
                              <img
                                src={require(`../../image/${Profile_image}`)}
                                alt="student profile"
                                className="h-10 w-10 rounded-full cursor-pointer"
                              />
                            ) : (
                              <span>No profile </span>
                            )}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Team_name}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Project_name}
                          </td>
                          <td
                            className={`border-t border-b border-l border-r border-gray-700 p-2  text-slate-700 ${getStatusColor(
                              Status
                            )}`}
                          >
                            {Status}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Email}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Roles}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Phone_number}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
                            {Qualification}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2  text-slate-700">
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

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg overflow-hidden shadow-xl h-fit w-1/2">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Assign Project To Team Member
                    </h3>
                    <button
                      onClick={handleModalClose}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <form onSubmit={handleUpdateChange}>
                    <div className="space-y-6">
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Team Member Name
                        </label>
                        <input
                          disabled
                          type="text"
                          placeholder="Name"
                          value={name}
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Project Names
                        </label>
                        <select
                          name="projectid"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          value={modalFormData.projectid}
                          onChange={handleChangeForModal}
                        >
                          <option value="" disabled>
                            Select Project
                          </option>
                          {ProjectName.map((project) => (
                            <option
                              key={project.Project_id}
                              value={project.Project_id}
                            >
                              {project.Project_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Designations
                        </label>
                        <select
                          name="roles"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          value={modalFormData.roles}
                          onChange={handleChangeForModal}
                        >
                          <option value="" disabled>
                            Select One
                          </option>
                          {roles.map((role) => (
                            <option
                              key={role.roles_names}
                              value={role.roles_names}
                            >
                              {role.roles_names}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
