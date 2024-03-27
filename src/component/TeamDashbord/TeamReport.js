import React, { useRef, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { HiOutlineCloudDownload } from "react-icons/hi";
import axios from "axios";

function TeamReport() {
  const [formData, setFormData] = useState({
    teamLeader: "",
    description: "",
    fileName: "",
  });
  console.log(FormData);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const drawerRef = useRef(null);
  const buttonRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
    setFormData((prevData) => ({
      ...prevData,
      fileName: file.name,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("excelFile", excelFile);
      formData.append("teamLeader", formData.teamLeader); // Change to formData.get("teamLeader")
      formData.append("description", formData.description); // Change to formData.get("description")
      
      // Make a POST request to update the Excel file and description
      await axios.post(``, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Reset form data after submission
      setFormData({
        teamLeader: "",
        description: "",
        fileName: "",
      });
      // Close drawer after submission
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error updating Excel file and description:", error);
      // Handle error
    }
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    drawerRef.current.focus();
  };

  const handleCloseForm = () => {
    setIsDrawerOpen(false);
    buttonRef.current.focus();
  };

  

  const [TeamLeaderList, setTeamLeaderList] = useState([]);
  const TeamLederList = async () => {
    try {
      const TeamID = sessionStorage.getItem("TeamID");
      const response = await axios.get(
        `http://localhost:3001/Team/TeamLeaderList?TeamId=${TeamID}`
      );
      const TeamLeaderList = response.data.data;
      setTeamLeaderList(TeamLeaderList);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };
  useEffect(() => {
    TeamLederList();
  }, []);
  return (
    <div className="w-full h-full mt-10">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4 h-screen">
        <div
          ref={drawerRef}
          id="drawer-right-example"
          className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          } bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[40%] xl:w-[40%] dark:bg-gray-800 border-l border-gray-300`}
        >
          <section className="bg-white w-full max-w-2xl p-7 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900 -mt-3">
                Report Send
              </h1>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={handleCloseForm}
              >
                <FaTimes />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="teamLeader"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Team Leader
                </label>
                <select
                  name="teamLeader"
                  id="teamLeader"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.teamLeader}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Project
                  </option>
                  {TeamLeaderList.map((TL) => (
                    <option key={TL.TL_ID} value={TL.TL_ID}>
                      {TL.TL_fname} {TL.TL_lname}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Description"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="file"
                  className="bg-cover bg-center bg-gray-50 border border-gray-300 border-dashed text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-10 cursor-pointer text-center relative z-10 flex flex-col justify-center items-center"
                  
                >
                  <HiOutlineCloudDownload className="w-14 h-14" />
                  <p className="mt-2">Drag & drop to upload or browse</p>
                </label>
              </div>
              {formData.fileName && (
                <p className="text-sm text-gray-600 mt-2">
                  {formData.fileName}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-customBlue text-white px-5 py-2.5 text-center rounded-md"
              >
                Send
              </button>
            </form>
          </section>
        </div>

        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-customBlue">
                Project Report
              </h2>
              <button
                ref={buttonRef}
                className="bg-customBlue text-white font-semibold p-2 rounded-md"
                onClick={openDrawer}
              >
                Send Report
              </button>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-blue-gray-200">
                  <tr>
                    <th className="p-2">TL Name</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">File Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">John Deo</td>
                    <td className="p-2">Description for John Deo's Report</td>
                    <td className="p-2">report_john_deo.pdf</td>
                  </tr>
                  <tr>
                    <td className="p-2">John Smith</td>
                    <td className="p-2">Description for John Smith's Report</td>
                    <td className="p-2">report_john_smith.pdf</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamReport;
