import React from "react";
import img from "./assets/Vector/SignUp.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";
import {
  checkEmpty,
  validateEmail,
  validateRadio,
  validateNumber,
  togglePasswordVisibility,
} from "../../JS/FormValidation";
import SignupEmail from "../../JS/SignupEmail";

function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [value, setValues] = useState({
    fname: "",
    lname: "",
    companyname: "",
    email: "",
    uid: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log(value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let result =
      checkEmpty("fname", "First Name", "firstNamespan") &&
      checkEmpty("lname", "Last Name", "lastNamespan") &&
      checkEmpty("companyname", "Company Name", "CompanyNamespan") &&
      checkEmpty("email", "Email", "emailspan") &&
      validateEmail("email", "emailspan")&&
      checkEmpty("uid", "Uniq ID", "uidspan") &&
      validateNumber("uid", "uidspan") &&
      checkEmpty("password", "Password", "passwordNamespan") &&
      validateNumber("password", "passwordNamespan");

    // alert(result);
    if (result) {
      try {
        const response = await axios.post(
          "http://localhost:3001/Utilities/signup",
          value
        );
        var count = response.data.data.affectedRows;
        SignupEmail(value);
       alert("Sign Up Sucsessfull");

        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
  };
  return (
    <section className=" min-h-screen flex items-center justify-center">
      {/* Login Container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-2xl md:max-w-2xl lg:max-w-6xl p-5">
        {/* Form */}
        <div className="sm:w-1/2 rounded-2xl px-16 2 bg-white">
          <h2 className="font-bold text-2xl sm:text-sm md:text-lg lg:text-2xl mt-16">
            Sign Up
          </h2>
          <form
            className="flex flex-col gap-4 text-left mt-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row gap-6">
              <label>
                First Name
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  className="p-2 rounded-lg w-full border"
                  onChange={handleInput}
                />
                <span id="firstNamespan" className="text-red-700"></span>
              </label>

              <label>
                Last Name
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  className="p-2 rounded-lg w-full border"
                  onChange={handleInput}
                />
                <span id="lastNamespan" className="text-red-700"></span>
              </label>
            </div>
            <label>
              Company Name
              <input
                type="text"
                id="companyname"
                name="companyname"
                className="p-2 rounded-lg w-full border"
                onChange={handleInput}
              />
              <span id="CompanyNamespan" className="text-red-700"></span>
            </label>
            <label>
              Email
              <input
                type="text"
                id="email"
                name="email"
                className="p-2 rounded-lg w-full border"
                onChange={handleInput}
              />
              <span id="emailspan" className="text-red-700"></span>
            </label>

            <div className="flex">
              <label>
                Unique Id
                <input
                  type="text"
                  id="uid"
                  name="uid"
                  className="p-2 gap-2 rounded-lg  border"
                  onChange={handleInput}
                />
                <span id="uidspan" className="text-red-700"></span>
              </label>
              <label>
                Password
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className="p-2 rounded-lg  border"
                    onChange={handleInput}
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
                <span id="passwordNamespan" className="text-red-700"></span>
              </label>
            </div>

            <button className="bg-customBlue p-2 rounded-lg text-white font-semibold hover:scale-100 duration-300 mt-3">
              Sign Up
            </button>
            <div className="text-sm text-gray-500 mt-5">
              <p className="text-center">
                Already have an account?<Link to="/login"> Login</Link>
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

export default SignUp;
