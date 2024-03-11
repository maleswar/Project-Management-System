import React from "react";
import MessageCard from "./Layouts/MessageCard";
function Message() {
  return (
    <div className="w-full mt-32 px-10">
      <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-10">
        <MessageCard
          senderName="John Doe"
          subjectOptions={["Option 1", "Option 2", "Option 3"]}
          timestamp="2024-03-05 14:30"
        />
        <MessageCard
          senderName="James Smith"
          subjectOptions={["Option 1", "Option 2", "Option 3"]}
          timestamp="2024-03-05 14:30"
        />
        <MessageCard
          senderName="Mary Johnson"
          subjectOptions={["Option 1", "Option 2", "Option 3"]}
          timestamp="2024-03-05 14:30"
        />
        <MessageCard
          senderName="Mia Anderson"
          subjectOptions={["Option 1", "Option 2", "Option 3"]}
          timestamp="2024-03-05 14:30"
        />
      </div>
    </div>
  );
}

export default Message;
