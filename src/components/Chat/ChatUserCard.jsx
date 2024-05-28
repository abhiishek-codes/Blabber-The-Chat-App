import React from "react";
import GroupchatCard from "./GroupchatCard";
import OnetooneCard from "./OnetooneCard";
import { userContext } from "../../utils/userContext";
import { useContext } from "react";

const ChatUserCard = ({ groupChat, data, idx }) => {
  const {
    searchuserId,
    setsearchuserId,
    token,
    setAllchats,
    setactiveChat,
    activeChat,
    chatData,
    setchatData,
    isVisible,
    setisVisible,
  } = useContext(userContext);
  // console.log(data);
  return (
    <button
      onClick={() => {
        setactiveChat(data._id);
        setchatData(data);
        setisVisible(!isVisible);
      }}
      className={`border-2 px-2 py-2 rounded-md w-full text-left transition-all duration-300 ${
        data._id == activeChat
          ? "bg-black text-white hover:bg-black hover:text-white"
          : " hover:bg-black hover:text-white"
      }`}
    >
      {/* {console.log(activeChat)} */}
      {groupChat == true ? (
        <GroupchatCard data={data} />
      ) : (
        <OnetooneCard data={data} />
      )}
    </button>
  );
};

export default ChatUserCard;
