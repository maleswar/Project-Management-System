import React, { useRef, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { HiOutlineCloudDownload } from "react-icons/hi";
import axios from "axios";


function TeamReport() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const buttonRef = useRef(null);

  const [formData, setFormData] = useState({
    teamLeader: "",
    description: "",
    file: null,
    fileName: "",
    Active:"Active",
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
      fileName: file ? file.name : "",
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamID = sessionStorage.getItem("TeamID");

    try {
      const form = new FormData(); // Create a new FormData object

      // Append the values directly from the form data state
      form.append("file", formData.file);
      form.append("teamLeader", formData.teamLeader); 
      form.append("description", formData.description);
      form.append("Active",formData.Active);

      const response = await fetch(
        `http://localhost:3001/Team/updateTLExcelFile?teamID=${teamID}`,
        {
          method: "POST",
          body: form, // Use the FormData object
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update Excel file.");
      }

      const data = await response.json();
      alert("Excel file updated successfully:", data);
      
      // You can perform additional actions after successful update, like showing a success message or redirecting the user.
    } catch (error) {
      console.error("Error updating Excel file:", error.message);
      // Handle error, such as displaying an error message to the user.
    }
    setTimeout(() => {
      fetchReportData();
    }, 2000);
    
  };

  const [reportData, setReportData] = useState([]);
  const fetchReportData = async () => {
    const teamID = sessionStorage.getItem("TeamID");

    await axios
      .get(`http://localhost:3001/Team/FetchTheReportData?TeamId=${teamID}`)
      .then((res) => {
        let list = res.data;
        let reportData = list.data;
        setReportData(reportData);
        // (project);
      });
  };

  useEffect(() => {
    fetchReportData();
  }, []);

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

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    // Extract date and time components
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();

    // Concatenate date and time
    const formattedDateTime = `${date}  ${time}`;

    return formattedDateTime;
}
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
                  {TeamLeaderList.map((TeamMember) => (
                    <option key={TeamMember.TL_ID} value={TeamMember.TL_ID}>
                      {TeamMember.TL_fname} {TeamMember.TL_lname}
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
                  accept=".xlsx, .xls,.pdf,.doc,.docx"
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
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </section>
        </div>

        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-customBlue">
                Project Reports
              </h2>
              <button
                ref={buttonRef}
                className="bg-customBlue text-white font-semibold p-2 rounded-md"
                onClick={openDrawer}
              >
                Send Reports
              </button>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-blue-gray-200">
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">TL Name</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">TimeStamp</th>
                    <th className="p-2">Files</th>
                    <th className="p-2">Comment Of TL</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {reportData.map(
                    (
                      {
                        Upload_id,
                        TL_fname,
                        TL_lname,
                        Team_name,
                        File_name,
                        Description,
                        Uploaded_at,
                        Comment,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {Team_name}
                        </td>{" "}
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {TL_fname} {TL_lname}
                        </td>{" "}
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {Description}
                        </td>{" "}
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {formatDateTime(Uploaded_at)}
                        </td>{" "}
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4 " title="Download">
                          <a
                            href={require(`../../Excel/${File_name}`)}
                            download={File_name}
                            target="_blank"
                            className="text-blue-900"
                          >
                            {File_name}
                          </a>
                        </td>
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {Comment}
                        </td>
                        
                      </tr>
                    )
                  )}
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
