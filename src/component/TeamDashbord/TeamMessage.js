import React, { useState, useEffect } from "react";
import axios from "axios";

function Message() {
  const Team_id = sessionStorage.getItem("TeamID");
  const [teamMembers, setTeamMembers] = useState([]);
  const [TLMembers, setTLMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Team/TeamMemberNameforMessageTeam?teamid=${Team_id}`
      );
      setTeamMembers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTLMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/Team/TeamLeaderList?TeamId=${Team_id}`
      );
      setTLMembers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedMember);
  const fetchSenderMessages = async () => {
    if (selectedMember) {
      try {
        let response;
        if (selectedMember.team_id) {
          console.log(
            "Fetching messages for team member:",
            selectedMember.team_id
          );
          // Fetch messages for team member
          response = await axios.get(
            `http://localhost:3001/Team/TeamMemberMessagesTeam?id=${selectedMember.team_id}&teamid=${Team_id}`
          );
        } else if (selectedMember.TL_ID) {
          console.log("Fetching messages for TL:", selectedMember.TL_ID);
          // Fetch messages for TL
          response = await axios.get(
            `http://localhost:3001/Team/TeamMemberMessagesTeam?id=${selectedMember.TL_ID}&teamid=${Team_id}`
          );
        }

        console.log("Response:", response); // Log the response data

        if (response && response.data && response.data.data) {
          setMessages(response.data.data);
        } else {
          console.error("Invalid response data");
        }
      } catch (error) {
        console.error("Error fetching sender messages:", error);
      }
    }
  };

  const handleMessageButtonClick = async (member) => {
    setSelectedMember(member);
    try {
      let response;
      if (member.team_id) {
        // Fetch messages for team member
        response = await axios.get(
          `http://localhost:3001/Team/TeamMemberMessagesTeam?id=${member.team_id}&teamid=${Team_id}`
        );
      } else if (member.TL_ID) {
        // Fetch messages for TL
        response = await axios.get(
          `http://localhost:3001/Team/TeamMemberMessagesTL?id=${member.TL_ID}&teamid=${Team_id}`
        );
      }
      setMessages(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!selectedMember || !newMessage) return;
    try {
      await axios.post("http://localhost:3001/Team/sendMessage", {
        sender_id: Team_id,
        receiver_id: selectedMember.team_id || selectedMember.TL_ID,
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
    fetchTLMembers();
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
  // const combinedMembers = [...teamMembers, ...TLMembers];
  return (
    <div className="flex mx-10 pt-20 gap-5 h-screen">
      {/* Left container */}
      <div className="w-1/3 rounded-lg shadow-lg border overflow-y-auto p-5 overflow-x-hidden h-[96%]l">
        <div>
          <div className="flex">
            <h1 className="bg-customBlue text-white rounded-lg font-bold mb-4 h-10 w-full text-center text-xl place-content-center">
              Team Members
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            {/* Mapping teamMembers */}
            {teamMembers.map(({ Profile_image, team_id, Team_name }) => (
              <div key={team_id} className="flex items-center gap-4 bg-white border border-gray-400 rounded-lg p-5 w-[350px]">
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
                    className="bg-customBlue rounded-lg shadow-lg p-0.5 text-white font-semibold mt-2 w-[230px]"
                    onClick={() =>
                      handleMessageButtonClick({ team_id, Team_name })
                    }
                  >
                    Message
                  </button>
                </div>
              </div>
            ))}

            {/* Mapping TLMembers */}
            {TLMembers.map(({ Profile_image, TL_ID, TL_fname, TL_lname }) => (
              <div key={TL_ID} className="flex items-center gap-4 bg-white border border-gray-400 rounded-lg p-5 w-[350px]">
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
                  <h6>
                    {TL_fname} {TL_lname}
                  </h6>
                  <button
                    className="bg-customBlue rounded-lg shadow-lg p-0.5 text-white font-semibold mt-2 w-[230px]"
                    onClick={() =>
                      handleMessageButtonClick({ TL_ID, TL_fname, TL_lname })
                    }
                  >
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right container */}
      <div className="flex flex-col bg-bgSky w-2/3 p-4 rounded-lg h-[96%] ">
        <div className="overflow-y-scroll overflow-x-hidden">
          {selectedMember && (
            <h1 className="text-xl p-3 rounded-lg font-semibold fixed mb-10 text-white bg-customBlue w-[750px]">
              {selectedMember.Team_name ||
                `${selectedMember.TL_fname} ${selectedMember.TL_lname}`}
            </h1>
          )}
          <div className="px-5 pt-4">
            <div className="flex flex-col gap-2 pt-12">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  message.Recevier_id != Team_id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg p-2 text-wrap  ${
                    message.Recevier_id != Team_id
                      ? "bg-white shadow-xl rounded-lg p-2"
                      : "bg-white shadow-xl rounded-lg p-2 "
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
          
        </div>
        <div className="flex items-center pt-9">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow px-3 py-2 rounded-md border outline-none shadow-xl"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-customBlue focus:outline-none"
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
