import React, { useEffect, useState } from "react";
import Cards from "./Layouts/Cards";
import Team from "./Assest/Vector/Team.png";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

function HomeDashbord() {
  const teamid = sessionStorage.getItem("TeamID");
  const TeamName = sessionStorage.getItem("TeamName");
  const [completedProject, setCompletedProject] = useState([]);
  const [PendingProject, setPendingProject] = useState([]);
  const [TeamLeader, setTeamLeader] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  const ProjectCompletedCount = async () => {
    const teamID = sessionStorage.getItem("TeamID");

    await axios
      .get(
        `http://localhost:3001/Project/TeamIDCompletedProject?TeamID=${teamID}`
      )
      .then((res) => {
        const completedProject = res.data.data[0]["count(*)"];
        setCompletedProject(completedProject);
        // (project);
      });
  };
  const ProjectPendingCount = async () => {
    const teamID = sessionStorage.getItem("TeamID");

    await axios
      .get(
        `http://localhost:3001/Project/TeamIDPendingProject?TeamID=${teamID}`
      )
      .then((res) => {
        const PendingProject = res.data.data[0]["count(*)"];
        setPendingProject(PendingProject);
        // (project);
      });
  };

  const TeamLeaderListWithData = async () => {
    const teamid = sessionStorage.getItem("TeamID");

    await axios
      .get(`http://localhost:3001/TL/TeamTLDetailDashbord?teamid=${teamid}`)
      .then((res) => {
        let list = res.data;
        let TeamLeader = list.data;
        
        setTeamLeader(TeamLeader);
        // (project);
      });
  };

  const fetchCompletedTasks = async (projectId) => {
    const teamid = sessionStorage.getItem("TeamID");
    try {
      const res = await axios.get(
        `http://localhost:3001/Task/TeamTaskCompleted?tlid=${teamid}&projectId=${projectId}`
      );
      setCompletedTask((prevCompletedTasks) => ({
        ...prevCompletedTasks,
        [projectId]: res.data.data,
      }));
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
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
    ProjectCompletedCount();
    ProjectPendingCount();
    TeamLeaderListWithData();
     TeamLederList();
  }, []);

  const projectData = [
    {
      name: "Project A",
      completedTasks: 50,
      pendingTasks: 20,
      teamMembers: ["John", "Alice", "Bob"],
    },
    {
      name: "Project B",
      completedTasks: 40,
      pendingTasks: 10,
      teamMembers: ["Alice", "Charlie", "David"],
    },
    {
      name: "Project C",
      completedTasks: 30,
      pendingTasks: 5,
      teamMembers: ["John", "David", "Eve"],
    },
  ];

  const chartData = {
    series: [
      {
        name: "Completed Tasks",
        data: Object.values(projectData).map(
          (project) => project.completedTasks
        ),
      },
      {
        name: "Pending Tasks",
        data: Object.values(projectData).map((project) => project.pendingTasks),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 400,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: Object.keys(projectData),
      },
      yaxis: {
        title: {
          text: "Number of Tasks",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const project = Object.values(projectData)[dataPointIndex];
          if (seriesIndex === 0) {
            // Only show tooltip for completed tasks
            const teamMembers = project.teamMembers.join(", ");
            return `<div class="tooltip">Completed Tasks: ${w.globals.series[seriesIndex][dataPointIndex]}`;
          } else {
            return false; // Hide tooltip for pending tasks
          }
        },
      },
    },
  };

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Develop login functionality",
      completed: false,
    },
    {
      id: 2,
      text: "Implement user profile page",
      completed: false,
    },
    {
      id: 3,
      text: "Fix bugs reported by QA",
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

  // State variables to store TL name and description
  const [tlName, setTLName] = useState("");
  const [description, setDescription] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., send data to backend)
    // For now, let's just log the data
    console.log("TL Name:", tlName);
    console.log("Description:", description);
    // Reset form fields
    setTLName("");
    setDescription("");
  };
  // useEffect(() => {

  //   // Fetch completed tasks for each project
  //   projectData.forEach((project) => {
  //     fetchCompletedTasks(project.Project_id);
  //   });
  // }, [projectData]);

  const sm = window.innerWidth < 640; // Define 'sm' for small screens

  return (
    <div>
      <div className="w-full h-full mt-16">
        {/* no */}
        <div className="p-5 bg-bgSky grid grid-cols-1 gap-y-4">
          <div className="w-full">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg shadow-lg items-center">
              <div className="flex justify-center items-center md:col-span-1 lg:-ml-80">
                <img src={Team} alt="Illustration" className="w-60 h-60" />
              </div>
              <div
                className={`text-center md:text-left lg:-ml-80 ${
                  !sm ? "hidden sm:block" : ""
                }`}
              >
                {/* For small screens, text below image and centered */}
                <h1 className="text-customBlue text-3xl font-bold">
                  Hello {TeamName}
                </h1>
                <p>
                  This is your go-to place for tracking progress, collaborating
                  effectively, and ensuring project success.
                </p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="w-full">
            <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-10 mx-auto">
              <Cards title="Completed Projects" value={completedProject}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 20 20"
                >
                  <g fill="#0001FE">
                    <path
                      d="m8 4.97l.954-.396a4 4 0 0 1 2.908.058l1.482.613a4 4 0 0 0 2.693.13l.893-.271A1.604 1.604 0 0 1 19 6.638V10.7a3.22 3.22 0 0 1-1.66 2.817l-.734.407a4 4 0 0 1-3.88 0l-.453-.251a4 4 0 0 0-3.88 0l-.226.126c-.055.03-.11.056-.167.079V19a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1c.81 0 1 .97 1 .97"
                      opacity={0.2}
                    ></path>
                    <path
                      fillRule="evenodd"
                      d="m6.804 2.632l-.637.264A3.507 3.507 0 0 0 4 6.137v4.386a1.46 1.46 0 0 0 2.167 1.276l.227-.126a4 4 0 0 1 3.88 0l.453.251a4 4 0 0 0 3.88 0l.734-.407A3.222 3.222 0 0 0 17 8.7V4.638a1.605 1.605 0 0 0-2.07-1.534l-.893.272a4 4 0 0 1-2.693-.13l-1.482-.614a4 4 0 0 0-3.058 0M5 6.137c0-1.014.611-1.929 1.549-2.317l.638-.264a3 3 0 0 1 2.293 0l1.481.613a5 5 0 0 0 3.367.163l.893-.271a.604.604 0 0 1 .779.577V8.7c0 .807-.438 1.551-1.144 1.943l-.735.407a3 3 0 0 1-2.91 0l-.453-.252a5 5 0 0 0-4.85 0l-.226.126A.46.46 0 0 1 5 10.523z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1"
                      clipRule="evenodd"
                    ></path>
                  </g>
                </svg>
              </Cards>

              <Cards title="Pending Projects" value={PendingProject}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 20 20"
                >
                  <g fill="#0001FE">
                    <rect
                      width={14}
                      height={12}
                      x={5}
                      y={6}
                      opacity={0.2}
                      rx={1}
                    ></rect>
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.5h-13A.5.5 0 0 0 3 5v11a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5M4 15.5v-10h12v10z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.5h-13A.5.5 0 0 0 3 5v3a.5.5 0 0 0 .5.5h13A.5.5 0 0 0 17 8V5a.5.5 0 0 0-.5-.5M4 7.5v-2h12v2z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M5.5 5.5h1A.5.5 0 0 0 7 5V4a.5.5 0 0 0-.5-.5h-1A.5.5 0 0 0 5 4v1a.5.5 0 0 0 .5.5m8 0h1A.5.5 0 0 0 15 5V4a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5m-7.5 6a1 1 0 1 1 0-2a1 1 0 0 1 0 2"></path>
                  </g>
                </svg>
              </Cards>
            </div>
          </div>

          <div className="w-full">
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:w-full gap-x-10 mx-auto mt-7 space-y-7 sm:space-y-7 md:space-y-7 lg:space-y-0">
              <div className="bg-white rounded-lg shadow-lg px-3 py-5">
                <h1>Task Completion Status</h1>
                <div className="w-full h-full">
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-10 mx-auto mt-7 space-y-7 sm:space-y-7 md:space-y-7 lg:space-y-0">
              {/* To-Do List */}
              <div className="bg-white rounded-lg shadow-lg px-3 py-5">
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
              {/* TL Deatils */}
              <div className="bg-white rounded-lg shadow-lg px-5 py-5 text-left">
                <h2 className="text-2xl font-bold mb-4 text-customBlue">
                  Team Leader List
                </h2>
                <div className="overflow-auto">
                  <table className="w-full text-left overflow-x -scroll">
                    <thead className="border-t border-b text-black border-gray-100 bg-gray-200">
                      <tr>
                        <th className="p-4  text-slate-700">
                          Profile Image
                        </th>
                        <th className="p-4  text-slate-700">
                          Team Leader Name
                        </th>
                        <th className="p-4  text-slate-700">
                          Project Name
                        </th>
                        <th className="p-4  text-slate-700">
                           Budget
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {TeamLeader.map(
                        ({ TL_fname, TL_lname, profile_image,Project_name,Budget }, index) => (
                          <tr key={index}>
                            <td className="border-t border-b font-semibold left-0 border-blue-gray-300 p-4">
                              <img
                                src={require(`../../image/${profile_image}`)}
                                alt="student profile"
                                className="h-10 w-10 rounded-full cursor-pointer"
                              />
                            </td>
                            <td className="border-t border-b font-semibold left-0 border-blue-gray-300 p-4">
                              {TL_fname} {TL_lname}
                            </td>
                            <td className="border-t border-b font-semibold left-0 border-blue-gray-300 p-4">
                              {Project_name}
                            </td>
                            <td className="border-t border-b font-semibold left-0 border-blue-gray-300 p-4">
                              {Budget}
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

          <div className="w-full">
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-10 mx-auto mt-7 space-y-7 sm:space-y-7 md:space-y-7 lg:space-y-0">
              {/* Issues */}
              <div className="bg-white rounded-lg shadow-lg px-3 py-5">
                <div className="ml-4 justify-center text-gray-600">
                  <h2 className="text-2xl font-bold mb-4 text-customBlue">
                    Report an Issue
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
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
                    <div className="form-group mt-3">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-base font-medium text-gray-900"
                      >
                        Issue:
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-customBlue text-white px-5 py-2.5 text-center rounded-md mt-5"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeDashbord;
