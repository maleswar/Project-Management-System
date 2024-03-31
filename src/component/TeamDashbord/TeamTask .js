import React, { useState, useEffect, useRef } from "react";

import Task from "./Assest/Vector/Task.png";
import Cards from "./Layouts/Cards";
import { FaCommentDots } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
const TeamTask = () => {
  const { projectId } = useParams();
  // const [formData, setFormData] = useState({
  //   pname: "",
  //   startDate: "",
  //   endDate: "",
  //   tlName: "",
  //   priority: "",
  //   budget: "",
  //   description: "",
  // });

  // const drawerRef = useRef(null);
  // const buttonRef = useRef(null);
  // const [isDrawerOpen, setDrawerOpen] = useState(false);

  // const openDrawer = () => {
  //   setFormData({
  //     taskId: "",
  //     name: "",
  //     startDate: "",
  //     endDate: "",
  //     priority: "",
  //     progress: "",
  //     comments: "",
  //   });
  //   setDrawerOpen(true);
  // };

  // const closeDrawer = () => {
  //   setDrawerOpen(false);
  // };

  // //handle

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleCloseForm = () => {
  //   closeDrawer();
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission
  //   // ...

  //   // Reset form after submission
  //   setFormData({
  //     taskId: "",
  //     name: "",
  //     startDate: "",
  //     endDate: "",
  //     priority: "",
  //     progress: "",
  //     comments: "",
  //   });

  //   // Close the drawer
  //   closeDrawer();
  // };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       drawerRef.current &&
  //       !drawerRef.current.contains(event.target) &&
  //       buttonRef.current !== event.target
  //     ) {
  //       closeDrawer();
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // const data = React.useMemo(
  //   () => [
  //     {
  //       taskId: "1",
  //       taskName: "Task A",
  //       endDate: "2024-03-25",
  //       priority: "Low",
  //     },
  //     {
  //       taskId: "2",
  //       taskName: "Task B",
  //       endDate: "2024-03-28",
  //       priority: "High",
  //     },
  //     {
  //       taskId: "3",
  //       taskName: "Task C",
  //       endDate: "2024-03-30",
  //       priority: "Low",
  //     },
  //   ],
  //   []
  // );

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Task Id",
  //       accessor: "taskId",
  //     },
  //     {
  //       Header: "Task Name",
  //       accessor: "taskName",
  //     },
  //     {
  //       Header: "End Date",
  //       accessor: "endDate",
  //     },
  //     {
  //       Header: "Priority",
  //       accessor: "priority",
  //     },
  //   ],
  //   []
  // );

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable({ columns, data }, useSortBy);
  const [totalCompletedTask, setTotalCompletedTask] = useState(null);
  const [totalPendingTask, setTotalPendingTask] = useState(null);
  const [totalCancelTask, setTotalCancelTask] = useState(null);
  const [AlertTask, setAlertTask] = useState([]);
  const [AllTask, setAllTask] = useState([]);
  const CompletedTask = async () => {
    const teamid = sessionStorage.getItem("TeamID");
    try {
      const response = await axios.get(
        `http://localhost:3001/Task/TeamTaskCompleted?teamid=${teamid}&projectId=${projectId}`
      );
      const TaskCompleted = response.data.data[0]["count(*)"];
      setTotalCompletedTask(TaskCompleted);
    } catch (error) {
      console.error("Error fetching Completed Task count:", error);
    }
  };

  const PendingTask = async () => {
    const teamid = sessionStorage.getItem("TeamID");

    try {
      const response = await axios.get(
        `http://localhost:3001/Task/TeamTaskPending?teamid=${teamid}&projectId=${projectId}`
      );
      const totalPendingTask = response.data.data[0]["count(*)"];
      setTotalPendingTask(totalPendingTask);
    } catch (error) {
      console.error("Error fetching Pending Task count:", error);
    }
  };

  const CancledTask = async () => {
    const teamid = sessionStorage.getItem("TeamID");

    try {
      const response = await axios.get(
        `http://localhost:3001/Task/TeamTaskCancel?teamid=${teamid}&projectId=${projectId}`
      );
      const totalCancelTask = response.data.data[0]["count(*)"];
      setTotalCancelTask(totalCancelTask);
    } catch (error) {
      console.error("Error fetching CompleteProject count:", error);
    }
  };

  const AlertTableTask = async () => {
    try {
      const teamid = sessionStorage.getItem("TeamID");
      const response = await axios.get(
        `http://localhost:3001/Task/TeamAlertTableTask?teamid=${teamid}&projectId=${projectId}`
      );
      const AlertTask = response.data.data;
      setAlertTask(AlertTask);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const AllTaskList = async () => {
    try {
      const teamid = sessionStorage.getItem("TeamID");
      const response = await axios.get(
        `http://localhost:3001/Task/TeamTaskData?teamid=${teamid}&projectId=${projectId}`
      );
      const AllTask = response.data.data;
      setAllTask(AllTask);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    CompletedTask();
    PendingTask();
    CancledTask();
    AlertTableTask();
    AllTaskList();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" }; // Customize date format
    return date.toLocaleDateString(undefined, options); // Customize based on options
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-500"; // Green color for completed projects
      case "Cancel":
        return "text-red-500"; // Red color for canceled projects
      case "Pending":
        return "text-blue-500"; // Blue color for ongoing projects
      default:
        return ""; // Default color if status doesn't match any case
    }
  };
  const isDateCloser = (endDate) => {
    const today = new Date(); // Today's date
    const end = new Date(endDate); // End date

    // Calculate the difference in months between the end date and today's date
    const monthsDiff =
      (end.getFullYear() - today.getFullYear()) * 12 +
      (end.getMonth() - today.getMonth());

    // Check if the difference in months is less than or equal to 2
    if (monthsDiff <= 2) {
      return true;
    }

    return false;
  };



  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Function to handle opening the modal
  const handleComment = (Task_id) => {
    setSelectedTaskId(Task_id); // Set the selected Upload_id
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
        `http://localhost:3001/Task/CommentTaskData?Comment=${comment}&TaskID=${selectedTaskId}`
      );
      var count = response.data.data.affectedRows;

      if (count >= 1) {
        alert("Updation Successfully");
        handleCloseModal();
      } else {
        alert("There was an error updating the comment");
      }
    } catch (err) {
      console.log(err);
      alert("There was an error updating the comment");
    }

    setComment(""); // Reset comment to empty string
    setSelectedTaskId(null);
    CompletedTask();
    PendingTask();
    CancledTask();
    AlertTableTask();
    AllTaskList();
  };






  return (
    <div className="w-full h-full mt-16">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4">
        

        <h1 className="text-xl font-bold text-customBlue mb-2">
          Project Names Task
        </h1>
        {/* Welcome Card */}
        <div className="w-full">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg items-center">
            <div className="flex justify-center items-center sm:ml-0 lg:-ml-80 ">
              <img src={Task} alt="Illustration" className="w-60 h-60" />
            </div>
            <div className="sm:p-3 md:text-left sm:ml-0 lg:-ml-80 text-wrap">
              <h1 className="text-4xl font-bold text-customBlue mb-2">
                Hello, Task
              </h1>
              <p className="text-gray-600">
                Welcome to the Project Management Dashboard! Your hub for
                project progress, collaboration, and success. <br />
                Let's get started!
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="w-full">
          <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-10 mx-auto">
            <Cards title="Completed Task" value={totalCompletedTask}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 20 20"
              >
                <g fill="#0001FE" fillRule="evenodd" clipRule="evenodd">
                  <path
                    d="M3.278 9.121c.537-.536.95-1.562.935-2.32a2.65 2.65 0 0 1 .778-1.932a2.651 2.651 0 0 1 2.014-.775c.714.036 1.616-.31 2.12-.816a2.658 2.658 0 0 1 3.76 0c.505.505 1.406.852 2.12.816a2.651 2.651 0 0 1 2.015.775a2.65 2.65 0 0 1 .777 1.933c-.015.757.4 1.784.935 2.32a2.663 2.663 0 0 1-.006 3.765c-.528.528-.914 1.438-.928 2.184a2.65 2.65 0 0 1-.778 1.826a2.648 2.648 0 0 1-1.748.775c-.791.04-1.827.5-2.387 1.06a2.658 2.658 0 0 1-3.76 0c-.56-.56-1.595-1.02-2.386-1.06a2.648 2.648 0 0 1-1.748-.775a2.649 2.649 0 0 1-.778-1.824c-.015-.748-.406-1.664-.935-2.193a2.658 2.658 0 0 1 0-3.759"
                    opacity={0.2}
                  ></path>
                  <path d="M4.198 4.077a1.65 1.65 0 0 0-.485 1.205c.01.55-.13 1.132-.333 1.636c-.203.505-.506 1.022-.894 1.411a1.658 1.658 0 0 0 0 2.345c.71.711 1.206 1.873 1.227 2.879a1.654 1.654 0 0 0 1.575 1.621c.55.027 1.129.194 1.637.42c.507.225 1.019.542 1.408.931a1.658 1.658 0 0 0 2.345 0c.389-.389.9-.706 1.408-.932c.508-.225 1.087-.392 1.637-.419a1.653 1.653 0 0 0 1.575-1.623c.02-1.002.509-2.159 1.22-2.87a1.663 1.663 0 0 0 .007-2.352c-.388-.388-.69-.905-.894-1.41c-.204-.504-.344-1.087-.333-1.637a1.65 1.65 0 0 0-.486-1.205a1.651 1.651 0 0 0-1.256-.484c-.996.05-2.173-.402-2.878-1.107a1.658 1.658 0 0 0-2.345 0c-.705.705-1.882 1.157-2.878 1.107a1.651 1.651 0 0 0-1.257.484M2.713 5.3c.015.758-.398 1.785-.935 2.321a2.658 2.658 0 0 0 0 3.759c.53.529.92 1.445.935 2.192c.014.662.273 1.32.778 1.825a2.648 2.648 0 0 0 1.748.775c.791.04 1.827.499 2.387 1.06a2.658 2.658 0 0 0 3.759 0c.56-.561 1.596-1.02 2.387-1.06a2.648 2.648 0 0 0 1.748-.775a2.65 2.65 0 0 0 .777-1.826c.015-.747.4-1.656.929-2.184a2.663 2.663 0 0 0 .006-3.766c-.536-.536-.95-1.562-.934-2.32a2.65 2.65 0 0 0-.778-1.933a2.651 2.651 0 0 0-2.015-.775c-.714.036-1.615-.31-2.12-.816a2.658 2.658 0 0 0-3.76 0c-.504.506-1.406.852-2.12.816a2.651 2.651 0 0 0-2.014.775A2.65 2.65 0 0 0 2.713 5.3"></path>
                  <path d="M12.298 6.564a.5.5 0 0 1 .194.68l-2.777 5a.5.5 0 1 1-.874-.486l2.777-5a.5.5 0 0 1 .68-.194"></path>
                  <path d="M6.11 9.466a.5.5 0 0 1 .702-.078L9.59 11.61a.5.5 0 0 1-.625.781L6.188 10.17a.5.5 0 0 1-.078-.703"></path>
                </g>
              </svg>
            </Cards>
            <Cards title="Pending Task" value={totalPendingTask}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 20 20"
              >
                <g fill="#0001FE">
                  <path
                    d="M18.75 11a7 7 0 1 1-14 0a7 7 0 0 1 14 0"
                    opacity={0.2}
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0 1a7 7 0 1 0 0-14a7 7 0 0 0 0 14"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M10 6.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M13.5 10a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.5"
                    clipRule="evenodd"
                  ></path>
                </g>
              </svg>
            </Cards>
            <Cards title="Cancel Task" value={totalCancelTask}>
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
                  </g>
                  <path
                    fillRule="evenodd"
                    d="M6.175 2.5a.5.5 0 0 1 .5-.5h6.643a.5.5 0 0 1 .5.5v3.875a.5.5 0 0 1-.5.5H6.675a.5.5 0 0 1-.5-.5zm1 .5v2.875h5.643V3z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M4.5 5v12h11V5h-2V4h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2v1z"></path>
                  <path
                    fillRule="evenodd"
                    d="M12.284 9.088a.5.5 0 0 1 .128.696l-1.767 2.564a1 1 0 0 1-1.437.222l-1.515-1.175a.5.5 0 1 1 .614-.79L9.82 11.78l1.767-2.564a.5.5 0 0 1 .696-.128"
                    clipRule="evenodd"
                  ></path>
                  <path d="M1.15 1.878a.514.514 0 0 1 .728-.727l16.971 16.971a.514.514 0 0 1-.727.727z"></path>
                </g>
              </svg>
            </Cards>
          </div>
        </div>

        {/* Task Alert Table */}
        <div className="w-full">
          <div className="mx-auto bg-white rounded-lg shadow-lg px-5 py-5 mt-7">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Task Alert Table
            </h2>
            <div className="overflow-auto">
              <table
                
                className="w-full text-left border border-black"
              >
                <thead>
                <tr className="bg-gray-100">
                      <th className="p-2 text-gray-700 border border-blue-gray-300">
                        Task ID
                      </th>

                      <th className="p-2 text-gray-700 border border-blue-gray-300">
                        Task Name
                      </th>
                      <th className="p-2 text-gray-700 border border-blue-gray-300">
                        Description
                      </th>
                      <th className="p-2 text-gray-700 border border-blue-gray-300">
                        Start Date
                      </th>

                      <th className="p-2 text-gray-700 border border-blue-gray-300">
                        End Date
                      </th>

                      <th className="p-2 text-gray-700 border border-blue-gray-300">
                        Priority
                      </th>
                    </tr>
                </thead>
                <tbody >
                {AlertTask.map(
                    (
                      {
                        Task_id,
                        Task_name,
                        Description,
                        Start_date,
                        End_date,
                        Priority,
                      },
                    
                    ) => (
                      <tr key={Task_id}>
                        <td className="border border-blue-gray-300 p-2">
                          {Task_id}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Task_name}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Description}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {formatTimestamp(Start_date)}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {formatTimestamp(End_date)}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Priority}
                        </td>
                        
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Task Table */}
        <div className="w-full">
          <div className="mx-auto bg-white rounded-lg shadow-lg px-5 py-5 mt-7 relative">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Task Table
            </h2>
            <div className="overflow-auto">
              <table className="w-full text-left border border-black">
                <thead>
                  <tr>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Task Id
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Employee Name
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Description
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Start Date
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      End Date
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Priority
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Progress
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Comments
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {AlertTask.map(
                    (
                      {
                        Task_id,
                        Task_name,
                        Description,
                        Progress,
                        Start_date,
                        End_date,
                        Priority,
                        Comments,
                      },
                    
                    ) => (
                      <tr key={Task_id}>
                        <td className="border border-blue-gray-300 p-2">
                          {Task_id}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Task_name}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Description}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {formatTimestamp(Start_date)}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {formatTimestamp(End_date)}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Priority}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Progress}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Comments}
                        </td>
                        <td className="border-t border-b text-center border-blue-gray-300 p-4">
                          <FaCommentDots
                            className="w-6 h-6 ml-3"
                            onClick={() => handleComment(Task_id)} // Pass a function reference
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
};

export default TeamTask;