import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

const Project = () => {
  const [project, setProject] = useState([]);

  const ProjectData = async () => {
    const tlid = sessionStorage.getItem("TLID");

    await axios
      .get(`http://localhost:3001/Project/ProjectData?tlid=${tlid}`)
      .then((res) => {
        let list = res.data;
        let project = list.data;
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
          `http://localhost:3001/Project/ProjectInactive?tlid=${tlid}&Project_id=${Project_id}`,
          
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
    alert(Project_id);
  };
   // Function to format the timestamp
   const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Customize this based on your formatting needs
  };

  useEffect(() => {
    ProjectData();
  }, []);

  return (
    <div className="w-full h-screen pt-10">
      <div className="p-5 bg-bgSky h-full grid grid-cols-1 gap-y-4 w-full">
        <div className="w-full p-5 h-full  bg-bgSky">
          <div className=" bg-white  shadow-lg px-5 py-5 mt-7 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Project Details
            </h2>
            <div className="overflow-auto">
              <table className="w-full text-left overflow-x -scroll ">
                <thead className="border-t border-b text-black border-gray-100 bg-gray-200">
                  <tr>
                    <th className="p-4  text-slate-700">Project Id</th>
                    <th className="p-4 text-slate-700">Project Name</th>
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
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {Project_id}
                        </td>{" "}
                        <td className="border-t border-b  left-0 border-blue-gray-300 ">
                          {Project_name}
                        </td>{" "}
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {formatTimestamp(Start_date)}
                        </td>{" "}
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4 ">
                          {formatTimestamp(End_date)}
                        </td>
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
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
                          <Link to="/AdminDashbord/EditProjectForm">
                            <button>
                              <MdEditSquare
                                className="h-7 w-6 "
                                onClick={() => handleEditClick(Project_id)}
                              />
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
