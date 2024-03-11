import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

const CountUpItem = ({ value, label }) => (
  <div className="text-center">
    <CountUp end={value} duration={3} separator="," />
    <p className="text-sm">{label}</p>
  </div>
);

function UserCount() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set isVisible to true after a delay (adjust as needed)
    const delay = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Clean up the timeout on component unmount
    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      <div className={`bg-bgSky text-4xl font-bold mb-2 md:px-32 md:mt-20 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container overflow-hidden">
          <div className="grid grid-cols-4 mx-10 mt-20 mb-20 text-customBlue">
            <CountUpItem value={100} label="Projects" />
            <CountUpItem value={40} label="Clients" />
            <CountUpItem value={20} label="Our Team" />
            <CountUpItem value={76} label="Awards" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCount;
