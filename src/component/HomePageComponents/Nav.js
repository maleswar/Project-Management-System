import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { TfiMenu } from "react-icons/tfi";
import Logo from "./assets/Vector/Untitled_design__6_-removebg-preview (1).svg";
import { Outlet, Link } from "react-router-dom";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const ToggleMenu = () => {
    setMenu(!menu);
  };
  return (
    // <div className="lg:fixed top-0 left-0 right-0 bg-transparent">
      <div className="flex flex-row justify-between pt-5  ">
        <div className="flex items-center -mt-7  ml-0 sm:ml-0 lg:ml-10">
          <img
            src={Logo}
            alt="React Logo"
            style={{ height: "100px" }}
            className="-mr-7 -ml-7"
          />
          <ScrollLink
            to="/"
            spy={true}
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <h1 className="text-2xl font-bold text-black">
              Prime<span className="text-customBlue">Project</span>
            </h1>
          </ScrollLink>
        </div>
        <nav className="hidden  md:flex md:-ml-5 lg:gap-12  md:gap-3 font-semibold p-1 text-xl md:text-base lg:text-xl cursor-pointer md:mt-1">
          <ScrollLink
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-customBlue transition-all cursor-pointer "
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-customBlue transition-all cursor-pointer "
          >
            About
          </ScrollLink>
          <ScrollLink
            to="feacture"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-customBlue transition-all cursor-pointer "
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-customBlue transition-all cursor-pointer "
          >
            Contact Us
          </ScrollLink>
        </nav>
        <div className="hidden lg:flex flex-row lg:gap-8 lg:mr-12 md:flex  md:gap-2 md:justify-items-end">
          <div className="md:-ml-7">
            <Link to="/login">
             <button className="group px-5 rounded-lg h-10 md:-mr-7 lg:gap-8 text-customBlue text-lg bg-white lg:hover:bg-customBlue lg:hover:text-white font-semibold">
              Login
            </button>
            </Link>
           
          </div>
          <div>
            <Link to="/signup">
            <button className="group px-5 rounded-lg h-10 md:-mr-4 lg:gap-8 text-customBlue text-lg bg-white lg:hover:bg-customBlue lg:hover:text-white font-semibold">
              Signup
            </button>
            </Link>
            
          </div>
        </div>

        <div className="flex md:hidden " onClick={ToggleMenu}>
          <div className="p-2">
            <TfiMenu size={32} />
          </div>
        </div>

        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } md:hidden flex flex-col absolute bg-white left-0 top-20 font-medium text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 `}
        >
          <ScrollLink
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-customBlue transition-all cursor-pointer"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-customBlue transition-all cursor-pointer "
          >
            About
          </ScrollLink>
          <ScrollLink
            to="feacture"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-customBlue transition-all cursor-pointer "
          >
            Feactures
          </ScrollLink>
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-customBlue transition-all cursor-pointer "
          >
            Contact Us
          </ScrollLink>
          <div className="flex space-x-7 justify-center">
            <Link to="login">
            <button className="group px-5 rounded-lg h-10 lg:gap-8 md:gap-2 text-customBlue text-lg bg-white hover:bg-customBlue hover:text-white font-semibold">
              Login
            </button></Link>
            <Link to="signup">
            <button className="group px-5 rounded-lg h-10 lg:gap-8 md:gap-2 text-customBlue text-lg bg-white hover:bg-customBlue hover:text-white font-semibold">
              Signup
            </button></Link>
          </div>
        </div>
        <Outlet/>
      </div>
    // </div>
  );
};

export default Nav;
