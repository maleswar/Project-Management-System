import React, { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

export function StepperWithContent() {
  const steps = [
    {
      description: "Project Details",
    },
    {
      description: "Team Members",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [projectData, setProjectData] = useState({
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    role: "",
    teamMembers: ["", "", "", ""],
  });

  const handleNext = () => setActiveStep((cur) => cur + 1);
  const handlePrev = () => setActiveStep((cur) => cur - 1);
  const handleFinish = () => setShowSuccess(true);
  const handleAddNewMember = () =>
    setProjectData((prevData) => ({
      ...prevData,
      teamMembers: [...prevData.teamMembers, ""],
    }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTeamMemberChange = (index, value) => {
    setProjectData((prevData) => {
      const newTeamMembers = [...prevData.teamMembers];
      newTeamMembers[index] = value;
      return { ...prevData, teamMembers: newTeamMembers };
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center md:h-screen">
      {showSuccess ? (
        <div className="text-center">
          <CheckIcon className="h-20 w-20 mx-auto text-green-500" />
          <p className="text-lg font-semibold mt-4">
            Thank you! Form submitted successfully.
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row rounded-2xl shadow-2xl md:max-w-xl lg:max-w-6xl p-5">
          {/* Step Indicator */}
          <div className="flex flex-col items-center lg:pr-10 lg:mt-32 lg:ml-10 relative">
            <Stepper
              activeStep={activeStep}
              orientation={
                windowWidth < 800 && windowWidth !== 0
                  ? "horizontal"
                  : "vertical"
              }
              className="gap-3"
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>
                    <div
                      className={`flex items-center ${
                        activeStep === index
                          ? "text-customBlue"
                          : "text-gray-300"
                      }`}
                      onClick={() => setActiveStep(index)}
                    >
                      <div>
                        <p className="text-sm md:text-base lg:text-xl font-normal">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          {/* Form Container */}
          <div className="flex flex-col w-full bg-white p-4 md:p-8 rounded-xl lg:w-[700px]">
            <div className="mt-4">
              {activeStep === 0 && (
                <div>
                  <label className="block mb-2">
                    Project Name:
                    <input
                      name="projectName"
                      value={projectData.projectName}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                    />
                  </label>
                  <label className="block mb-2">
                    Description:
                    <textarea
                      name="projectDescription"
                      value={projectData.projectDescription}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                    />
                  </label>
                  <div className="flex space-x-2 mb-2 md:space-x-4">
                    <div className="flex-1">
                      <label className="block mb-2">
                        Start Date:
                        <input
                          type="date"
                          name="startDate"
                          value={projectData.startDate}
                          onChange={handleChange}
                          className="border rounded p-2 w-full"
                        />
                      </label>
                    </div>
                    <div className="flex-1">
                      <label className="block mb-2">
                        End Date:
                        <input
                          type="date"
                          name="endDate"
                          value={projectData.endDate}
                          onChange={handleChange}
                          className="border rounded p-2 w-full"
                        />
                      </label>
                    </div>
                  </div>
                  <label className="block mb-2">
                    Role:
                    <select
                      name="role"
                      value={projectData.role}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                    >
                      <option value="">Select Role</option>
                      <option value="team">Team</option>
                      <option value="manager">Manager</option>
                    </select>
                  </label>
                </div>
              )}

              {activeStep === 1 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">
                      Welcome Your Team Members
                    </h2>
                  </div>
                  <div className="w-full">
                    {projectData.teamMembers.map((email, index) => (
                      <div key={index} className="mt-2">
                        <label>
                          Email:
                          <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                              handleTeamMemberChange(index, e.target.value)
                            }
                            className="border rounded p-2 w-full"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAddNewMember}
                    className="bg-customBlue text-white p-2 rounded w-full mt-3"
                  >
                    Add New Member
                  </button>
                </div>
              )}

                <div className="mt-4 flex flex-row items-center justify-between">
                    {activeStep > 0 && (
                    <button
                        className={px-2 py-1 rounded-md mb-2 bg-gray-300 cursor-not-allowed}
                        onClick={handlePrev}
                        disabled={activeStep === 0}
                    >
                        Prev
                    </button>
                    )}
                    {activeStep === steps.length - 1 ? (
                    <button
                        className={px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white w-20 md:w-32}
                        onClick={handleFinish}
                    >
                        Finish
                    </button>
                    ) : (
                    <button
                        className={px-2 py-1 rounded-md bg-customBlue text-white lg:w-full md:w-32}
                        onClick={handleNext}
                    >
                        Next
                    </button>
                    )}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StepperWithContent;