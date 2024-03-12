import React from "react";

function Button(props) {
  return (
    <div>
      <button className="bg-customBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
        {props.title}
      </button>
    </div>
  );
}

export default Button;


