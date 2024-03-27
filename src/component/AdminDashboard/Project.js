import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Project = () => {
  const [project, setProject] = useState([]);

  const ProjectData = async () => {
    const tlid = sessionStorage.getItem("TLID");

    await axios
      .get(`http://localhost:3001/Project/ProjectData?tlid=${tlid}`)
      .then((res) => {
        let list = res.data;
        let project = list.data;
        project.sort((a, b) => a.Project_id - b.Project_id);
        setProject(project);
        // (project);
      });
  };

  const DeleteProject = async (Project_id) => {
    const tlid = sessionStorage.getItem("TLID");

    const Reply = window.confirm("Are You Sure to Delete The Project");
    if (Reply) {
      try {
        const response = await axios.put(
          `http://localhost:3001/Project/ProjectInactive?tlid=${tlid}&Project_id=${Project_id}`
        );
        var count = response.data.data.affectedRows;
        // alert(count);
        if (count === 1) {
          alert("Project Deleted Sucsessfully");
        } else {
          alert("there are some error");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
    ProjectData();
  };

  const handleEditClick = (Project_id) => {
    // alert(Project_id);
  };
  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" }; // Customize date format
    return date.toLocaleDateString(undefined, options); // Customize based on options
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
  const isDateCloser = (endDate) => {
    const today = new Date(); // Today's date
    const end = new Date(endDate); // End date
  
    // Calculate the difference in months between the end date and today's date
    const monthsDiff = (end.getFullYear() - today.getFullYear()) * 12 + (end.getMonth() - today.getMonth());
  
    // Check if the difference in months is less than or equal to 2
    if (monthsDiff <= 2) {
      return true;
    }
  
    return false;
  };

  useEffect(() => {
    ProjectData();
  }, []);

  return (
    <div className="w-full h-screen pt-10">
      <div className="p-5 bg-bgSky h-full grid grid-cols-1 gap-y-4 w-full">
        <div className="w-full p-7 h-full  bg-bgSky">
          <div className=" bg-white  shadow-lg px-7 py-5 mt-7 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Project Details
            </h2>
            <div className="overflow-auto">
              <table className="w-full text-left overflow-x -scroll ">
                <thead className="border-t border-b text-black border-gray-100 bg-gray-200">
                  <tr>
                    <th className="p-4  text-slate-700">Project Id</th>
                    <th className="p-4 text-slate-700">Project Name</th>
                    <th className="p-4 text-slate-700">Team Name</th>
                    <th className="p-4 text-slate-700">Start Date</th>
                    <th className="p-4 text-slate-700">End Date</th>
                    <th className="p-4 text-slate-700">Status</th>
                    <th className="p-4 text-slate-700">Description</th>
                    <th className="p-4 text-slate-700">Budget</th>
                    <th className="p-4 text-slate-700">Priority</th>
                    <th className="p-4 text-slate-700 text-center ">Action</th>
                    <th className="p-4 text-slate-700 "></th>
                  </tr>
                </thead>
                <tbody>
                  {project.map(
                    (
                      {
                        Project_id,
                        Project_name,
                        Team_name,
                        Start_date,
                        End_date,
                        Status,
                        Description,
                        Budget,
                        Priority,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 p-4">
                          {Project_id}
                        </td>{" "}
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {Project_name}
                        </td>{" "}
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {Team_name}
                        </td>{" "}
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {formatTimestamp(Start_date)}
                        </td>{" "}
                        <td className={`border-t border-b  left-0 border-blue-gray-300 p-4 ${isDateCloser(End_date) ? 'text-red-500' : ''}`}>
                          {formatTimestamp(End_date)}
                        </td>
                        <td
                          className={`border-t border-b  left-0 border-blue-gray-300 p-4 ${getStatusColor(
                            Status
                          )}`}
                        >
                          {Status}
                        </td>
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4 ">
                          {Description}
                        </td>
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {Budget}
                        </td>
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {Priority}
                        </td>
                        <td className="border-t border-b border-blue-gray-300 text-center">
                          <Link
                            to={`/AdminDashbord/EditProjectForm/${Project_id}`}
                          >
                            <button>
                              <MdEditSquare className="h-7 w-6" />
                            </button>
                          </Link>
                        </td>
                        <td className="border-t border-b border-blue-gray-300 text-center">
                          <button>
                            <MdDelete
                              className="h-7 w-6 "
                              onClick={() => DeleteProject(Project_id)}
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
      </div>
    </div>
  );
};

export default Project;
