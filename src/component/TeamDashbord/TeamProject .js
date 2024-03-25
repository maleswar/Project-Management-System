import React, { useState } from "react";

const TeamProject = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: "Project A",
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      status: "Completed",
      description: "abc",
      budget: "10,000",
      priority: "High",
    },
    {
      id: 2,
      projectName: "Project B",
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      status: "Pending",
      description: "xyz",
      budget: "100,00",
      priority: "Low",
    },
  ]);

  return (
    <div className="w-full h-full mt-10">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4">
        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7 rounded-lg h-screen">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Project Details
            </h2>
            <div className="overflow-auto">
              <table className="w-full text-left">
                <thead className="border-t border-b border-blue-gray-300">
                  <tr>
                    <th className="p-2 text-gray-700">Id</th>
                    <th className="p-2 text-gray-700">Project Name</th>
                    <th className="p-2 text-gray-700">Start Date</th>
                    <th className="p-2 text-gray-700">End Date</th>
                    <th className="p-2 text-gray-700">Status</th>
                    <th className="p-2 text-gray-700">Description</th>
                    <th className="p-2 text-gray-700">Budget</th>
                    <th className="p-2 text-gray-700">Priority</th>
                    <th className="p-2 text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr key={index}>
                      <td className="p-2">{project.id}</td>
                      <td className="p-2">{project.projectName}</td>
                      <td className="p-2">{project.startDate}</td>
                      <td className="p-2">{project.endDate}</td>
                      <td className="p-2">{project.status}</td>
                      <td className="p-2">{project.description}</td>
                      <td className="p-2">{project.budget}</td>
                      <td className="p-2">{project.priority}</td>
                      <td className="p-2">
                        <a
                          href={`/task/${project.id}`}
                          className="bg-customBlue text-white font-bold py-1.5 px-4 mx-2 rounded"
                        >
                          Task
                        </a>
                        <a
                          href={`/team/${project.id}`}
                          className="bg-customBlue text-white font-bold py-1.5 px-4 mx-2 rounded"
                        >
                          Team
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProject;
