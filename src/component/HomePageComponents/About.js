import React from "react";
import img from "./assets/Vector/About.png";
import { HiCheckBadge } from "react-icons/hi2";

// About component
function About() {
  return (
    <div className="lg:mt-28">
      <div className="mb-14 mt-24">
              <h1 className="text-5xl font-bold  text-customBlue text-center">About Us</h1>

      </div>
      <div
        className="flex flex-col  items-center  px-5 lg:px-16 lg:flex-row-reverse "
        // data-aos="fade-up" data-aos="fade-left"
      >
        
        <div className="w-full lg:w-1/2 lg:mt-10 text-center lg:text-left md:-mt-60">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-customBlue text-left">
            Project Management
          </h1>
          <h3 className="text-base sm:text-lg lg:text-xl font-medium pt-4 text-gray-600 text-left">
            Optimize project management for efficiency, <br /> real-time
            insights, teamwork, and strategic planning.
          </h3>
          <div className="flex flex-col gap-2 font-normal mt-5 text-black sm:text-left">
            <div className="flex items-center">
              <HiCheckBadge size={20} className="text-customBlue" />
              <span className="ml-2">Make our processes work better</span>
            </div>
            <div className="flex items-center">
              <HiCheckBadge size={20} className="text-customBlue" />
              <span className="ml-2">Enhance long-term strategic planning</span>
            </div>
            <div className="flex items-center">
              <HiCheckBadge size={20} className="text-customBlue" />
              <span className="ml-2">Access data-driven insights</span>
            </div>
            <div className="flex items-center">
              <HiCheckBadge size={20} className="text-customBlue" />
              <span className="ml-2">Improve teamwork</span>
            </div>
          </div>
        </div>
        <div className="md:flex md:justify-center lg:-mt-28 lg:pr-10  h-1/2 sm:h-screen mt-4 md:mt-96">
          <img
            src={img}
            alt=""
            className="sm:ml-8 sm:mt-20 md:ml-10 md:h-max lg:h-screen"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
