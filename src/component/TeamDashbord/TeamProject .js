import React, { useState, useEffect } from "react";
import axios from "axios";
const TeamProject = () => {
  const [projects, setProjects] = useState([]);
  const ProjectData = async () => {
    try {
      const TeamID = sessionStorage.getItem("TeamID");
      const response = await axios.get(
        `http://localhost:3001/Project/TeamProjectData?teamid=${TeamID}`
      );
      const projects = response.data.data;
      setProjects(projects);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

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
    const monthsDiff =
      (end.getFullYear() - today.getFullYear()) * 12 +
      (end.getMonth() - today.getMonth());

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
    <div className="w-full h-full mt-10 bg-bgSky">
      <div className="p-5 grid grid-cols-1 gap-y-4 h-screen">
        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7 rounded-lg">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
                Project Details
              </h2>
              <div className="overflow-auto">
                <table className="w-full text-left">
                  <thead className="border-t border-b border-blue-gray-300">
                    <tr>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Id
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Project Name
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Start Date
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        End Date
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Status
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Description
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Budget
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Priority
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(
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
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {Project_id}
                          </td>{" "}
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {Project_name}
                          </td>{" "}
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {formatTimestamp(Start_date)}
                          </td>{" "}
                          <td
                            className={`border-t border-b border-l border-r border-gray-700 p-2 ${
                              isDateCloser(End_date) ? "text-red-500" : ""
                            }`}
                          >
                            {formatTimestamp(End_date)}
                          </td>
                          <td
                            className={`border-t border-b border-l border-r border-gray-700 p-2 ${getStatusColor(
                              Status
                            )}`}
                          >
                            {Status}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {Description}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {Budget}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {Priority}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            <a
                              href={`/TeamDashbord/task/${Project_id}/${Project_name}`}
                              className="bg-customBlue text-white font-bold py-1.5 px-4 mx-2 rounded"
                            >
                              Task
                            </a>
                            <a
                              href={`/TeamDashbord/team/${Project_id}/${Project_name}`}
                              className="bg-customBlue text-white font-bold py-1.5 px-4 mx-2 rounded"
                            >
                              Team
                            </a>
                            <a
                              href={`/TeamDashbord/report/${Project_id}/${Project_name}`}
                              className="bg-customBlue text-white font-bold py-1.5 px-4 mx-2 rounded"
                            >
                              Report
                            </a>
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

export default TeamProject;
