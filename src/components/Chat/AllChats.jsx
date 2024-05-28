import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../../utils/userContext.js";
import axios from "axios";
import ChatUserCard from "./ChatUserCard.jsx";
import CreateGc from "./CreateGc.jsx";

const AllChats = () => {
  const {
    allChats,
    setAllchats,
    chatData,
    setactiveChat,
    setchatData,
    isVisible,
    setisVisible,
  } = useContext(userContext);

  const [creategc, setcreatgc] = useState(false);
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userinfo?.token;

  useEffect(() => {
    const url = "https://blabber-chat-app.vercel.app/api/chat/";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        //console.log("called from AllChats");
        let sortedData = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllchats(sortedData);
        if (sortedData.length > 0) {
          setactiveChat(sortedData[0]._id);
          setchatData(sortedData[0]);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <div className="w-full h-full  border-2 border-black rounded-lg bg-slate-50 mr-2">
        <div className="flex justify-between pt-5 px-3 items-center">
          <h1 className="text-lg md:text-2xl ">My Chats</h1>
          <button
            className="bg-slate-900 text-white py-2 px-2 rounded-md text-sm transition-transform duration-200 transform-gpu active:scale-75 "
            onClick={() => setcreatgc(true)}
          >
            Create Grp Chat ➕
          </button>

          <button
            className="lg:hidden"
            onClick={() => setisVisible(!isVisible)}
          >
            ❌
          </button>
        </div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto hide-scrollbar">
          {allChats != undefined && (
            <div className="flex flex-col gap-y-4 pt-4 items-center justify-center px-2 ">
              {allChats.map((val, index) => {
                return (
                  <ChatUserCard {...val} key={index} data={val} idx={index} />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Group Chat Popup */}

      {creategc && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-slate-100 p-4 rounded-lg shadow-lg max-w-lg w-full ">
            <CreateGc setcreatgc={setcreatgc} />
          </div>
        </div>
      )}

      {creategc && (
        <div className="fixed inset-0 bg-black opacity-[88%] z-40"></div>
      )}
    </>
  );
};

export default AllChats;
