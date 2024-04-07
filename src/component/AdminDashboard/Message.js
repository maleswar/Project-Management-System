import React, { useState, useEffect } from "react";
import axios from "axios";

function Message() {
  const tlid = sessionStorage.getItem("TLID");
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Team/TeamMemberNameforMessage?tlid=${tlid}`
      );
      setTeamMembers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSenderMessages = async () => {
    if (selectedMember) {
      try {
        const response = await axios.get(
          `http://localhost:3001/Team/TeamMemberMessages?id=${selectedMember.Team_id}&tlid=${tlid}`
        );
        setMessages(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleMessageButtonClick = async (member) => {
    setSelectedMember(member);
    try {
      const response = await axios.get(
        `http://localhost:3001/Team/TeamMemberMessages?id=${member.Team_id}&tlid=${tlid}`
      );
      setMessages(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!selectedMember || !newMessage) return;
    try {
      await axios.post("http://localhost:3001/Team/sendMessage", {
        sender_id: tlid,
        receiver_id: selectedMember.Team_id,
        message: newMessage,
      });

      await fetchSenderMessages();
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    fetchSenderMessages();
  }, [selectedMember]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className="flex h-full mx-10 mt-20 gap-5">
      {/* Left container */}
      <div className="flex w-1/3 p-4 rounded-lg shadow-lg border overflow-scroll">
        <div className="flex flex-col gap-4">
          {teamMembers.map(({ Profile_image, Team_id, Team_name }) => (
            <div key={Team_id} className="flex items-center gap-4">
              <div className="">
                {Profile_image ? (
                  <img
                    src={require(`../../image/${Profile_image}`)}
                    alt="student profile"
                    className="h-10 w-10 rounded-full cursor-pointer"
                  />
                ) : (
                  <span>No profile </span>
                )}
              </div>
              <div>
                <h6>{Team_name}</h6>
                <button
                  className="bg-customBlue"
                  onClick={() =>
                    handleMessageButtonClick({ Team_id, Team_name })
                  }
                >
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right container */}
      <div className="flex flex-col bg-gray-100 w-2/3 p-4 rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow overflow-y-auto">
          {selectedMember && (
            <h1 className="text-xl mb-4">{selectedMember.Team_name}</h1>
          )}
          <div className="flex flex-col gap-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  message.Recevier_id != tlid ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-2 max-w-xs ${
                    message.Recevier_id != tlid
                      ? "bg-orange-200 rounded-lg p-2 max-w-xs"
                      : "bg-blue-200 rounded-lg p-2 max-w-xs"
                  }`}
                >
                  <p>{message.message}</p>
                  <p className="text-xs text-gray-500">
                    {formatTime(message.sent_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow px-3 py-2 rounded-md border outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
