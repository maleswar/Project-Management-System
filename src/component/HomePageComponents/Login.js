import React from "react";
import img from "./assets/Vector/Login.jpeg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  checkEmpty,
  validateEmail,
  validateRadio,
  validateNumber,
  togglePasswordVisibility,
} from "../../JS/FormValidation";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [value, setValues] = useState({
    email: "",
    role: "",
    uid: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(selectedOption);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let result =
      checkEmpty("email", "Email", "emailspan") &&
      validateEmail("email", "emailspan") &&
      validateRadio("team", "teamLeader", "radiospan") &&
      checkEmpty("uid", "Uniq ID", "uidspan") &&
      validateNumber("uid", "uidspan") &&
      checkEmpty("password", "Password", "passspan") &&
      validateNumber("password", "passspan");
    // alert(result);
    if (result) {
      try {
        const selectedOption = document.querySelector(
          'input[name="role"]:checked'
        );
        const selectedValue = selectedOption.value;

        if (selectedValue == "TL") {
          const response = await axios.post(
            "http://localhost:3001/Utilities/loginForTL",
            value
          );
          const userData = response.data.data[0];
          const tlId = userData.TL_Id;
          const tlFname = userData.TL_fname;
          const tlLname = userData.TL_lname;
          const status = response.status;
          // alert(status);
          if (status) {
            alert("Login Successful");
            sessionStorage.setItem("TLID", tlId);
            sessionStorage.setItem("TLName", tlFname + " " + tlLname);
            navigate("/AdminDashbord");
          } else {
            alert("Login Unsuccessful");
            console.log("Login Unsuccessful");
          }
        } else if (selectedValue == "Team") {
          const response = await axios.post(
            "http://localhost:3001/Utilities/loginForTeam",
            value
          );
          const userData = response.data.data[0];
          const TeamID = userData.Team_id;
          const TeamName = userData.Team_name;
          const status = response.status;
          if (status) {
            sessionStorage.setItem("TeamID", TeamID);
            sessionStorage.setItem("TeamName", TeamName);
            alert("Login Successfull");
            navigate("/TeamDashbord");
          } else {
            alert("Login Unsuccessfull");
          }
          // alert("team ");
        } else {
          alert("Login Unsuccessfull");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Login Unsuccefull");
      return false;
    }
  };
  console.log(value);

  return (
    <section
      className=" min-h-screen flex items-center justify-center"
      id="login"
    >
      {/* Login Container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-2xl md:max-w-2xl lg:max-w-6xl p-5">
        {/* Form */}
        <div className="sm:w-1/2 rounded-2xl px-16 2 bg-white">
          <h2 className="font-bold text-2xl sm:text-sm md:text-lg lg:text-2xl mt-16">
            Login
          </h2>
          <form
            className="flex flex-col gap-4 text-left mt-5"
            onSubmit={handleSubmit}
          >
            <label>
              Email ID
              <input
                type="text"
                name="email"
                id="email"
                className="p-2 rounded-lg w-full border"
                onChange={handleInput}

                // {...register("email", { required: true })}
              />
            </label>
            <span id="emailspan" className="text-red-700 email"></span>
            <div className="m-1">
              <div className="md:flex">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Team"
                    id="team"
                    className="form-radio h-4 w-4 text-indigo-600"
                    // checked={selectedOption === "team"}
                    onChange={handleInput}
                  />
                  <span className="ml-2">Team</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="role"
                    id="teamLeader"
                    value="TL"
                    className="form-radio h-4 w-4 text-indigo-600"
                    // checked={selectedOption === "TL"}
                    onChange={handleInput}
                  />
                  <span className="ml-2">Team Leader</span>
                </label>
              </div>
            </div>
            <span id="radiospan" className="text-red-700 tt"></span>
            <div className="flex flex-row gap-6">
              <div>
                <label>
                  Unique Id
                  <input
                    type="text"
                    name="uid"
                    id="uid"
                    className="p-2 rounded-lg w-full border"
                    onChange={handleInput}
                  />
                </label>
                <p id="uidspan" className="text-red-700 uid"></p>
              </div>

              <div>
                <label>
                  Password
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      className="p-2 rounded-lg w-full border"
                      onChange={handleInput}

                      // {...register("password")}
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {passwordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye-slash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p id="passspan" className="text-red-700 uid"></p>
                </label>
              </div>
            </div>

            <button className="bg-customBlue p-2 rounded-lg text-white font-semibold hover:scale-100 duration-300 mt-3">
              Login
            </button>
            <div className="text-sm text-gray-500 mt-5">
              {/* <p className="text-center">Forgot Password?</p> */}
              <p
                className="text-center  hover:text-black cursor-pointer "
                data-dialog-target="sign-in-dialog"
              >
                <Link to="/forgotpassword"> Forgot Password</Link>
              </p>
            </div>
            
            <div className="text-sm text-gray-500 mt-1 ">
              {/* <p className="text-center">Forgot Password?</p> */}
              <p className="text-center hover:text-black cursor-pointer">
                Don't have an account?<Link to="/signup"> Sign up</Link>
              </p>
            </div>
          </form>
        </div>
        {/* image */}
        <div className="w-1/2 sm:block hidden mt-0 md:mt-20 lg:mt-0">
          <img src={img} alt="image" />
        </div>
      </div>
    </section>
  );
}

export default Login;


