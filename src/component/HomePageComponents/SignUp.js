import React from "react";
import img from "./assets/Vector/SignUp.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {

  function checkEmpty(id, name) {
    let value = document.getElementById(id).value;
    if (value === "") {
      alert(name + " is Empty Please Check");
      document.getElementById(id).focus();
      return false;
    }
    return true;
  }
  
  const [value, setValues] = useState({
    fname: "",
    lname: "",
    companyname: "",
    email:"",
    uid:"",
    password:""
  });

  

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

// console.log(value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let result =
      checkEmpty("fname", "First Name") &&
      checkEmpty("lname", "Last Name") &&
      checkEmpty("companyname", "Company Name")&&
      checkEmpty("email","Email")&&
      checkEmpty("uid","Uniq ID")&&
      checkEmpty("password","Password");

    // alert(result);
    if (result) {
      try {
        const response = await axios.post("http://localhost:3001/Utilities/signup", value);
        var count = response.data.data.affectedRows;
        alert(count);
        
          navigate("/");
        
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
              
            </label>
            <label>
              Email
              <input
                type="email"
                id="email"
                name="email"
                className="p-2 rounded-lg w-full border"
                onChange={handleInput}
              />
              
            </label>

            <div className="flex">
              <label>
                Unique Id
                <input
                  type="number"
                  id="uid"
                  name="uid"
                  className="p-2 gap-2 rounded-lg  border"
                  onChange={handleInput}
                />
                
              </label>
              <label>
                Password
                <input
                  type="number"
                  id="password"
                  name="password"
                  className="p-2 rounded-lg  border"
                  onChange={handleInput}
                />
                
              </label>
            </div>

            <button className="bg-customBlue p-2 rounded-lg text-white font-semibold hover:scale-100 duration-300 mt-3">
              Sign Up
            </button>
            <div className="text-sm text-gray-500 mt-5">
              <p className="text-center">
                Already have an account?<a href="/login"> Login</a>
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