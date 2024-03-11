import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FaTimes } from "react-icons/fa";


function AddNewProject() {
  const [formData, setFormData] = useState({
    pname: "",
    startDate: "",
    endDate: "",
    tlName: "",
    priority: "",
    budget: "",
    description: "",
  });
  const [formOpen, setFormOpen] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseForm = () => {
    // Implement logic to close the form or update the state
    setFormOpen(false);
    console.log("Form closed");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    // Reset form data after submission if needed
    setFormData({
      pname: "",
      startDate: "",
      endDate: "",
      tlName: "",
      priority: "",
      budget: "",
      description: "",
    });
  };

  if (!formOpen) {
    return null; // Render nothing if the form is closed
  }

  return (
    <div className="grid place-items-center min-h-screen bg-gray-100">
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
  );
}

export default AddNewProject;
