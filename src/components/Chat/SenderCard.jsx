import React from "react";

const SenderCard = ({ content, hours, minutes }) => {
  return (
    <div className="min-w-[15%] max-w-[70%] md:max-w-[50%] md:min-w-[8%] bg-green-500 px-2 rounded-md py-1">
      <div className="flex flex-col ">
        <h1
          style={{ wordBreak: "break-all" }}
          className="text-right text-[0.9em] md:text-base"
        >
          {content}
        </h1>
        <h1 className="text-[0.7em] text-left text-black">
          {hours}:{minutes}
        </h1>
      </div>
    </div>
  );
};

export default SenderCard;
