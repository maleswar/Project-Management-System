import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProjectWiseTeam = () => {
  const { projectId, Project_name } = useParams();
  const [TeamMember, setTeamMember] = useState([]);
  const TeamMemberList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Team/TeamDataProjectAccording?Projectid=${projectId}`
      );
      const TeamMember = response.data.data;
      setTeamMember(TeamMember);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };
  useEffect(() => {
    TeamMemberList();
  }, []);

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

  return (
    <div className="w-full h-full mt-10 bg-bgSky">
      <div className="p-5 grid grid-cols-1 gap-y-4 h-screen">
        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7 rounded-lg">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
                {Project_name} 's Team Member
              </h2>
              <div className="overflow-auto">
                <table className="w-full text-left border border-black">
                  <thead>
                    <tr>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Profile
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Name
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Email
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Designation
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Phone Number
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Qualification
                      </th>
                      <th className="border-t border-b border-l border-r bg-gray-300 border-gray-700 p-2">
                        Skills
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TeamMember.map(
                      (
                        {
                          Profile_image,
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
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
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
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {Team_name}
                          </td>

                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {Email}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {Roles}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {phone_number}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
                            {Qualification}
                          </td>
                          <td className="border-t border-b border-l border-r border-gray-700 p-2">
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

export default ProjectWiseTeam;
