import { HiCheckBadge } from "react-icons/hi2";
import React  from "react";
import img from "./assets/Vector/About2.png";

function About2() {
  return (
    <div className="flex flex-col-reverse items-center  lg:flex-row-reverse " >
       <div className=" lg:order-1" >
        <img src={img} alt="" className="md:h-max lg:h-screen" />
      </div>
      <div className="w-full lg:w-1/2 lg:order-2 lg:text-left ml-9" >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:-mt-24 font-bold text-customBlue sm:text-left">
          Better Communication
        </h1>
        <h3 className="text-base sm:text-lg lg:text-xl font-medium pt-4 text-gray-600 sm:text-left">
          Enhances communication within the team and streamlines project collaboration.
        </h3>
        <div className="flex gap-2 font-normal mt-5 text-black sm:text-left">
          <HiCheckBadge size={20} className="text-customBlue" />
          <span className="ml-2">Centralized Communication Hub</span>
        </div>
        <div className="flex gap-2 font-normal text-black sm:text-left mt-3">
          <HiCheckBadge size={20} className="text-customBlue" />
          <span className="ml-2">Real-time Updates</span>
        </div>
        <div className="flex gap-2 font-normal text-black sm:text-left mt-3">
          <HiCheckBadge size={20} className="text-customBlue" />
          <span className="ml-2">Collaborative Spaces</span>
        </div>
        <div className="flex gap-2 font-normal text-black sm:text-left mt-3">
          <HiCheckBadge size={20} className="text-customBlue" />
          <span className="ml-2">Client Engagement</span>
        </div>
      </div>
     
    </div>
  );
}

export default About2;
