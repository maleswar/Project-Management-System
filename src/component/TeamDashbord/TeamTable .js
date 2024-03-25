import React from "react";

const TeamTable = () => {
  const teamMembers = [
    {
      name: "John Doe",
      email: "john@example.com",
      designation: "Software Engineer",
      phoneNumber: "9878677768",
      qualification: "Bachelor's in Computer Science",
      skills: "JavaScript, React, Node.js",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      designation: "UI/UX Designer",
      phoneNumber: "9876543210",
      qualification: "Bachelor's in Graphic Design",
      skills: "Adobe XD, Figma, Sketch",
    },
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      designation: "Project Manager",
      phoneNumber: "7898673743",
      qualification: "Master's in Business Administration",
      skills: "Leadership, Communication, Planning",
    },
    {
      name: "Bob Williams",
      email: "bob@example.com",
      designation: "Marketing Specialist",
      phoneNumber: "9755887950",
      qualification: "Bachelor's in Marketing",
      skills: "Social Media Marketing, SEO, Content Creation",
    },
    {
      name: "Emily Brown",
      email: "emily@example.com",
      designation: "Data Analyst",
      phoneNumber: "9655567994",
      qualification: "Bachelor's in Statistics",
      skills: "Data Analysis, SQL, Python",
    },
  ];

  return (
    <div className="w-full mt-16">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4 h-screen">
        <div className="bg-white rounded-lg shadow-lg px-5 py-5 mt-5 mx-5">
          <h2 className="text-2xl font-bold mb-4 text-customBlue">
            Team Member List
          </h2>
          <div className="overflow-auto">
            <table className="w-full text-left border border-black">
              <thead>
                <tr>
                  <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                    Name
                  </th>
                  <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                    Email
                  </th>
                  <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                    Designation
                  </th>
                  <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                    Phone Number
                  </th>
                  <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                    Qualification
                  </th>
                  <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                    Skills
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr>
                    <td className="p-2 border border-blue-gray-300">
                      {member.name}
                    </td>
                    <td className="p-2 border border-blue-gray-300">
                      {member.email}
                    </td>
                    <td className="p-2 border border-blue-gray-300">
                      {member.designation}
                    </td>
                    <td className="p-2 border border-blue-gray-300">
                      {member.phoneNumber}
                    </td>
                    <td className="p-2 border border-blue-gray-300">
                      {member.qualification}
                    </td>
                    <td className="p-2 border border-blue-gray-300">
                      {member.skills}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamTable;