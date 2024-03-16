import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import Welcome from "../AdminDashboard/Assest/Vector/Dashboard.png";
import Cards from "./Layouts/Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Editor } from "@tinymce/tinymce-react";
import {
  checkEmpty,
  validateDropdown,
  validateNumber,
} from "../../JS/FormValidation";

const Dashboard = () => {
  const ID = sessionStorage.getItem("TLID");
  const Name = sessionStorage.getItem("TLName");

  const [totalProjectCount, setTotalProjectCount] = useState(null);
  const [totalTeamMember, setTotalTeamMember] = useState(null);
  const [projectCompleted, setProjectCompleted] = useState(null);
  const [projectPending, setProjectPending] = useState(null);
  const [projectCancled, setProjectCancled] = useState(null);
  const [BudgetList, setBudgetList] = useState([]);
  const [teamFormMember, setTeamFormMember] = useState([]);

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Plan project scope",
      completed: false,
    },
    {
      id: 2,
      text: "Create task list",
      completed: false,
    },
    {
      id: 3,
      text: "Design UI mockups",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState("");

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        text: newTask,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  };

  const TotalProject = async () => {

    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Project/ProjectCount?tlid=${tlid}`
      );
      const totalProjectCount = response.data.data[0]["count(*)"];
      // alert(totalProjectCount);
      setTotalProjectCount(totalProjectCount);
    } catch (error) {
      console.error("Error fetching project count:", error);
    }
  };

  const TotalMember = async () => {
  
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Team/TeamCount?tlid=${tlid}`
      );
      const totalTeamMember = response.data.data[0]["Count(*)"];
      // alert(totalProjectCount);
      setTotalTeamMember(totalTeamMember);
    } catch (error) {
      console.error("Error fetching project count:", error);
    }
  };

  const ProjectComplete = async () => {
    const tlid=sessionStorage.getItem("TLID");
    try {
      const response = await axios.get(
        `http://localhost:3001/Project/ProjectCompleteCount?tlid=${tlid}`
      );
      const projectCompleted = response.data.data[0]["count(*)"];
      setProjectCompleted(projectCompleted);
    } catch (error) {
      console.error("Error fetching CompleteProject count:", error);
    }
  };
  const ProjectCancled = async () => {
    const tlid=sessionStorage.getItem("TLID");
    try {
      const response = await axios.get(
        `http://localhost:3001/Project/ProjectCompleteCount?tlid=${tlid}`
      );
      const projectCancled = response.data.data[0]["count(*)"];
      setProjectCancled(projectCancled);
    } catch (error) {
      console.error("Error fetching CompleteProject count:", error);
    }
  };

  const ProjectPending = async () => {
    const tlid=sessionStorage.getItem("TLID");
    try {
      const response = await axios.get(
        `http://localhost:3001/Project/ProjectPendingCount?tlid=${tlid}`
      );
      const projectPending = response.data.data[0]["count(*)"];
      setProjectPending(projectPending);
    } catch (error) {
      console.error("Error fetching CompleteProject count:", error);
    }
  };

  const ProjectBudgetList = async () => {
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Project/ProjectBudgetList?tlid=${tlid}`
      );
      const BudgetList = response.data.data;
      setBudgetList(BudgetList);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const fetchTeamMemberList = async () => {
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Team/TeamNames?tlid=${tlid}`
      );
      const teamFormMember = response.data.data;
      setTeamFormMember(teamFormMember);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    // Call the functions when the component mounts
    TotalProject();
    TotalMember();
    ProjectComplete();
    ProjectBudgetList();
    ProjectCancled();
    fetchTeamMemberList();
    ProjectPending();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    startDate: new Date(), // Set startDate to the current date as a Date object
    endDate: new Date(),
    TlId: ID,
    description: "",
    budget: "",
    priority: "",
    teamid: "",
    Status:"Pending",
    Active:"Acttive",

  });

  console.log(formData);

  const drawerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      TlId: ID,
      description: "",
      budget: "",
      priority: "",
      teamid: "",
    });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let result =
      checkEmpty("name", "Project Name", "PNamespan") &&
      validateDropdown("teamid", "Team Member", "TeamNameSpan") &&
      validateDropdown("priority", "Priority", "PriorityNamespan") &&
      checkEmpty("budget", "Budget", "BudgetSpan") &&
      validateNumber("budget", "BudgetSpan");

    // alert(result);
    if (result) {
      try {
        const response = await axios.post(
          "http://localhost:3001/Project/AddNewProject",
          formData
        );
        var count = response.data.data.affectedRows;

        if (count === 1) {
          alert("Project Added Sucsessfully");
        } else {
          alert("there are some error");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
    closeDrawer();
  };

  // Close the drawer

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseForm = () => {
    closeDrawer();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        buttonRef.current !== event.target
      ) {
        closeDrawer();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  const [chartOptions, setChartOptions] = useState({
    labels: ["Completed Project", "Cancled Project", "Pending Project"],
    colors: ["#008FFB", "#00E396", "#FEB019"],
  });

  const [chartSeries, setChartSeries] = useState([]);
  useEffect(() => {
    // When values change, update the chart series
    if (projectCancled !== null && projectCompleted !== null && projectPending !== null) {
      const series = [projectCancled, projectCompleted, projectPending];
      setChartSeries(series);
    }
  }, [projectCancled, projectCompleted, projectPending]);




  const TABLE_HEAD1 = ["Issues", "Team Member Name"];

  const TABLE_ROWS1 = [
    {
      issues: "John Michael",
      teammember: "Manager",
    },
    {
      issues: "John Deo",
      teammember: "Manager",
    },
  ];


 
  
  return (
    <div className="w-full h-full mt-16">
      {/* no */}
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4">
        {/* no */}
        <div className="justify-end -mt-5">
          <button
            ref={buttonRef}
            className="float-end mx-4 bg-customBlue text-white font-semibold p-2 mt-5 rounded-md flex w-48 items-center"
            onClick={openDrawer}
          >
            <span>
              <FaPlus className="h-4 w-4 text-white mr-3" />
            </span>
            Add New Project
          </button>
        </div>
        {/* drawer code */}
        <div
          ref={drawerRef}
          id="drawer-right-example"
          className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          } bg-white w-[700px] dark:bg-gray-800 border-l border-gray-300`}
        >
          <section className="bg-white w-full max-w-2xl p-7">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900 -mt-3">
                Project Form
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
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Prime Project"
                />
                <span id="PNamespan" className="text-red-700"></span>
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:space-x-0 md:space-x-5  lg:space-x-5 ">
                <div>
                  <label
                    htmlFor="teamid"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Team Member Name
                  </label>
                  <select
                    name="teamid"
                    id="teamid"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.teamid}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Team Member
                    </option>
                    {teamFormMember.map((member) => (
                      <option key={member.Team_id} value={member.Team_id}>
                        {member.Team_name}
                      </option>
                    ))}
                  </select>
                  <span id="TeamNameSpan" className="text-red-700"></span>
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Priority
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Priority
                    </option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                  <span id="PriorityNamespan" className="text-red-700"></span>
                </div>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:space-x-0 md:space-x-5 lg:space-x-5">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Budget
                </label>
                <input
                  type="number"
                  name="budget"
                  id="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Prime Project"
                />
                <span id="BudgetSpan" className="text-red-700"></span>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <Editor
                  apiKey="vymw4rqyiorz5pkxqudpiw0te0z5z9sm6q25ru8xif5dzbkl"
                  init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help",
                  }}
                  value={formData.description}
                  onEditorChange={(content, editor) =>
                    setFormData({
                      ...formData,
                      description: content.replace(/<[^>]*>/g, ""),
                    })
                  }
                />
              </div>

              <button
                type="reset"
                className="w-1/2 text-black font-bold hover:text-customBlue px-5 py-2.5 text-center rounded-md"
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-1/2 bg-customBlue text-white px-5 py-2.5 text-center rounded-md"
              >
                Create Project
              </button>
            </form>
          </section>
        </div>

        {/* Welcome Card */}
        <div className="w-full">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg items-center">
            <div className="flex justify-center items-center sm:ml-0 lg:-ml-80 ">
              <img src={Welcome} alt="Illustration" className="w-60 h-60" />
            </div>
            <div className="sm:text-left md:text-left sm:ml-0 lg:-ml-80">
              <h1 className="text-4xl font-bold text-customBlue mb-2">
                Hello {Name}
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
            <Cards title="Total Projects" value={totalProjectCount}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 20 20"
                fill="#0001FE"
              >
                <g fill="#0001FE">
                  <g opacity={0.2}>
                    <path d="M6.49 17.5h10.72a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6.49a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2"></path>
                    <path
                      fillRule="evenodd"
                      d="M6.49 12.5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10.72a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm-3 1a3 3 0 0 1 3-3h10.72a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H6.49a3 3 0 0 1-3-3z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M4 7.5a1 1 0 0 1 1-1h13.7a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path>
                    <path
                      fillRule="evenodd"
                      d="M3 7.5a2 2 0 0 1 2-2h13.7a2 2 0 0 1 2 2v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm15.7 0H5v3a1 1 0 0 0 1 1h11.7a1 1 0 0 0 1-1z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      fillRule="evenodd"
                      d="M8.925 5.242V7h-2V5.242a3 3 0 0 1 .086-.715l.06-.242A3 3 0 0 1 9.984 2h3.732a3 3 0 0 1 2.913 2.285l.06.242a3 3 0 0 1 .086.715V7h-2V5.242c0-.08-.01-.16-.029-.239l-.06-.241a1 1 0 0 0-.97-.762H9.984a1 1 0 0 0-.97.762l-.06.241a1 1 0 0 0-.029.239"
                      clipRule="evenodd"
                    ></path>
                  </g>
                  <path
                    fillRule="evenodd"
                    d="M3 11.5V15a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 17 15v-3.5h1V15a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15v-3.5z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M1.5 7A1.5 1.5 0 0 1 3 5.5h14A1.5 1.5 0 0 1 18.5 7v3a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 10zM3 6.5a.5.5 0 0 0-.5.5v3A1.5 1.5 0 0 0 4 11.5h12a1.5 1.5 0 0 0 1.5-1.5V7a.5.5 0 0 0-.5-.5z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M6.5 4.746V6.5h-1V4.746a2.5 2.5 0 0 1 .075-.606l.061-.246A2.5 2.5 0 0 1 8.062 2h3.876a2.5 2.5 0 0 1 2.426 1.894l.061.246c.05.198.075.402.075.606V6.5h-1V4.746c0-.122-.015-.245-.045-.364l-.061-.246A1.5 1.5 0 0 0 11.938 3H8.062a1.5 1.5 0 0 0-1.456 1.136l-.061.246a1.5 1.5 0 0 0-.045.364"
                    clipRule="evenodd"
                  ></path>
                  <path d="M7.866 11.5a1 1 0 0 1-1.732 0L5.268 10a1 1 0 0 1 .866-1.5h1.732a1 1 0 0 1 .866 1.5z"></path>
                  <path
                    fillRule="evenodd"
                    d="M7 11a.75.75 0 0 1 .75.75v1.75a.75.75 0 0 1-1.5 0v-1.75A.75.75 0 0 1 7 11"
                    clipRule="evenodd"
                  ></path>
                  <path d="M13.866 11.5a1 1 0 0 1-1.732 0l-.866-1.5a1 1 0 0 1 .866-1.5h1.732a1 1 0 0 1 .866 1.5z"></path>
                  <path
                    fillRule="evenodd"
                    d="M13 11a.75.75 0 0 1 .75.75v1.75a.75.75 0 0 1-1.5 0v-1.75A.75.75 0 0 1 13 11"
                    clipRule="evenodd"
                  ></path>
                </g>
              </svg>
            </Cards>
            {/* Total Team Members Card */}
            <Cards title="Total Team Members" value={totalTeamMember}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 20 20"
                fill="#0001FE"
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
            </Cards>
            {/* Completed Projects Card */}
            <Cards title="Completed Projects" value={projectCompleted}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 20 20"
                fill="#0001FE"
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
          </div>
        </div>

        <div className="w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-10 mx-auto mt-7 space-y-7 sm:space-y-7 md:space-y-7 lg:space-y-0">
            {/* To-Do List */}
            <div className="bg-white shadow-3xl rounded-xl shadow-lg px-3 py-5">
              <div className="ml-4 justify-center text-gray-600">
                <h2 className="text-2xl font-bold mb-4 text-customBlue">
                  To-Do List
                </h2>
                <div className="w-full mb-4">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="border-2 border-gray-300 p-1 mr-2"
                  />
                  <button
                    onClick={handleAddTask}
                    className="bg-customBlue text-white px-5 py-2 rounded"
                  >
                    Add
                  </button>
                </div>
                <ul>
                  {todos.map((todo) => (
                    <div key={todo.id} className="items-center mb-4">
                      <input
                        type="checkbox"
                        id={`project-todo-${todo.id}`}
                        checked={todo.completed}
                        onChange={() => handleToggle(todo.id)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`project-todo-${todo.id}`}
                        className={`text-lg ${
                          todo.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {todo.text}
                      </label>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            {/* Project Progress */}
            <div className="bg-white shadow-lg rounded-xl px-5 py-5">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
                Project Progress
              </h2>
              <div>
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="pie"
                  height={180}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-10 mx-auto mt-7 space-y-7 sm:space-y-7 md:space-y-7 lg:space-y-0">
            {/* Project List */}
            <div className="bg-white shadow-lg rounded-xl px-5 py-5 text-left">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
               Budget List
              </h2>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead className="bg-gray-400">
                    <tr>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2 ">
                        Project Name
                      </th>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                        Team Member
                      </th>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                        Budget
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {BudgetList.map(
                      ({ Project_name, Budget, Team_name }, index) => (
                        <tr key={index}>
                          <td className="border border-blue-gray-300 p-2">
                            {Project_name}
                          </td>
                          <td className="border border-blue-gray-300 p-2">
                            {Team_name}
                          </td>
                          <td className="border border-blue-gray-300 p-2">
                            {Budget}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Issues */}
            <div className="bg-white shadow-lg rounded-xl px-5 py-5 text-left">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
                Issues
              </h2>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead
                    className="bg-gray-2
                  00"
                  >
                    <tr>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2 text-black">
                        Issues
                      </th>
                      <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2 text-black">
                        Team Member
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS1.map(({ issues, teammember }, index) => (
                      <tr key={issues}>
                        <td className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                          {issues}
                        </td>
                        <td className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                          {teammember}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Team Leader List */}
      
      </div>
    </div>
  );
};

export default Dashboard;
