import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import {
  checkEmpty,
  validateDropdown,
  validateNumber,
  validateDates,
} from "../../JS/FormValidation";
import { useNavigate } from "react-router-dom";


const EditProjectForm = () => {
 

  const ID = sessionStorage.getItem("TLID");
  const { projectId } = useParams();
  // alert(projectId);
  const [teamFormMember, setTeamFormMember] = useState([]);
  const [formData, setFormData] = useState({
    Project_id: projectId,
    projectName: "",
    Status: "",
    startDate: new Date(), // JavaScript Date object
    endDate: new Date(), // JavaScript Date object
   
    description: "",
    priority: "",
    budget: "",
    TL_ID: ID,
  });
  
  console.log(formData);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let result =
      checkEmpty("project-name", "Project Name", "projectnamespan") &&
      validateDropdown("Status", "Status", "statuspan") &&
      validateDates("start-date", "end-date", "datespan") &&
      
      checkEmpty("description", "Description", "descriptionspan") &&
      validateDropdown("priority", "Priority", "priorityspan") &&
      checkEmpty("budget", "Budget", "budgetspan") &&
      validateNumber("budget", "budgetspan");
  
    // alert(result);
    if (result) {
      try {
        // Format start date and end date before sending to backend
        const formattedStartDate = formatDate(formData.startDate);
        const formattedEndDate = formatDate(formData.endDate);
  
        const response = await axios.put(
          "http://localhost:3001/Project/UpdateTheProjectForm",
          {
            ...formData,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          }
        );
        var count = response.data.data.affectedRows;
  
        if (count === 1) {
          alert("Project Updated Successfully");
          navigate("/AdminDashbord/project");
        } else {
          alert("Project Updated Unsuccessfully");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
  };
  

  const fetchTeamMemberList = async () => {
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Team/TeamNames?tlid=${tlid}&ProjectId=${projectId}`
      );
      const teamFormMember = response.data.data;
      setTeamFormMember(teamFormMember);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const [project, setProject] = useState([]);

  const fetchProjectData = async () => {
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Project/ProjectDataForEditPage?tlid=${tlid}&Project_id=${projectId}`
      );
      const projectData = response.data.data;
      setProject(projectData);
      // Update form data with the first project data
      if (projectData.length > 0) {
        setFormData({
          Project_id:projectId,
          projectName: projectData[0].Project_name,
          Status: projectData[0].Status,
          startDate: projectData[0].Start_date,
          endDate: projectData[0].End_date,
          
          description: projectData[0].Description,
          priority: projectData[0].Priority,
          budget: projectData[0].Budget,
          TL_ID: ID,
        });
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    fetchTeamMemberList();
    fetchProjectData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleclose=()=>{
    navigate(-1);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="py-20 px-4 lg:px-16 bg-bgSky overflow-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 py-14 px-8 lg:px-11 rounded-2xl bg-white">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-2xl">
              Project Edit Form
            </h2>
            <div className="mt-10 grid gap-y-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-full">
                <label
                  htmlFor="project-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="projectName"
                    id="project-name"
                    value={formData.projectName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span id="projectnamespan" className="text-red-700"></span>
              </div>
              <div className="lg:col-span-full">
                <div className="grid grid-cols-2 gap-x-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="Status"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Status
                    </label>
                    <div className="mt-2">
                      <select
                        id="Status"
                        name="Status"
                        value={formData.Status}
                        onChange={handleChange}
                        className="block w-full h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Cancled</option>
                      </select>
                    </div>
                  </div>
                </div>
                <span id="statuspan" className="text-red-700"></span>
              </div>
              <div className="lg:col-span-full">
                <div className="grid grid-cols-2 gap-x-6">
                  <div className="col-span-1">
                    <label
                      htmlFor="start-date"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="start-date"
                      value={formatDate(formData.startDate)}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="end-date"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="end-date"
                      value={formatDate(formData.endDate)}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <span id="datespan" className="text-red-700"></span>
              </div>

             
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    autoComplete="description"
                    rows="3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <span id="descriptionspan" className="text-red-700"></span>
              </div>
              <div className="lg:col-span-full">
                <div className="grid grid-cols-2 gap-x-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="priority"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Priority
                    </label>
                    <div className="mt-2">
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="block w-full h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option>Low</option>
                        <option>Moderate</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <span id="priorityspan" className="text-red-700"></span>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Budget
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="budget"
                    id="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    autoComplete="budget"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <span id="budgetspan" className="text-red-700"></span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6">
            
            
            
            <button
            onClick={handleclose}
              type="button"
              className="text-sm w-1/2 font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
           
            <button
              type="submit"
              className="rounded-md w-1/2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;
