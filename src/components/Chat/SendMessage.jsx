import React, { useState } from "react";
import { useContext } from "react";
import { userContext } from "../../utils/userContext.js";
import getSender from "../../utils/getSender.js";
import ProfileModal from "./ProfileModal.jsx";
import GcModal from "./GcModal.jsx";
import MessageBox from "../Chat/MessageBox.jsx";

const SendMessage = ({ chatName, groupAdmin, users, _id }) => {
  const { activeChat, chatData, setisVisible, isVisible } =
    useContext(userContext);
  const [tgProfile, settgProfile] = useState(false);
  const [gcProfile, setgcProfile] = useState(false);

  if (chatData != null) {
    const { groupChat } = chatData;
    const idx = getSender(chatData.users) == chatData.users[0].name ? 0 : 1;
    return (
      <>
        <div className="w-full h-full border-2 border-black rounded-lg text-white flex flex-col px-3  gap-y-2 text-xl bg-slate-900">
          <div className="flex  items-center justify-between bg-slate-600 py-3 my-2 px-3 rounded-md">
            <button
              className="text-base lg:hidden bg-white rounded-md transform-cpu duration-300 active:scale-75 p-1"
              onClick={() => setisVisible(!isVisible)}
            >
              🔍
            </button>
            <h1 className="text-base md:text-3xl">
              {groupChat ? chatData.chatName : getSender(chatData.users)}
            </h1>

            <button
              onClick={() =>
                !groupChat ? settgProfile(true) : setgcProfile(true)
              }
              className="bg-white rounded-md text-base md:text-xl p-1 md:p-0"
            >
              👁️‍🗨️
            </button>
          </div>
          <div className="h-[calc(100%-1rem)] overflow-y-auto hide-scrollbar border-none px-3">
            <MessageBox />
          </div>
        </div>

        {tgProfile && (
          <>
            <div
              className={`fixed z-50 top-[50%] left-[50%] font-['Basis'] transform -translate-x-[50%] -translate-y-[50%] transition-opacity duration-500 ${
                tgProfile ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="relative">
                <ProfileModal {...chatData.users[idx]} data={chatData} />
              </div>

              <div className="absolute top-[24%] right-[5%] sm:top-[25%] sm:right-[7%] ">
                <button onClick={() => settgProfile(false)}>❌</button>
              </div>
            </div>

            <div className="fixed inset-0 bg-black opacity-80 z-40 "></div>
          </>
        )}

        {gcProfile && (
          <>
            <div
              className={`fixed z-50 top-[50%] left-[50%] font-['Basis'] transform -translate-x-[50%] -translate-y-[50%] transition-opacity duration-500 text-black ${
                gcProfile ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <GcModal {...chatData} setgcProfile={setgcProfile} />
            </div>

            <div className="fixed inset-0 bg-black opacity-80 z-40 "></div>
          </>
        )}
      </>
    );
  } else {
    return (
      <div className="w-full h-full border-2 border-black rounded-lg text-white flex flex-col px-3  gap-y-2 text-xl bg-slate-900 items-center justify-center">
        <h1>Select a chat or Create a chat</h1>
      </div>
    );
  }
};

export default SendMessage;
