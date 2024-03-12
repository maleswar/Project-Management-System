import React from "react";

const TeamLeaderList = ({ teamLeaders }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {teamLeaders.map(({ id, logo, name, projectName, email }) => (
        <div key={id} className="bg-white shadow-lg rounded-xl p-4  border border-blue-gray-100">
          <img
            src={logo}
            alt={`Logo ${name}`}
            className="w-16 h-16 mx-auto mb-4"
          />
          <div className="text-center">
            <p className="font-bold text-lg mb-2">{name}</p>
            <p className="text-gray-600 mb-2">{projectName}</p>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamLeaderList;
