import React from "react";

const RecieverCard = ({ content, profilePic, name, hours, minutes }) => {
  return (
    <div className="min-w-[15%] max-w-[70%] md:max-w-[50%] md:min-w-[8%]  bg-slate-500 px-2 rounded-md flex flex-col gap-y-1">
      <div className="flex gap-x-1 items-center">
        <img src={profilePic} alt="PP" className="w-6 h-6" />
        <h1 className="text-[0.8em] mb-1 text-black mt-3">{name}</h1>
      </div>
      <div className="flex flex-col justify-center">
        <h1
          style={{ wordBreak: "break-all" }}
          className="text-left text-[0.9em] md:text-base"
        >
          {content}
        </h1>
        <h1 className="text-[0.8em] text-right text-black">
          {hours}:{minutes}
        </h1>
      </div>
    </div>
  );
};

export default RecieverCard;
