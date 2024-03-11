import React from "react";

function FeatureCards(props) {
  return (
    <div className="flex flex-col text-left p-5 w-full lg:w-1/4 border-2 cursor-pointer rounded-xl gap-2 hover:shadow-[0_3px_10px_rgb(0,0,0,0.5)] mb-5">
      {props.icon}
      <h3 className="font-semibold text-xl">{props.title}</h3>
      <p className="text-sm text-gray-500">
        {props.description}
      </p>
    </div>
  );
}

export default FeatureCards;
