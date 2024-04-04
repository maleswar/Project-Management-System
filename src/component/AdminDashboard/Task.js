import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import Cards from "./Layouts/Cards";
import { IoTrophyOutline } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { IoTrashOutline } from "react-icons/io5";
import { Editor } from "@tinymce/tinymce-react";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  checkEmpty,
  validateDropdown,
  validateDates,
} from "../../JS/FormValidation";

function Task() {
  const { projectId, Project_name } = useParams();
  console.log(Project_name);
  const ID = sessionStorage.getItem("TLID");
  const [totalCompletedTask, setTotalCompletedTask] = useState(null);
  const [totalPendingTask, setTotalPendingTask] = useState(null);
  const [totalCancelTask, setTotalCancelTask] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [taskTeam, setTaskTeam] = useState([]);
  const [taskAllData, setTaskAllData] = useState([]);
  const [ProjectName, setProjectName] = useState([]);
  const [teamFormMember, setTeamFormMember] = useState([]);
  const [EditProjectData, setEditProjectData] = useState([]);
  const [taskid, settaskid] = useState([]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tlid = sessionStorage.getItem("TLID");
    axios
      .get(
        `http://localhost:3001/Task/TaskDate?tlid=${tlid}&projectId=${projectId}`
      )
      .then((response) => {
        console.log("Response data:", response.data);

        // Access the array of tasks from response.data.data
        const tasksData = response.data.data;

        // Define an array of colors
        const colors = [
          "#1f77b4",
          "#ff7f0e",
          "#2ca02c",
          "#d62728",
          "#9467bd",
          "#8c564b",
          "#e377c2",
          "#7f7f7f",
          "#bcbd22",
          "#17becf",
        ];

        // Format tasks data for the timeline chart
        const formattedTasks = tasksData.map((task, index) => ({
          x: task.Task_name,
          y: [
            new Date(task.Start_Date).getTime(),
            new Date(task.End_date).getTime(),
          ],
          color: colors[index % colors.length], // Assign a color from the array based on index
        }));

        setTasks(formattedTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []); // Empty dependency array to only run the effect once on component mount

  const options = {
    chart: {
      height: 350,
      type: "rangeBar",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Tasks",
      },
    },
    yaxis: {
      title: {
        text: "Timeline",
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  const [editData, setEditData] = useState({
    status: "",
    task: "",
    TeamId: "",
    startDate: new Date(),
    endDate: new Date(),
    description: "",
    priority: "",
  });

  console.log(editData);

  const handleEditClick = async (taskId) => {
    openModal();
    try {
      const response = await axios.get(
        `http://localhost:3001/Task/TaskDataForUpdate?Taskid=${taskId}`
      );
      const EditProjectData = response.data.data;
      setEditProjectData(EditProjectData);

      if (EditProjectData.length > 0) {
        setEditData({
          status: EditProjectData[0].Progress,
          task: EditProjectData[0].Task_name,
          TeamId: EditProjectData[0].Team_id,
          startDate: EditProjectData[0].Start_date,
          endDate: EditProjectData[0].End_date,
          description: EditProjectData[0].Description,
          priority: EditProjectData[0].Priority,
        });
      }
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
    settaskid(taskId);
  };

  const EditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const UpdateTaskData = async (e) => {
    e.preventDefault();
    // alert(taskid);
    try {
      // Format start date and end date before sending to backend
      const formattedStartDate = formatDate(editData.startDate);
      const formattedEndDate = formatDate(editData.endDate);

      const response = await axios.post(
        `http://localhost:3001/Task/UpdateTask?Taskid=${taskid}`,
        {
          ...editData,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }
      );
      var count = response.data.data.affectedRows;

      if (count === 1) {
        alert("Task Updated Successfully");
        closeModal();
        TaskAllData();
        CompletedTask();
        PendingTask();
        CancledTask();
        TaskData();
        TaskTeam();

        fetchProjectData();
        fetchTeamMemberList();
      } else {
        alert("Project Updated Unsuccessfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const CompletedTask = async () => {
    const tlid = sessionStorage.getItem("TLID");
    try {
      const response = await axios.get(
        `http://localhost:3001/Task/TaskCompleteCount?tlid=${tlid}&ProjectId=${projectId}`
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
        `http://localhost:3001/Task/TaskPendingCount?tlid=${tlid}&ProjectId=${projectId}`
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
        `http://localhost:3001/Task/TaskCancelCount?tlid=${tlid}&ProjectId=${projectId}`
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
      .get(
        `http://localhost:3001/Task/TaskDashbordData?tlid=${tlid}&ProjectId=${projectId}`
      )
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
      .get(
        `http://localhost:3001/Task/TaskData?tlid=${tlid}&ProjectId=${projectId}`
      )
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
      .get(
        `http://localhost:3001/Task/TaskTeamData?tlid=${tlid}&ProjectId=${projectId}`
      )
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
        `http://localhost:3001/Team/TeamNames?tlid=${tlid}&ProjectId=${projectId}`
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
    // ChartData();
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
    projectid: projectId,
    task: "",
    TeamId: "",
    TlId: ID,
    startDate: new Date(),
    endDate: new Date(),
    description: "",
    priority: "",
    Progress: "Pending",
  });
  // console.log(formData);

  const drawerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setFormData({
      projectid: projectId,
      task: "",
      TeamId: "",
      TlId: ID,
      startDate: "",
      endDate: "",
      description: "",
      priority: "",
      Progress: "Pending",
    });
    setDrawerOpen(true);
  };
  console.log(formData);
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
      checkEmpty("task", "Task Name", "taskspan") &&
      validateDropdown("TeamId", "Team Member", "TeamIdspan") &&
      validateDates("startDate", "endDate", "datespan") &&
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
    PendingTask();
    TaskData();
    TaskAllData();
    // TaskAllD/ata();
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
              {/* <div>
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
              </div> */}
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
                    min={new Date().toISOString().split("T")[0]} // Set min attribute to today's date
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
          <div className="bg-white rounded-lg shadow-lg flex items-center py-10">
            <div className="text-left ml-10">
              <h1 className="text-4xl font-bold mb-2 text-customBlue">
                {Project_name} 's Task
              </h1>
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
            <div className="bg-white rounded-lg shadow-lg  px-5 py-5 flex-1">
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
            <div className="bg-white rounded-lg shadow-lg  px-5 py-5 flex-1">
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
          <div className="mx-auto bg-white rounded-lg shadow-lg px-5 py-5 mt-7">
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
                          {formatTimestamp(start_date)}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
                          {formatTimestamp(End_date)}
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

        <div className="w-full ">
          <div className="bg-white p-5 rounded-lg shadow-lg px-5 py-5 mt-7">
            {tasks.length > 0 ? (
              <ReactApexChart
                options={options}
                series={[{ data: tasks }]}
                type="rangeBar"
                height={350}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="mx-auto bg-white rounded-lg  shadow-lg px-5 py-5 mt-7">
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
                      Team Name
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
                    <th className="border-r-0 border-l-0 border-t-0 border-b border-blue-gray-300 p-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskAllData.map(
                    (
                      {
                        Task_id,
                        Task_name,
                        Description,
                        start_date,
                        End_date,
                        Priority,
                        Progress,
                        Comments,
                        team_name,
                      },
                      index
                    ) => (
                      <tr key={index}>
                        <td className="p-2">{Task_name}</td>
                        <td className="p-2">{team_name}</td>
                        <td className="p-2">{Description}</td>
                        <td className="p-2">{formatTimestamp(start_date)}</td>
                        <td
                          className={`p-2  ${
                            isDateCloser(End_date) ? "text-red-500" : ""
                          }`}
                        >
                          {formatTimestamp(End_date)}
                        </td>
                        <td className="p-2">{Priority}</td>
                        <td className={`p-2 ${getStatusColor(Progress)}`}>
                          {Progress}
                        </td>
                        <td className="p-2">{Comments}</td>
                        <td className="p-2">
                          <button onClick={() => handleEditClick(Task_id)}>
                            <MdEditSquare className="h-7 w-6" />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-scroll">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full">
              <div className="p-8">
                <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
                <form className="space-y-4" onSubmit={UpdateTaskData}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="">
                      <label
                        htmlFor="status"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Select Status:
                      </label>
                      <select
                        name="status"
                        id="status"
                        value={editData.status}
                        onChange={EditChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Cancel">Cancel</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="">
                      <label
                        htmlFor="TeamId"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Team Names:
                      </label>
                      <select
                        name="TeamId"
                        id="TeamId"
                        value={editData.TeamId}
                        onChange={EditChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Select Team Member
                        </option>
                        {teamFormMember.map((member) => (
                          <option key={member.Team_id} value={member.Team_id}>
                            {member.Team_name}
                          </option>
                        ))}
                        {/* Render Team Members as options */}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="task"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Task Name:
                    </label>
                    <input
                      type="text"
                      name="task"
                      id="task"
                      value={editData.task}
                      onChange={EditChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Task Name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        Start Date:
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={editData.startDate}
                        onChange={EditChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endDate"
                        className="block mb-2 font-medium text-gray-700"
                      >
                        End Date:
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={editData.endDate}
                        onChange={EditChange}
                        min={
                          new Date(Date.now() + 86400000)
                            .toISOString()
                            .split("T")[0]
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Description:
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={editData.description}
                      onChange={EditChange}
                      className="bg-gray-50 border h-14 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Description"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="priority"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Priority:
                    </label>
                    <select
                      name="priority"
                      id="priority"
                      value={editData.priority}
                      onChange={EditChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Select Priority
                      </option>
                      <option value="High">High</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      type="reset"
                      className="text-black font-bold mx-7 hover:text-customBlue px-5 py-2.5 text-center rounded-md  border-gray-300"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="bg-customBlue text-white px-5 py-2.5 text-center rounded-md"
                    >
                      Update Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
