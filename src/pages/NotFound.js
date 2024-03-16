// NotFound.js
import React from "react";

import NotFoundIllustration from "../component/AdminDashboard/Assest/Vector/404.jpeg";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <img src={NotFoundIllustration} className="w-[500px] h-[500px] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          It seems like the page you are looking for might have been moved,
          deleted, or does not exist.
        </p>
        <p className="text-gray-600 mb-4">
          Let's get you back on track. You can return to the
          <a href="/" className="text-blue-500">
              homepage
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;