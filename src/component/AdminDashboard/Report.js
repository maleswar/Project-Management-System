import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FaCommentDots } from "react-icons/fa";
function Report() {
  const [reportData, setReportData] = useState([]);
  const fetchReportData = async () => {
    const tlid = sessionStorage.getItem("TLID");

    await axios
      .get(`http://localhost:3001/TL/FetchTheReportData?tlid=${tlid}`)
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

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    // Extract date and time components
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();

    // Concatenate date and time
    const formattedDateTime = `${date}  ${time}`;

    return formattedDateTime;
  }

  function getFileColor(fileName) {
    const extension = fileName.split(".").pop().toLowerCase(); // Extract file extension

    switch (extension) {
      case "xlsx":
      case "xls":
        return "green"; // Return blue color for Excel files
      case "pdf":
        return "red"; // Return green color for PDF files
      case "docx":
        return "blue";
      case "ppt":
        return "orange"; // Return red color for Word files
      default:
        return "black"; // Return black color for other file types
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedUploadId, setSelectedUploadId] = useState(null);

  // Function to handle opening the modal
  const handleComment = (Upload_id) => {
    setSelectedUploadId(Upload_id); // Set the selected Upload_id
    setShowModal(true); // Open the modal
  };
  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle saving the comment
  // Function to handle saving the comment
  const handleSaveComment = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Perform the comment saving logic here
      // For example, you can make an API call to save the comment
      const response = await axios.post(
        `http://localhost:3001/TL/UpdateComment?comment=${comment}&uploadid=${selectedUploadId}`
      );
      var count = response.data.data.affectedRows;

      if (count >= 1) {
        alert("Updation Successfully");
      } else {
        alert("There was an error updating the comment");
      }
    } catch (err) {
      console.log(err);
      alert("There was an error updating the comment");
    }
   
    setComment(""); // Reset comment to empty string
  setSelectedUploadId(null);
    fetchReportData();
    handleCloseModal();
     // Close the modal after saving the comment
  };

  return (
    <div className="w-full h-full mt-10">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4 h-screen">
        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Project Report
            </h2>
            <div className="overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-blue-gray-200">
                  <tr>
                    <th className="p-2">Profile</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">TimeStamp</th>
                    <th className="p-2">Files</th>
                    <th className="p-2">Comments</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map(
                    ({
                      Upload_id,
                      Profile_image,
                      Team_name,
                      File_name,
                      Description,
                      Uploaded_at,
                      Comment,
                    }) => (
                      <tr key={Upload_id}>
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {Profile_image ? (
                            <img
                              src={require(`../../image/${Profile_image}`)}
                              alt="student profile"
                              className="h-10 w-10 rounded-full cursor-pointer ml-3"
                            />
                          ) : (
                            <span>No profile </span>
                          )}
                        </td>{" "}
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {Team_name}
                        </td>{" "}
                        <td className="border-t border-b font-semibold left-0 border-blue-gray-300 ">
                          {Description}
                        </td>{" "}
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {formatDateTime(Uploaded_at)}
                        </td>{" "}
                        <td
                          className="border-t border-b left-0 border-blue-gray-300 p-4"
                          title="Download"
                        >
                          <a
                            href={require(`../../Excel/${File_name}`)}
                            download={File_name}
                            target="_blank"
                            style={{ color: getFileColor(File_name) }} // Apply color as inline style
                          >
                            {File_name}
                          </a>
                        </td>
                        <td className="border-t border-b  left-0 border-blue-gray-300 p-4">
                          {Comment}
                        </td>
                        <td className="border-t border-b text-center border-blue-gray-300 p-4">
                          <FaCommentDots
                            className="w-6 h-6 ml-3"
                            onClick={() => handleComment(Upload_id)} // Pass a function reference
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-scroll">
                <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
                  <form className="p-8" onSubmit={handleSaveComment}>
                    <h2 className="text-lg font-semibold mb-4">Add Comment</h2>
                    {/* Comment input */}
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full h-32 bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500"
                      placeholder="Enter your comment here..."
                    ></textarea>
                    {/* Save button */}
                    <button
                      type="submit"
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Save
                    </button>
                    {/* Cancel button */}
                    <button
                      onClick={handleCloseModal}
                      className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
