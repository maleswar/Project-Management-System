import React, { useState,useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "./Assest/img/Logo.svg";
import Profile from "./Assest/img/Profile.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

function TeamSidebar() {
  const [Name, setName] = useState("");
  const [ID, setID] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const Name = sessionStorage.getItem("TeamName");
    const ID = sessionStorage.getItem("TeamID");
    if (Name === null || ID===null) {
      navigate("/login");
    }else{
      setName(Name);
      setID(ID);
    }
    
  }, []);

  const [imageUrl, setImageUrl] = useState(null);
  const fetchImage = async () => {
    const ID = sessionStorage.getItem("TeamID");
    try {
      const response = await axios.get(
        `http://localhost:3001/Team/TeamData?teamid=${ID}`
      );
      const imageUrl = response.data.data[0].Profile_image; // Retrieve imageUrl from the response
      setImageUrl(imageUrl);
      // alert(imageUrl); // Set the imageUrl state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);




  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const SignOut = () => {
    var result = window.confirm("Are You Sure to Logout");
    if (result) {
      sessionStorage.removeItem("TeamID");
      sessionStorage.removeItem("TeamName");
      navigate("/");
    }
  };

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
                    {imageUrl && (
                      <img
                        src={require(`../../image/${imageUrl}`)}
                        alt="student profile"
                        className="h-10 w-10 rounded-full cursor-pointer"
                      />
                    )}
                    
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
                    <p className="text-sm text-gray-900 w-44" role="none">
                    {Name}
                    </p>
                    
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link to="profile">
                      <a
                        
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        My Profile
                      </a></Link>
                    </li>
                    <li
                      onClick={SignOut}
                      className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
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
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <div className="flex-1">
              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 20 20"
                  >
                    <g fill="#0001FE">
                      <path
                        d="M3.889 11H2.5a.5.5 0 0 1-.33-.875l8.5-7.5a.5.5 0 0 1 .66 0l8.5 7.5a.5.5 0 0 1-.33.875h-1.389v7a.5.5 0 0 1-.5.5H4.39a.5.5 0 0 1-.5-.5z"
                        opacity={0.2}
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M1 10h1.389v7a.5.5 0 0 0 .5.5H16.11a.5.5 0 0 0 .5-.5v-7H18a.5.5 0 0 0 .33-.875l-8.5-7.5a.5.5 0 0 0-.66 0l-8.5 7.5A.5.5 0 0 0 1 10m1.889-1h-.567L9.5 2.667L16.678 9h-.567a.5.5 0 0 0-.5.5v7H3.39v-7a.5.5 0 0 0-.5-.5"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M10.708 11.5h-2.5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1m-2.5 5v-4h2.5v4z"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>

                  <div className="text-xl font-semibold text-customBlue ml-3">
                    <span>Home</span>
                  </div>
                </Link>
              </div>

              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="project" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 20 20"
                  >
                    <g fill="#0001FE">
                      <path
                        d="M12.219 7.5H17.5A2.5 2.5 0 0 1 20 10v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17V7.5A2.5 2.5 0 0 1 6.5 5h2.84a2.5 2.5 0 0 1 2.17 1.26z"
                        opacity={0.2}
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M15.5 5.5h-5.281L9.51 4.26A2.5 2.5 0 0 0 7.34 3H4.5A2.5 2.5 0 0 0 2 5.5V15a2.5 2.5 0 0 0 2.5 2.5h11A2.5 2.5 0 0 0 18 15V8a2.5 2.5 0 0 0-2.5-2.5m-11 11A1.5 1.5 0 0 1 3 15V5.5A1.5 1.5 0 0 1 4.5 4h2.84a1.5 1.5 0 0 1 1.302.756l.852 1.492a.5.5 0 0 0 .435.252H15.5A1.5 1.5 0 0 1 17 8v7a1.5 1.5 0 0 1-1.5 1.5z"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>

                  <div className="text-xl font-semibold text-customBlue ml-3">
                    <span>Project</span>
                  </div>
                </Link>
              </div>

              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="task" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 20 20"
                  >
                    <g fill="#0001FE">
                      <g opacity={0.2}>
                        <path
                          fillRule="evenodd"
                          d="M8 4.351c0-.47.414-.851.926-.851h6.148c.512 0 .926.381.926.851V7.65c0 .47-.414.851-.926.851H8.926C8.414 8.5 8 8.119 8 7.649z"
                          clipRule="evenodd"
                        ></path>
                        <path d="M6.462 19h10.577c.53 0 .961-.448.961-1V6c0-.552-.43-1-.962-1H6.462C5.93 5 5.5 5.448 5.5 6v12c0 .552.43 1 .962 1"></path>
                        <path d="M20 15.75a4.25 4.25 0 1 1-8.5 0a4.25 4.25 0 0 1 8.5 0"></path>
                      </g>
                      <path
                        fillRule="evenodd"
                        d="M6.175 2.5a.5.5 0 0 1 .5-.5h6.643a.5.5 0 0 1 .5.5v3.875a.5.5 0 0 1-.5.5H6.675a.5.5 0 0 1-.5-.5zm1 .5v2.875h5.643V3z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M4.5 17V5h2V4h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h7.854a4.02 4.02 0 0 1-.819-1zm11-5.97c.35.045.685.133 1 .26V5a1 1 0 0 0-1-1h-2v1h2z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M15 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0 1a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M16.582 13.882a.5.5 0 0 1 .078.703l-1.106 1.382a1 1 0 0 1-1.488.082l-.696-.695a.5.5 0 0 1 .708-.707l.696.695l1.105-1.382a.5.5 0 0 1 .703-.078"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>

                  <div className="text-xl font-semibold text-customBlue ml-3">
                    <span>Task</span>
                  </div>
                </Link>
              </div>

              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="team" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 20 20"
                  >
                    <g fill="#0001FE">
                      <g opacity={0.2}>
                        <path d="M9.75 7.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                        <path
                          fillRule="evenodd"
                          d="M6.75 8.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M6.8 11.5A1.5 1.5 0 0 0 5.3 13v1.5a1 1 0 0 1-2 0V13a3.5 3.5 0 0 1 7 0v.5a1 1 0 1 1-2 0V13a1.5 1.5 0 0 0-1.5-1.5"
                          clipRule="evenodd"
                        ></path>
                        <path d="M12.75 7.75a3 3 0 1 0 6 0a3 3 0 0 0-6 0"></path>
                        <path
                          fillRule="evenodd"
                          d="M15.75 8.75a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0 2a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M15.7 11.5a1.5 1.5 0 0 1 1.5 1.5v1.5a1 1 0 1 0 2 0V13a3.5 3.5 0 0 0-7 0v.5a1 1 0 1 0 2 0V13a1.5 1.5 0 0 1 1.5-1.5"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M11.3 14.25a1.5 1.5 0 0 0-1.5 1.5v1.5a1 1 0 0 1-2 0v-1.5a3.5 3.5 0 0 1 7 0v1.5a1 1 0 1 1-2 0v-1.5a1.5 1.5 0 0 0-1.5-1.5"
                          clipRule="evenodd"
                        ></path>
                        <path d="M14.25 10.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                        <path
                          fillRule="evenodd"
                          d="M11.25 11.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                          clipRule="evenodd"
                        ></path>
                        <path d="M4.25 11.5h5v4h-5zm9 0h5v4h-5z"></path>
                        <path d="M9.25 13.5h4l.5 4.75h-5z"></path>
                      </g>
                      <path
                        fillRule="evenodd"
                        d="M5 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M3.854 8.896a.5.5 0 0 1 0 .708l-.338.337A3.47 3.47 0 0 0 2.5 12.394v1.856a.5.5 0 1 1-1 0v-1.856a4.47 4.47 0 0 1 1.309-3.16l.337-.338a.5.5 0 0 1 .708 0m11.792-.3a.5.5 0 0 0 0 .708l.338.337A3.469 3.469 0 0 1 17 12.094v2.156a.5.5 0 0 0 1 0v-2.156a4.47 4.47 0 0 0-1.309-3.16l-.337-.338a.5.5 0 0 0-.708 0"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M14 9a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 1a3 3 0 1 1 0-6a3 3 0 0 1 0 6m-4.5 3.25a2.5 2.5 0 0 0-2.5 2.5v1.3a.5.5 0 0 1-1 0v-1.3a3.5 3.5 0 0 1 7 0v1.3a.5.5 0 1 1-1 0v-1.3a2.5 2.5 0 0 0-2.5-2.5"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M9.5 11.75a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                  <div className="text-xl font-semibold text-customBlue ml-3">
                    <span>Team</span>
                  </div>
                </Link>
              </div>

              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="message" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 20 20"
                  >
                    <g fill="#0001FE" fillRule="evenodd" clipRule="evenodd">
                      <path
                        d="M10.945 3.168a1 1 0 0 1 1.11 0L16.303 6H18a1 1 0 0 1 1 1v2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1V7a1 1 0 0 1 1-1h1.697z"
                        opacity={0.2}
                      ></path>
                      <path d="M2.5 8a.5.5 0 0 1 .5.5V17h14V8.5a.5.5 0 0 1 1 0v9a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5"></path>
                      <path d="M3 5.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v4.67a.5.5 0 0 1-.223.416l-6.5 4.33a.5.5 0 0 1-.554 0l-6.5-4.33A.5.5 0 0 1 3 10.17zM4 6v3.902l6 3.997l6-3.997V6z"></path>
                      <path d="M9.723 2.084a.5.5 0 0 1 .554 0l4.5 3l-.554.832L10 3.101L5.777 5.916l-.554-.832zm7.131 5.062l1 1l-.708.708l-1-1zm-13 .708l-1 1l-.708-.708l1-1zM6.75 8A.25.25 0 0 1 7 7.75h6a.25.25 0 1 1 0 .5H7A.25.25 0 0 1 6.75 8m.5 2a.25.25 0 0 1 .25-.25h5a.25.25 0 1 1 0 .5h-5a.25.25 0 0 1-.25-.25"></path>
                    </g>
                  </svg>
                  <div className="text-xl font-semibold text-customBlue ml-3">
                    <span>Message</span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="report" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 20 20"
                  >
                    <g fill="#0001FE">
                      <g opacity={0.2}>
                        <path d="M9.75 7.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                        <path
                          fillRule="evenodd"
                          d="M6.75 8.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M6.8 11.5A1.5 1.5 0 0 0 5.3 13v1.5a1 1 0 0 1-2 0V13a3.5 3.5 0 0 1 7 0v.5a1 1 0 1 1-2 0V13a1.5 1.5 0 0 0-1.5-1.5"
                          clipRule="evenodd"
                        ></path>
                        <path d="M12.75 7.75a3 3 0 1 0 6 0a3 3 0 0 0-6 0"></path>
                        <path
                          fillRule="evenodd"
                          d="M15.75 8.75a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0 2a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M15.7 11.5a1.5 1.5 0 0 1 1.5 1.5v1.5a1 1 0 1 0 2 0V13a3.5 3.5 0 0 0-7 0v.5a1 1 0 1 0 2 0V13a1.5 1.5 0 0 1 1.5-1.5"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M11.3 14.25a1.5 1.5 0 0 0-1.5 1.5v1.5a1 1 0 0 1-2 0v-1.5a3.5 3.5 0 0 1 7 0v1.5a1 1 0 1 1-2 0v-1.5a1.5 1.5 0 0 0-1.5-1.5"
                          clipRule="evenodd"
                        ></path>
                        <path d="M14.25 10.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                        <path
                          fillRule="evenodd"
                          d="M11.25 11.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                          clipRule="evenodd"
                        ></path>
                        <path d="M4.25 11.5h5v4h-5zm9 0h5v4h-5z"></path>
                        <path d="M9.25 13.5h4l.5 4.75h-5z"></path>
                      </g>
                      <path
                        fillRule="evenodd"
                        d="M5 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M3.854 8.896a.5.5 0 0 1 0 .708l-.338.337A3.47 3.47 0 0 0 2.5 12.394v1.856a.5.5 0 1 1-1 0v-1.856a4.47 4.47 0 0 1 1.309-3.16l.337-.338a.5.5 0 0 1 .708 0m11.792-.3a.5.5 0 0 0 0 .708l.338.337A3.469 3.469 0 0 1 17 12.094v2.156a.5.5 0 0 0 1 0v-2.156a4.47 4.47 0 0 0-1.309-3.16l-.337-.338a.5.5 0 0 0-.708 0"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M14 9a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 1a3 3 0 1 1 0-6a3 3 0 0 1 0 6m-4.5 3.25a2.5 2.5 0 0 0-2.5 2.5v1.3a.5.5 0 0 1-1 0v-1.3a3.5 3.5 0 0 1 7 0v1.3a.5.5 0 1 1-1 0v-1.3a2.5 2.5 0 0 0-2.5-2.5"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M9.5 11.75a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                  <div className="text-xl font-semibold text-customBlue ml-3">
                    <span>Report</span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center px-5 py-3 space-x-3 cursor-pointer">
                <Link to="calendar" className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 20 20"
                  >
                    <g fill="#0001FE">
                      <g opacity={0.2}>
                        <path d="M9.75 7.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                        <path
                          fillRule="evenodd"
                          d="M6.75 8.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M6.8 11.5A1.5 1.5 0 0 0 5.3 13v1.5a1 1 0 0 1-2 0V13a3.5 3.5 0 0 1 7 0v.5a1 1 0 1 1-2 0V13a1.5 1.5 0 0 0-1.5-1.5"
                          clipRule="evenodd"
                        ></path>
                        <path d="M12.75 7.75a3 3 0 1 0 6 0a3 3 0 0 0-6 0"></path>
                        <path
                          fillRule="evenodd"
                          d="M15.75 8.75a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0 2a3 3 0 1 1 0-6a3 3 0 0 1 0 6"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M15.7 11.5a1.5 1.5 0 0 1 1.5 1.5v1.5a1 1 0 1 0 2 0V13a3.5 3.5 0 0 0-7 0v.5a1 1 0 1 0 2 0V13a1.5 1.5 0 0 1 1.5-1.5"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M11.3 14.25a1.5 1.5 0 0 0-1.5 1.5v1.5a1 1 0 0 1-2 0v-1.5a3.5 3.5 0 0 1 7 0v1.5a1 1 0 1 1-2 0v-1.5a1.5 1.5 0 0 0-1.5-1.5"
                          clipRule="evenodd"
                        ></path>
                        <path d="M14.25 10.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                        <path
                          fillRule="evenodd"
                          d="M11.25 11.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 2a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                          clipRule="evenodd"
                        ></path>
                        <path d="M4.25 11.5h5v4h-5zm9 0h5v4h-5z"></path>
                        <path d="M9.25 13.5h4l.5 4.75h-5z"></path>
                      </g>
                      <path
                        fillRule="evenodd"
                        d="M5 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M3.854 8.896a.5.5 0 0 1 0 .708l-.338.337A3.47 3.47 0 0 0 2.5 12.394v1.856a.5.5 0 1 1-1 0v-1.856a4.47 4.47 0 0 1 1.309-3.16l.337-.338a.5.5 0 0 1 .708 0m11.792-.3a.5.5 0 0 0 0 .708l.338.337A3.469 3.469 0 0 1 17 12.094v2.156a.5.5 0 0 0 1 0v-2.156a4.47 4.47 0 0 0-1.309-3.16l-.337-.338a.5.5 0 0 0-.708 0"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M14 9a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 1a3 3 0 1 1 0-6a3 3 0 0 1 0 6m-4.5 3.25a2.5 2.5 0 0 0-2.5 2.5v1.3a.5.5 0 0 1-1 0v-1.3a3.5 3.5 0 0 1 7 0v1.3a.5.5 0 1 1-1 0v-1.3a2.5 2.5 0 0 0-2.5-2.5"
                        clipRule="evenodd"
                      ></path>
                      <path
                        fillRule="evenodd"
                        d="M9.5 11.75a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                  <div className="text-xl font-semibold text-customBlue ml-3">
                    <span>Calendar</span>
                  </div>
                </Link>
              </div>
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

export default TeamSidebar;