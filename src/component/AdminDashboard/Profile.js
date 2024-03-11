import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import Welcome from "../AdminDashboard/Assest/Vector/Dashboard.png";
import Cards from "./Layouts/Cards";
import { IoBriefcaseOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Editor } from "@tinymce/tinymce-react"; 

const Profile = () => {
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

  const [chartOptions, setChartOptions] = useState({
    labels: ["Project A", "Project B", "Project C"],
    colors: ["#008FFB", "#00E396", "#FEB019"],
  });

  const [chartSeries, setChartSeries] = useState([30, 70, 50]);

  const PROJECT_DATA = [
    { projectName: "Project A", budget: "$100,000", priority: "High" },
    { projectName: "Project B", budget: "$50,000", priority: "Moderate" },
    { projectName: "Project C", budget: "$75,000", priority: "Low" },
    // Add more projects as needed
  ];

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

  const [formData, setFormData] = useState({
    pname: "",
    startDate: "",
    endDate: "",
    tlName: "",
    priority: "",
    budget: "",
    description: "",
  });

  const drawerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    setFormData({
      pname: "",
      startDate: "",
      endDate: "",
      tlName: "",
      priority: "",
      budget: "",
      description: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // ...

    // Reset form after submission
    setFormData({
      pname: "",
      startDate: "",
      endDate: "",
      tlName: "",
      priority: "",
      budget: "",
      description: "",
    });

    // Close the drawer
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
                  htmlFor="pname"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Project Name
                </label>
                <input
                  type="text"
                  name="pname"
                  id="pname"
                  value={formData.pname}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Prime Project"
                />
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
                    required
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
                    required
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:space-x-0 md:space-x-5  lg:space-x-5 ">
                <div>
                  <label
                    htmlFor="tlName"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Team Lead Name
                  </label>
                  <select
                    name="tlName"
                    id="tlName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formData.tlName}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Team Lead
                    </option>
                    <option value="tl1">Team Lead 1</option>
                    <option value="tl2">Team Lead 2</option>
                  </select>
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
                    required
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
                  type="text"
                  name="budget"
                  id="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Prime Project"
                />
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
                    setFormData({ ...formData, description: content })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-bgButton text-white px-5 py-2.5 text-center rounded-md"
              >
                Create Project
              </button>
            </form>
          </section>
        </div>
        {/* Welcome Card */}
        <div className="w-full">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg items-center">
            <div className="flex justify-center items-center sm:ml-0 lg:-ml-80 ">
              <img src={Welcome} alt="Illustration" className="w-60 h-60" />
            </div>
            <div className="sm:text-left md:text-left sm:ml-0 lg:-ml-80">
              <h1 className="text-4xl font-bold text-customBlue mb-2">
                Hello, Manager Name
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
            <Cards title="Total Projects" value="10">
              <IoBriefcaseOutline className="w-10 h-10 text-customBlue" />
            </Cards>
            {/* Total Team Members Card */}
            <Cards title="Total Team Members" value="25">
              <SlPeople className="w-10 h-10 text-customBlue" />
            </Cards>
            {/* Completed Projects Card */}
            <Cards title="Completed Projects" value="5">
              <IoCheckmarkCircleOutline className="w-10 h-10 text-customBlue" />
            </Cards>
          </div>
        </div>

        <div className="w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-10 mx-auto mt-7 space-y-7 sm:space-y-7 md:space-y-7 lg:space-y-0">
            {/* To-Do List */}
            <div className="bg-white shadow-3xl  shadow-lg px-3 py-5">
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
            <div className="bg-white shadow-lg  px-5 py-5">
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
            <div className="bg-white shadow-lg  px-5 py-5 text-left">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
                Project List
              </h2>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-blue-gray-300 p-2 text-gray-700">
                        Project Name
                      </th>
                      <th className="border border-blue-gray-300 p-2 text-gray-700">
                        Budget
                      </th>
                      <th className="border border-blue-gray-300 p-2 text-gray-700">
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROJECT_DATA.map(
                      ({ projectName, budget, priority }, index) => (
                        <tr key={projectName}>
                          <td className="border border-blue-gray-300 p-2">
                            {projectName}
                          </td>
                          <td className="border border-blue-gray-300 p-2">
                            {budget}
                          </td>
                          <td className="border border-blue-gray-300 p-2">
                            {priority}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Issues */}
            <div className="bg-white shadow-lg  px-5 py-5 text-left">
              <h2 className="text-2xl font-bold mb-4 text-customBlue">
                Issues
              </h2>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-blue-gray-300 p-2 text-gray-700">
                        Issues
                      </th>
                      <th className="border border-blue-gray-300 p-2 text-gray-700">
                        Team Member
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS1.map(({ issues, teammember }, index) => (
                      <tr key={issues}>
                        <td className="border border-blue-gray-300 p-2">
                          {issues}
                        </td>
                        <td className="border border-blue-gray-300 p-2">
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
        <div className="w-full">
          <div className="mx-auto bg-white shadow-lg px-5 py-5 mt-7">
            <h2 className="text-2xl font-bold mb-4 text-customBlue">
              Team Leaders
            </h2>
            <div className="overflow-auto">
              <table className="w-full text-left border border-black">
                <thead>
                  <tr>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      User
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Name
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Project Name
                    </th>
                    <th className="p-2 text-gray-700 border border-blue-gray-300 bg-gray-100">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      logo: "TL.png",
                      name: "John Doe",
                      projectName: "Project A",
                      email: "john.doe@example.com",
                    },
                    {
                      logo: "TL2.png",
                      name: "Mary Johnson",
                      projectName: "Project A",
                      email: "mary@example.com",
                    },
                    {
                      logo: "TL3.png",
                      name: "James Smith",
                      projectName: "Project C",
                      email: "smith@example.com",
                    },
                  ].map(({ logo, name, projectName, email }, index) => (
                    <tr key={index}>
                      <td className="p-2 border border-blue-gray-300">
                      <img
        src={logo}
        alt={`Logo for ${name}`}
        className="w-8 h-8"
      />
                      </td>
                      <td className="p-2 border border-blue-gray-300">
                        {name}
                      </td>
                      <td className="p-2 border border-blue-gray-300">
                        {projectName}
                      </td>
                      <td className="p-2 border border-blue-gray-300">
                        {email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;