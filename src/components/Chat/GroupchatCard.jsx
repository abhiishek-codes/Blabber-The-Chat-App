import React from "react";

const GroupchatCard = ({ data }) => {
  const { users } = data;
  const { latestMessage } = data;
  const name = data.chatName;
  return (
    <div className="flex flex-col">
      <p className="text-[1em]">{name}</p>
      <div className="flex text-[0.8em]">
        <p>
          {latestMessage?.sender?.name}
          {latestMessage?.sender?.name && <>&nbsp;:&nbsp;</>}
        </p>
        <p>{latestMessage?.content}</p>
      </div>
    </div>
  );
};

export default GroupchatCard;
