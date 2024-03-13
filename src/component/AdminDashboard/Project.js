import React, { useState,useEffect } from "react";
import axios from "axios";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Project = () => {
  const [project, setProject] = useState([]);

  const ProjectData = async () => {
    const tlid = sessionStorage.getItem("TLID");
    
    await axios.get(`http://localhost:3001/Project/ProjectData?tlid=${tlid}`).then((res) => {
      let list = res.data;
      let project = list.data;
      setProject(project);
      // (project);
    });
  };

  useEffect(() => {
    ProjectData();
  }, []);

  return (
    <div className="w-full h-screen pt-10">
      <div className="p-5 bg-bgSky h-full grid grid-cols-1 gap-y-4">
        <div className="w-full p-5 h-full  bg-bgSky">
          <div className="mx-auto bg-white  shadow-lg px-5 py-5 mt-7 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">Project Details</h2>
            <div className="overflow-auto">
              <table className="w-full text-left overflow-x-scroll ">
                <thead className="border-t border-b text-black border-gray-100 bg-gray-200">
                  <tr>
                    <th className="p-2  left-0">Project Id</th>
                    <th className="p-2  left-0 text-slate-700">Project Name</th>
                    <th className="p-2 text-slate-700">Start Date</th>
                    <th className="p-2 text-slate-700">End Date</th>
                    <th className="p-2 text-slate-700">Status</th>
                    <th className="p-2 text-slate-700">Description</th>
                    <th className="p-2 text-slate-700">Budget</th>
                    <th className="p-2 text-slate-700">Priority</th>
                    {/* <th className="p-2 text-slate-700">Action</th> */}
                  </tr>
                </thead>
                <tbody >
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
                        <td className="border-t border-b border-blue-gray-300">
                          {Start_date}
                        </td>{" "}
                        <td className="border-t border-b border-blue-gray-300">
                          {End_date}
                        </td>
                        <td className="border-t border-b border-blue-gray-300">
                          {Status}
                        </td>
                        <td className="border-t border-b border-blue-gray-300">
                          {Description}
                        </td>
                        <td className="border-t border-b border-blue-gray-300">
                          {Budget}
                        </td>
                        <td className="border-t border-b border-blue-gray-300">
                          {Priority}
                        </td>
                        {/* <td className="border-t border-b border-blue-gray-300">
                          <button><MdEditSquare className="h-7 w-6 "/>
                          
                          </button>
                        </td><td className="border-t border-b border-blue-gray-300">
                          <button><MdDelete  className="h-7 w-6 "/></button>
                        </td> */}
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
