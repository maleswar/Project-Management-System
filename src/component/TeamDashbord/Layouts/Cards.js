import React from "react";

function Cards({ title, value, children }) {
  return (
    <div className="flex items-center bg-white shadow-lg rounded-xl w-full h-32 mt-5 space-x-8">
      <div className="ml-5 flex items-center">{children}</div>

      <div className="flex flex-col justify-center">
        <p className="text-xl font-medium text-gray-600">{title}</p>
        <h4 className="text-lg font-bold text-customBlue">{value}</h4>
      </div>
    </div>
  );
}

export default Cards;