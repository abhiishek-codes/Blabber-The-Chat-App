import React from "react";
import Avatar from "./Avatar";
import { useContext } from "react";
import { userContext } from "../../utils/userContext.js";
import axios from "axios";

const UsersCard = ({ name, email, _id, setsbar, idx, data }) => {
  const {
    searchuserId,
    setsearchuserId,
    token,
    setAllchats,
    setactiveChat,
    activeChat,
    setchatData,
  } = useContext(userContext);
  //console.log(token);

  const ClickHandler = () => {
    const formdata = { userid: data._id };
    console.log(formdata);
    console.log(token);
    axios
      .post("https://blabber-chat-app.vercel.app/api/chat/", formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllchats((prevChats) => {
          const exists = prevChats.some(
            (chat) => chat._id === response.data._id
          );
          if (!exists) return [response.data, ...prevChats];
          else {
            return [
              prevChats.find((chat) => chat._id === response.data._id),
              ...prevChats.filter((chat) => chat._id !== response.data._id),
            ];
          }
        });
        setactiveChat(response.data._id);
        setchatData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <button
      className="w-full border-2 border-black rounded-lg bg-slate-200 py-3 text-left mx-auto hover:bg-green-400  transition-all duration-200 hover:border-white"
      onClick={() => {
        setsbar((prev) => !prev);
        setsearchuserId(data.id);
        ClickHandler();
      }}
    >
      <div className="flex gap-x-3 items-center px-2">
        <Avatar name={name} />
        <div className="flex-col gap-y-2">
          <h1>{name}</h1>
          <h1>{email}</h1>
        </div>
      </div>
    </button>
  );
};

export default UsersCard;
