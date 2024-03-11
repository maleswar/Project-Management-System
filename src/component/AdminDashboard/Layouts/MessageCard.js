import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MessageCard = ({
  profileName,
  senderName,
  subjectOptions,
  timestamp,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-white border border-gray-200 rounded-lg shadow-md items-center justify-center p-4 mx-5">
      <div className="relative w-full md:w-48 h-48 overflow-hidden bg-gray-100 rounded-full mb-4 md:mb-0 md:mr-4">
        <svg
          className="absolute w-44 h-44 text-gray-400 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2"
          fill="#CCCCCC"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      <div className="flex flex-col justify-between md:w-auto sm:ml-0 md:ml-0 lg:-ml-10">
        <span className="font-semibold mb-2 md:mb-0">Sender Name:</span>
        <span className="text-gray-700">{senderName}</span>

        <span className="font-semibold mt-2 mb-2 md:mb-0">Select Subject:</span>
        <select className="border rounded p-2">
          {subjectOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="flex flex-col items-start mt-2">
          <span className="font-semibold">Select Timestamp:</span>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="border rounded p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
