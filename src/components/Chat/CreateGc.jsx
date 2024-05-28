import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../../utils/userContext";
import axios from "axios";
import Avatar from "./Avatar";

const CreateGc = ({ setcreatgc }) => {
  const [gcName, setGcName] = useState("");
  const [gcUserSearch, setGcUserSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [gcUsers, setGcUsers] = useState([]);
  const { token, setAllchats, allChats, setactiveChat, setchatData } =
    useContext(userContext);
  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://blabber-chat-app.vercel.app/api/users/?search=${gcUserSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSearchUsers(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [gcUserSearch]);

  const clickHandler = async () => {
    const users = gcUsers.map((element) => element._id);

    if (users.length < 2) {
      alert("Minimum of 3 users must be maintained");
      return; // Return the previous state
    }

    const formdata = {
      name: gcName,
      users: users,
    };
    const finaldata = JSON.stringify(formdata);
    console.log(finaldata);

    try {
      const response = await axios.post(
        "https://blabber-chat-app.vercel.app/api/chat/group",
        finaldata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setAllchats([response.data.fullChat, ...allChats]);
      setactiveChat(response.data.fullChat._id);
      setchatData(response.data.fullChat);
      console.log(allChats);
      setcreatgc(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full relative">
        <div className=" border-black h-full w-full flex flex-col justify-center items-center gap-y-5">
          <h1 className="text-xl pt-5">Create Group Chat</h1>
          <input
            type="text"
            className="w-[70%] border-2 px-2 py-1 rounded-md"
            placeholder="Enter Group Name"
            value={gcName}
            onChange={(e) => setGcName(e.target.value)}
          />
          <input
            type="text"
            className="w-[70%] border-2 px-2 py-1 rounded-md"
            placeholder="Add Users eg Dad Mom"
            value={gcUserSearch}
            onChange={(e) => {
              settoggle(true);
              setGcUserSearch(e.target.value);
            }}
          />

          {toggle && searchUsers.length > 0 && (
            <div className="w-[95%]  max-h-60 overflow-y-auto hide-scrollbar border-2 border-black rounded-md mt-2">
              {searchUsers.map((val, idx) => (
                <button
                  key={idx}
                  className="w-full border-b border-black bg-slate-50 py-2 text-left hover:bg-green-400 transition-all duration-200 hover:border-white"
                  onClick={() => {
                    setGcUsers((prev) => {
                      const exists = prev.some((curr) => curr._id === val._id);
                      if (!exists) return [val, ...prev];
                      else
                        return [
                          prev.find((curr) => curr._id === val._id),
                          ...prev.filter((curr) => curr._id !== val._id),
                        ];
                    });
                    settoggle(false);
                    setGcUserSearch("");
                  }}
                >
                  <div className="flex md:gap-x-2 items-center px-2">
                    <div className="flex-shrink-0">
                      <Avatar name={val.name} />
                    </div>

                    <div className="flex flex-col">
                      <h1 className="break-words">{val.name}</h1>
                      <h1 className="max-w-[99%] break-words">{val.email}</h1>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {gcUsers.length > 0 && (
            <div className="flex flex-wrap items-center w-[70%] gap-x-1 gap-y-2">
              {gcUsers.map((val) => {
                return (
                  <div className="flex items-center px-2 gap-x-3 py-[2px] justify-between text-sm  rounded-md bg-black text-white">
                    <h1 className="text-[0.9em]">{val.name}</h1>
                    <button
                      onClick={() => {
                        setGcUsers((prev) =>
                          prev.filter((curr) => curr._id !== val._id)
                        );
                      }}
                    >
                      ✖
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <button
            className=" text-white bg-black rounded-md px-3 py-2 text-sm transform-cpu duration-300 active:scale-75"
            onClick={() => clickHandler()}
          >
            Create Chat
          </button>
        </div>
        <button
          className="absolute top-0 right-2 text-bold text-xl  transform-cpu duration-300 active:scale-75"
          onClick={() => {
            settoggle(false);
            setcreatgc(false);
          }}
        >
          ✖
        </button>
      </div>
    </>
  );
};

export default CreateGc;
