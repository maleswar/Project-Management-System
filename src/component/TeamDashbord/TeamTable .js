import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



const TeamTable = () => {
  const { projectId,Project_name } = useParams();
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
    <div className="w-full mt-16">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4 h-screen">
        <div className="bg-white rounded-lg shadow-lg px-5 py-5 mt-5 mx-5">
          <h2 className="text-2xl font-bold mb-4 text-customBlue">
           {Project_name} Team Member
          </h2>
          <div className="overflow-auto">
            <table className="w-full text-left border border-black">
              <thead>
              <tr>
                      <th className="p-4  text-slate-700 ">Profile</th>
                      <th className="p-4  text-slate-700 ">Name</th>
                   
                      <th className="p-4  text-slate-700">Email</th>
                      <th className="p-4  text-slate-700">Designation</th>
                      <th className="p-4  text-slate-700">Phone Number</th>
                      <th className="p-4  text-slate-700">Qualification</th>
                      <th className="p-4  text-slate-700">Skills</th>
                      
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
                          <td className="border-t border-b font-semibold  border-blue-gray-300 p-4 ">
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
                          <td className="border-t border-b font-semibold  border-blue-gray-300 p-4 ">
                            {Team_name}
                          </td>
                          
                          <td className="border-t border-b font-semibold  border-blue-gray-300 px-9">
                            {Email}
                          </td>
                          <td className="border-t border-b font-semibold  border-blue-gray-300 px-3">
                            {Roles}
                          </td>
                          <td className="border-t border-b font-semibold  border-blue-gray-300 px-3">
                            {phone_number}
                          </td>
                          <td className="border-t border-b font-semibold  border-blue-gray-300 px-3">
                            {Qualification}
                          </td>
                          <td className="border-t border-b font-semibold  border-blue-gray-300 px-3">
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
  );
};

export default TeamTable;