import React from "react";
import img from "./assets/Vector/Login.jpeg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [selectedOption, setSelectedOption] = useState("");

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
      checkEmpty("email", "Email") &&
      checkEmpty("uid", "Uniq ID") &&
      checkEmpty("password", "Password");
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
          const status=response.status;
          // alert(status);
          if(status===200){
          sessionStorage.setItem('TLID', tlId);
          sessionStorage.setItem('TLName', tlFname + " "+tlLname);
          navigate("/AdminDashbord");
          }else{
            alert("Login Unsuccessfull");
          }
          
        } else {

          const response = await axios.post(
            "http://localhost:3001/Utilities/loginForTeam",
            value
          );
          const userData = response.data.data[0];
          const TeamID = userData.Team_id;
          const TeamName = userData.Team_name;
          sessionStorage.setItem('TeamID', TeamID);
          sessionStorage.setItem('TeamName', TeamName);
          navigate("/TeamDashbord");
          // alert("team ");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
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
            <div className="m-1">
              <div className="md:flex">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Team"
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
                    value="TL"
                    className="form-radio h-4 w-4 text-indigo-600"
                    // checked={selectedOption === "TL"}
                    onChange={handleInput}
                  />
                  <span className="ml-2">Team Leader</span>
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-6">
              <label>
                Unique Id
                <input
                  type="number"
                  name="uid"
                  id="uid"
                  // value="manager"
                  className="p-2 rounded-lg w-full border"
                  // checked={selectedOption === 'Manager'}

                  onChange={handleInput}

                  // {...register("uniqid")}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-2 rounded-lg w-full border"
                  onChange={handleInput}

                  // {...register("password")}
                />
              </label>
            </div>

            <button className="bg-customBlue p-2 rounded-lg text-white font-semibold hover:scale-100 duration-300 mt-3">
              Login
            </button>
            <div className="text-sm text-gray-500 mt-5">
              {/* <p className="text-center">Forgot Password?</p> */}
              <p className="text-center">
                Don't have an account?<a href="/signup"> Sign up</a>
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
