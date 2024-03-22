import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import Cards from "./Layouts/Cards";
import { IoTrophyOutline } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { IoTrashOutline } from "react-icons/io5";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import {
  checkEmpty,
  validateDropdown,
  validateDates,
} from "../../JS/FormValidation";

function Task() {
  const ID = sessionStorage.getItem("TLID");
  const [totalCompletedTask, setTotalCompletedTask] = useState(null);
  const [totalPendingTask, setTotalPendingTask] = useState(null);
  const [totalCancelTask, setTotalCancelTask] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [taskTeam, setTaskTeam] = useState([]);
  const [taskAllData, setTaskAllData] = useState([]);
  const [ProjectName, setProjectName] = useState([]);
  const [teamFormMember, setTeamFormMember] = useState([]);

  const CompletedTask = async () => {
    const tlid = sessionStorage.getItem("TLID");
    try {
      const response = await axios.get(
        `http://localhost:3001/Task/TaskCompleteCount?tlid=${tlid}`
      );
      const TaskCompleted = response.data.data[0]["count(*)"];
      setTotalCompletedTask(TaskCompleted);
    } catch (error) {
      console.error("Error fetching Completed Task count:", error);
    }
  };

  const PendingTask = async () => {
    const tlid = sessionStorage.getItem("TLID");

    try {
      const response = await axios.get(
        `http://localhost:3001/Task/TaskPendingCount?tlid=${tlid}`
      );
      const totalPendingTask = response.data.data[0]["count(*)"];
      setTotalPendingTask(totalPendingTask);
    } catch (error) {
      console.error("Error fetching Pending Task count:", error);
    }
  };

  const CancledTask = async () => {
    const tlid = sessionStorage.getItem("TLID");

    try {
      const response = await axios.get(
        `http://localhost:3001/Task/TaskCancelCount?tlid=${tlid}`
      );
      const totalCancelTask = response.data.data[0]["count(*)"];
      setTotalCancelTask(totalCancelTask);
    } catch (error) {
      console.error("Error fetching CompleteProject count:", error);
    }
  };

  const TaskData = async () => {
    const tlid = sessionStorage.getItem("TLID");

    await axios
      .get(`http://localhost:3001/Task/TaskDashbordData?tlid=${tlid}`)
      .then((res) => {
        let list = res.data;
        let taskList = list.data;
        setTaskList(taskList);
        // alert(BudgetList);
      });
  };

  const TaskAllData = async () => {
    const tlid = sessionStorage.getItem("TLID");
    await axios
      .get(`http://localhost:3001/Task/TaskData?tlid=${tlid}`)
      .then((res) => {
        let list = res.data;
        let taskAllData = list.data;
        setTaskAllData(taskAllData);
        // alert(BudgetList);
      });
  };

  const TaskTeam = async () => {
    const tlid = sessionStorage.getItem("TLID");

    await axios
      .get(`http://localhost:3001/Task/TaskTeamData?tlid=${tlid}`)
      .then((res) => {
        let list = res.data;
        let taskTeam = list.data;
        setTaskTeam(taskTeam);
        // alert(BudgetList);
      });
  };

  const fetchProjectData = async () => {
    try {
      const tlid = sessionStorage.getItem("TLID");
      const response = await axios.get(
        `http://localhost:3001/Project/ProjectNames?tlid=${tlid}`
      );
      const ProjectName = response.data.data;
      setProjectName(ProjectName);
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
    CompletedTask();
    PendingTask();
    CancledTask();
    TaskData();
    TaskTeam();
    TaskAllData();
    fetchProjectData();
    fetchTeamMemberList();
  }, []);

  const [chartOptions, setChartOptions] = useState({
    labels: ["Completed Tasks", "Pending Task", "Cancled Task"],
    colors: ["#008FFB", "#00E396", "#FEB019"],
  });

  // const [chartSeries, setChartSeries] = useState([30, 70, 50]);

  const TABLE_ROWS1 = [
    { teamLeader: "Team Lead 1", assignedTask: "Task A" },
    { teamLeader: "Team Lead 2", assignedTask: "Task B" },
    { teamLeader: "Team Lead 3", assignedTask: "Task C" },
    // Add more rows as needed
  ];

  const TASK_ASSIGNMENTS = [
    {
      teamLeader: "Team Lead 1",
      assignedTask: "Task A, Task B",
      status: "Pending",
    },
    {
      teamLeader: "Team Lead 2",
      assignedTask: "Task C, Task D",
      status: "Complete",
    },
    // Add more entries as needed
  ];

  // alert(ID);
  const [formData, setFormData] = useState({
    projectid: "",
    task: "",
    TeamId: "",
    TlId: ID,
    startdate: "",
    enddate: "",
    description: "",
    priority: "",
    Progress: "Pending",
  });
  console.log(formData);

  const drawerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setFormData({
      projectid: "",
      task: "",
      TeamId: "",
      TlId: ID,
      startdate: "",
      enddate: "",
      description: "",
      priority: "",
      Progress: "Pending",
    });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseForm = () => {
    closeDrawer();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let result =
      validateDropdown("projectid", "Project Name", "projectidspan") &&
      checkEmpty("task", "Task Name", "taskspan") &&
      validateDropdown("TeamId", "Team Member", "TeamIdspan") &&
      validateDates("startDate", "endDate","datespan") &&
      validateDropdown("priority", "Priority", "priorityspan");

    // alert(result);
    if (result) {
      try {
        const response = await axios.post(
          "http://localhost:3001/Task/AddNewTask",
          formData
        );
        var count = response.data.data.affectedRows;

        if (count === 1) {
          alert("Task Added Sucsessfully");
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
  const [chartSeries, setChartSeries] = useState([]);
  useEffect(() => {
    // When values change, update the chart series
    if (
      totalCompletedTask !== null &&
      totalPendingTask !== null &&
      totalCancelTask !== null
    ) {
      const series = [totalCompletedTask, totalPendingTask, totalCancelTask];
      setChartSeries(series);
    }
  }, [totalCompletedTask, totalPendingTask, totalCancelTask]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" }; // Customize date format
    return date.toLocaleDateString(undefined, options); // Customize based on options
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500"; // Green color for completed projects
      case "Cancled":
        return "text-red-500"; // Red color for canceled projects
      case "Pending":
        return "text-blue-500"; // Blue color for ongoing projects
      default:
        return ""; // Default color if status doesn't match any case
    }
  };

  return (
    <div className="w-full h-full mt-16">
      <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4">
        <div className="justify-end -mt-5">
          <button
            ref={buttonRef}
            className="float-end mx-4 bg-customBlue text-white font-semibold p-2 mt-5 rounded-md flex w-48 items-center"
            onClick={openDrawer}
          >
            <span>
              <FaPlus className="h-4 w-4 text-white mr-3" />
            </span>
            Add New Task
          </button>
        </div>
        <div
          ref={drawerRef}
          id="drawer-right-example"
          className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          } bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[40%] xl:w-[40%] dark:bg-gray-800 border-l border-gray-300`}
        >
          <section className="bg-white w-full max-w-2xl p-7">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900 -mt-3">
                Task Form
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
                  htmlFor="projectid"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Project Names
                </label>
                <select
                  name="projectid"
                  id="projectid"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.projectid}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Project
                  </option>
                  {ProjectName.map((project) => (
                    <option key={project.Project_id} value={project.Project_id}>
                      {project.Project_name}
                    </option>
                  ))}
                </select>
              </div>
              <span id="projectidspan" className="text-red-700"></span>
              <div>
                <label
                  htmlFor="task"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Task Name
                </label>
                <input
                  type="text"
                  name="task"
                  id="task"
                  value={formData.task}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Task Name"
                />
              </div>
              <span id="taskspan" className="text-red-700"></span>
              <div>
                <label
                  htmlFor="TeamId"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Team Names
                </label>
                <select
                  name="TeamId"
                  id="TeamId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.TeamId}
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
              </div>{" "}
              <span id="TeamIdspan" className="text-red-700"></span>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:space-x-0 md:space-x-5 lg:space-x-5">
                <div>
                  <label
                    htmlFor="startdate"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startdate"
                    id="startdate"
                    value={formData.startdate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} // Set min attribute to today's date
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enddate"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="enddate"
                    id="enddate"
                    value={formData.enddate}
                    onChange={handleChange}
                    min={
                      new Date(Date.now() + 86400000)
                        .toISOString()
                        .split("T")[0]
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              <span id="datespan" className="text-red-700"></span>

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
                <span id="priorityspan" className="text-red-700"></span>
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
                Create Task
              </button>
            </form>
          </section>
        </div>

        {/* Project Card  */}
        <div className="w-full">
          <div className="bg-white  shadow-lg flex items-center py-10">
            <div className="text-left ml-10">
              <h1 className="text-4xl font-bold mb-2 text-customBlue">Task</h1>
              <p className="text-gray-600">
                Welcome to the Project Management Dashboard! Your hub for
                project progress, collaboration, and success. Let's get started!
              </p>
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="w-full">
          <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-10 mx-auto">
            <Cards title="Completed Task" value={totalCompletedTask}>
              <IoTrophyOutline className="w-10 h-10 text-customBlue" />
            </Cards>

            <Cards title="Pending Task" value={totalPendingTask}>
              <RxCounterClockwiseClock className="w-10 h-10 text-customBlue" />
            </Cards>

            <Cards title="Canceled Task" value={totalCancelTask}>
              <IoTrashOutline className="w-10 h-10 text-customBlue" />
            </Cards>
          </div>
        </div>
        <div className="w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-10 mx-auto mt-7 space-y-7 sm:space-y-7 md:space-y-7 lg:space-y-0">
            {/* Task Graph */}
            <div className="bg-white shadow-lg  px-5 py-5 flex-1">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
                Task Graph
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

            {/* Task Graph */}
            <div className="bg-white shadow-lg  px-5 py-5 flex-1">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
                Completed Task
              </h2>
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-blue-gray-300 p-2 text-gray-700">
                      Sr.no
                    </th>
                    <th className="border border-blue-gray-300 p-2 text-gray-700">
                      Task Name
                    </th>
                    <th className="border border-blue-gray-300 p-2 text-gray-700">
                      Team Member
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskTeam.map(({ Task_id, Task_name, Team_name }, index) => (
                    <tr key={index}>
                      <td className="border border-blue-gray-300 p-2">
                        {Task_id}
                      </td>
                      <td className="border border-blue-gray-300 p-2">
                        {Task_name}
                      </td>
                      <td className="border border-blue-gray-300 p-2">
                        {Team_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Pending Task Details
            </h2>
            <div className="overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-400">
                  <tr>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2 ">
                      Sr.No
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Task
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Description
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Start_date
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      End_date
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Priority
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskList.map(
                    (
                      {
                        Task_id,
                        Task_name,
                        Description,
                        start_date,
                        End_date,
                        Priority,
                        Comments,
                      },
                      index
                    ) => (
                      <tr key={index}>
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
                          {start_date}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {End_date}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Priority}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {Comments}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              All Tasks
            </h2>
            <div className="overflow-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-400">
                  <tr>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Task
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Description
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Start_date
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      End_date
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Priority
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Progress
                    </th>
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskAllData.map(
                    (
                      {
                        Task_name,
                        Description,
                        start_date,
                        End_date,
                        Priority,
                        Progress,
                        Comments,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td className="  p-2">{Task_name}</td>
                        <td className="  p-2">{Description}</td>
                        <td className="  p-2">{formatTimestamp(start_date)}</td>
                        <td className="  p-2">{formatTimestamp(End_date)}</td>
                        <td className=" p-2">{Priority}</td>
                        <td className={` p-2 ${getStatusColor(Progress)}`}>
                          {Progress}
                        </td>
                        <td className=" p-2">{Comments}</td>
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

export default Task;
