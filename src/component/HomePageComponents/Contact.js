import React from "react";
import Button from "./Layouts2/Button";

function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 mt-28" id="contact">
      <h1 className="text-5xl font-bold lg:text-start text-customBlue">
        Contact Us
      </h1>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50  text-gray-900 text-sm rounded-lg block  border-neutral-900 border-2   w-full p-2.5 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg  border-neutral-900 border-2 shadow-sm focus:ring-primary-500 focus:border-customBlue dark:focus:border-customBlue dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
            />
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
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm   border-neutral-900 border-2 focus:ring-primary-500 focus:border-customBlue dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-customBlue"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <Button title="Send Message" />
        </form>
      </section>
    </div>
  );
}

export default Contact;
