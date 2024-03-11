import React from "react";
import img from "./assets/Vector/HomeHero1.png";
import "./assets/css/home.css";

function MainHome() {
  return (
    <div className=" lg:flex lg:flex-row  w-screen sm:w-screen lg:overflow-hidden   ">
      <div className="lg:w-1/2 text-center w-full lg:text-left">
        <h1 className="font-bold text-customBlue text-2xl lg:pl-16 md:text-6xl lg:text-8xl sm:mt-5 md:mt-16">
          Empower Your Projects,
          <br />
          Elevate Your Team!
        </h1>
        <p className="text-customBluee sm:text-xl md:text-3xl lg:pl-16 lg:text-2xl mt-5 md:mt-10 lg:mt-5 ml-2 md:ml-4">
          PrimeProject simplifies managing your project, team, and client in one
          application.
        </p>
      </div>
      <div className="md:flex md:justify-center lg:-mt-28  lg:pt-10 h-1/2 sm:h-80">
        <img src={img} alt="" className="lg:h-screen md:h-max"/>
      </div>
    </div>
  );
}

export default MainHome;
