import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { BiMessageDetail } from "react-icons/bi";
import { GoProjectRoadmap } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { GrTask } from "react-icons/gr";
import { MdInsertChartOutlined } from "react-icons/md";
import Logo from "./Assest/img/Logo.svg";
import Profile from "./Assest/img/Profile.jpg";
import { useNavigate } from "react-router-dom";


function Sidebar() {
const Name=sessionStorage.getItem("TLName");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };
  const navigate = useNavigate();

  const SignOut=()=>{
    var result=window.confirm("Are You Sure to Logout");
    if(result){
        sessionStorage.removeItem("TLID");
        sessionStorage.removeItem("TLName");
        sessionStorage.removeItem("TeamID");
        sessionStorage.removeItem("TeamName");
        navigate("/");
    }
  }
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="" className="flex ms-2 md:me-24">
                <img src={Logo} className="w-16 h-16" alt="PrimeProject Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl -ml-3">
                  Prime <span className="text-customBlue">Project</span>
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded-full"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={toggleProfile}
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={Profile}
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`z-50 mr-10 sm:mr-10 ${
                    profileOpen ? "" : "hidden"
                  } my-4 text-base list-none bg-white rounded shadow absolute`}
                  id="dropdown-user"
                  style={{
                    top: "70%",
                    left: "94%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 w-44 font-bold" role="none">
                      {Name}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {/* johndeo@gmail.com */}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <Link to="profile">
                      <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                        My Profile
                        {/* </a> */}
                      </li>
                    </Link>
                    {/* <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        My Contacts
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Account Settings
                      </a>
                    </li> */}
                    <li onClick={SignOut} className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign out
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-navyblue border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-navyblue">
          <ul className="space-y-2 font-medium">
            <div className="flex-1">
              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="/AdminDashbord" className="flex items-center">
                  <BiHome className="w-8 h-8 text-white" />

                  <div className="text-xl font-semibold text-white ml-3">
                    <span className="hover:underline">Home</span>
                  </div>
                </Link>
              </div>

              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="Message" className="flex items-center">
                  <BiMessageDetail className="w-8 h-8 text-white" />

                  <div className="text-xl font-semibold text-white ml-3">
                    <span className="hover:underline">Message</span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="team" className="flex items-center">
                <RiTeamLine className="w-8 h-8 text-white"/>
                  <div className="text-xl font-semibold text-white ml-3">
                    <span className="hover:underline">Team</span>
                  </div>
                </Link>
              </div>
              <hr className="mt-5" />

              <div className="flex items-center px-5 py-3 mt-12 space-x-3 cursor-pointer">
                <Link to="project" className="flex items-center">
                  <GoProjectRoadmap className="w-8 h-8 text-white" />

                  <div className="text-xl font-semibold text-white ml-3">
                    <span className="hover:underline">Project</span>
                  </div>
                </Link>
              </div>

              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link
                  to="project/task"
                  className="flex items-center"
                >
                  <GrTask className="w-8 h-8 text-white" />
                  <div className="text-xl font-semibold text-white ml-3">
                    <span className="hover:underline">Task</span>
                  </div>
                </Link>
              </div>
            

              {/* <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link
                  to="/AdminDashbord/project/tracking"
                  className="flex items-center"
                >
                  <MdInsertChartOutlined className="w-8 h-8 text-white" />
                  <div className="text-xl font-semibold text-white ml-3">
                    <span className="hover:underline">Tracking</span>
                  </div>
                </Link>
              </div> */}
            </div>
          </ul>
        </div>
      </aside>

      {/* Content */}
      <div className="sm:ml-64">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
