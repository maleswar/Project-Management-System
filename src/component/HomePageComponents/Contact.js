import { React, useState } from "react";
import Button from "./Layouts2/Button";
import { checkEmpty, validateEmail } from "../../JS/FormValidation";
import sendEmail from "../../JS/Email";

function Contact() {
  const [value, setValues] = useState({
    email: "",
    name: "",
    message: "",
  });
  console.log(value);
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendEmailData = (e) => {
    e.preventDefault();
    let result =
      checkEmpty("email", "Email", "emailspan") &&
      validateEmail("email", "emailspan") &&
      checkEmpty("name", "Name", "namespan") &&
      checkEmpty("message", "Meassage", "messagespan");
      console.log(result);
    if (result) {
      sendEmail(value);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 mt-28"
      id="contact"
    >
      <h1 className="text-5xl font-bold lg:text-start text-customBlue">
        Contact Us
      </h1>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form action="#" className="space-y-8 " onSubmit={sendEmailData}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50  text-gray-900 text-sm rounded-lg block  border-neutral-900 border-2   w-full p-2.5 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              value={value.email}
              onChange={handleInput}
            />
            <span id="emailspan" className="text-red-700 email"></span>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={value.subject}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  border-neutral-900 border-2 shadow-sm focus:ring-primary-500 focus:border-customBlue dark:focus:border-customBlue dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              onChange={handleInput}
            />
            <span id="namespan" className="text-red-700 email"></span>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              name="message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm   border-neutral-900 border-2 focus:ring-primary-500 focus:border-customBlue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-customBlue"
              placeholder="Leave a comment..."
              onChange={handleInput}
              value={value.message}
            ></textarea>
            <span id="messagespan" className="text-red-700 email"></span>
          </div>
          <Button title="Send Message" type="submit" />
        </form>
      </section>
    </div>
  );
}

export default Contact;
