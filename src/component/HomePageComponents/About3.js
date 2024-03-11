import { HiCheckBadge } from "react-icons/hi2";
import React, { useEffect } from "react";
import img from "./assets/Vector/About3.png";

function About3() {
 
  
  return (
    <div
      className="flex flex-col items-center lg:flex-row lg:px-32 px-5 -mt-1 sm:text-left lg:-mt-20"
      // data-aos="fade-up" data-aos="fade-left" data-aos="fade-right"
    >
      
      <div
        className="w-full lg:w-1/2 lg:order-2 mt-10 lg:mt-0 text-left lg:text-left"
        
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-customBlue sm:text-left">
          Time Tracking
        </h1>
        <h3 className="text-base sm:text-lg lg:text-xl font-medium pt-4 text-gray-600 sm:text-left">
          Accurate monitoring and optimizes overall time usage across your team.
        </h3>
        <div className="flex gap-2 font-normal mt-5 text-black sm:text-left">
          <HiCheckBadge size={20} className="text-customBlue" />
          Track Working Hours
        </div>
        {/* Add margin-bottom to create space between checklist items and image */}
        <div className="flex gap-2 font-normal text-black sm:text-left mt-3">
          <HiCheckBadge size={20} className="text-customBlue" />
          Project Progress
        </div>
        <div className="flex gap-2 font-normal text-black sm:text-left mt-3">
          <HiCheckBadge size={20} className="text-customBlue" />
          Bill Clients Accurately
        </div>
        <div className="flex gap-2 font-normal text-black sm:text-left mt-3">
          <HiCheckBadge size={20} className="text-customBlue" />
          Improve Efficiency
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:order-1" >
        <img src={img} alt="" className="md:h-max lg:h-screen" />
      </div>
    </div>
  );
}

export default About3;
