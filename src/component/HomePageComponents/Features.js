import React from "react";
import {
  FaTasks,
  FaComments,
  FaClock,
  FaFileAlt,
  FaUsers,
  FaExchangeAlt,
} from "react-icons/fa";
import FeatureCards from "./Layouts2/FeatureCards";

function Features() {
  const icon1 = <FaTasks size={30} className="text-customBlue" />;
  const icon2 = <FaComments size={30} className="text-customBlue" />;
  const icon3 = <FaClock size={30} className="text-customBlue" />;
  const icon4 = <FaFileAlt size={30} className="text-customBlue" />;
  const icon5 = <FaUsers size={30} className="text-customBlue" />;
  const icon6 = <FaExchangeAlt size={30} className="text-customBlue" />;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:px-32 px-5  ">
      <h1 className="text-5xl font-bold lg:text-start text-customBlue">
        Our Special Features
      </h1>
      <div className="flex flex-wrap justify-center gap-5 mt-10">
        <FeatureCards
          icon={icon1}
          title="Board & Task"
          description="Visually plan and manage your workflow with Kanban boards and task lists."
        />
        <FeatureCards
          icon={icon2}
          title="Discussion"
          description="Foster team communication and collaboration with threaded discussions and forums."
        />
        <FeatureCards
          icon={icon3}
          title="Time Tracking"
          description="Track time spent on tasks and projects for accurate budgeting and resource allocation."
        />
        <FeatureCards
          icon={icon4}
          title="Documents & Files"
          description="Store, share, and collaborate on documents and files in a central location."
        />
         <FeatureCards
          icon={icon5}
          title="Team Collaboration"
          description="Real-time chat, video conferencing, and file sharing keep your
          team connected and productive."
        />
         <FeatureCards
          icon={icon6}
          title="Integration"
          description="Connect your project management system with other tools you use
          to streamline your workflow."
        />
      </div>
    </div>
  );
}

export default Features;
