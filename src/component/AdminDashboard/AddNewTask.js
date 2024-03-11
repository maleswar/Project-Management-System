import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

function AddNewTask() {
  const [formData, setFormData] = useState({
    project: "",
    taskName: "",
    description: "",
    priority: "",
    estimatedHours: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    // Reset form data after submission if needed
    setFormData({
      project: "",
      taskName: "",
      description: "",
      priority: "",
      estimatedHours: "",
    });
  };

  return (
    <div className="grid place-items-center min-h-screen bg-gray-100">
      <section className="bg-white w-full max-w-2xl p-7">
        <h1 className="text-2xl font-bold text-center text-gray-900 -mt-3">
          Task Form
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="project"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Project
            </label>
            <select
              name="project"
              id="project"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={formData.project}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Project
              </option>
              <option value="project1">Project 1</option>
              <option value="project2">Project 2</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="taskName"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Task Name
            </label>
            <input
              type="text"
              name="taskName"
              id="taskName"
              value={formData.taskName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Task Name"
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

          <div>
            <label
              htmlFor="estimatedHours"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Estimated Hours
            </label>
            <input
              type="text"
              name="estimatedHours"
              id="estimatedHours"
              value={formData.estimatedHours}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Estimated Hours"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-bgButton text-white px-5 py-2.5 text-center rounded-md"
          >
            Create Task
          </button>
        </form>
      </section>
    </div>
  );
}

export default AddNewTask;
