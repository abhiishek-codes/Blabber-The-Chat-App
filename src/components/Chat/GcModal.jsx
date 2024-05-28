import React, { useState, useEffect } from "react";
import { userContext } from "../../utils/userContext";
import { useContext } from "react";
import axios from "axios";
import Avatar from "./Avatar";

const GcModal = ({ chatName, users, groupAdmin, _id, setgcProfile }) => {
  const [gcUsers, setGcUsers] = useState(users);
  const [gcUserSearch, setGcUserSearch] = useState(null);
  const {
    token,
    allChats,
    setAllchats,
    chatData,
    setchatData,
    activeChat,
    setactiveChat,
  } = useContext(userContext);
  const [searchUsers, setSearchUsers] = useState([]);
  const [toggle, settoggle] = useState(false);
  const [name, setName] = useState(null);

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
        console.log(response.data);
        setSearchUsers(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [gcUserSearch]);

  const ClickHandler = async () => {
    const data = {
      chatId: _id,
      updatedName: name,
    };
    const formdata = JSON.stringify(data);
    console.log(formdata);
    const response = await axios.put(
      "https://blabber-chat-app.vercel.app/api/chat/rename",
      formdata,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllchats((prev) => {
      return prev.map((chat) => {
        if (chat._id === _id) {
          chat.chatName = response.data.chatName;
        }
        return chat;
      });
    });

    setchatData({ ...chatData, chatName: response.data.chatName });
    console.log(chatData);
  };

  const removeUsers = async (userid, updatedusers, grpAdmin) => {
    const data = {
      userId: userid,
      chatId: _id,
    };
    const formdata = JSON.stringify(data);
    const response = await axios.put(
      "https://blabber-chat-app.vercel.app/api/chat/groupremove",
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (grpAdmin)
      setAllchats((chat) => {
        return chat.filter((chat) => chat._id !== _id);
      });
  };

  useEffect(() => {
    console.log(allChats);
  }, [allChats]);

  const addUser = async (id) => {
    const data = {
      userId: id,
      chatId: _id,
    };
    const formdata = JSON.stringify(data);
    console.log(formdata);
    const response = await axios.put(
      "https://blabber-chat-app.vercel.app/api/chat/groupadd",
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
  };

  const leaveGrp = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const grpAdmin = true;
    removeUsers(user._id, null, grpAdmin);
    if (activeChat === allChats[0]._id) {
      setchatData(allChats[1]);
      setactiveChat(allChats[1]._id);
    } else {
      setchatData(allChats[0]);
      setactiveChat(allChats[0]._id);
    }
  };

  return (
    <>
      <div className="w-[80vw] md:w-[40vw] bg-slate-200 rounded-lg text-center relative">
        <div className="flex flex-col justify-center items-center gap-y-6 px-3 py-4 w-[90%] mx-auto text-center">
          <h1 className="text-xl md:text-3xl">{chatName}</h1>
          <div className="flex flex-wrap items-center gap-3 ">
            {gcUsers.map((user) => {
              return (
                <div className=" flex  px-2 gap-x-3 py-[2px] rounded-md bg-black text-white text-[0.7em] md:text-[0.9em]">
                  <h1>{user.name}</h1>
                  <button
                    onClick={() => {
                      setGcUsers((prev) => {
                        const updatedUsers = prev.filter(
                          (curr) => curr._id !== user._id
                        );

                        // Check if the length of updatedUsers is at least 3
                        if (updatedUsers.length < 3) {
                          alert("Minimum of 3 users must be maintained");
                          return prev; // Return the previous state
                        }

                        removeUsers(user._id, updatedUsers);
                        return updatedUsers;
                      });
                    }}
                  >
                    ✖
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex gap-x-4 text-[0.7em] md:text-[0.9em] w-full items-center justify-center text-center ">
            <input
              type="text"
              placeholder="New Group Name"
              className="py-2 px-2 w-[50%]  text-center rounded-md "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="bg-black text-white px-2 py-1 rounded-md transform-cpu duration-300 active:scale-75"
              onClick={() => ClickHandler()}
            >
              Update
            </button>
          </div>
          <input
            type="text"
            placeholder="Search for user to add"
            className="w-[67%] py-1 px-2 rounded-md text-center"
            value={gcUserSearch}
            onChange={(e) => {
              setGcUserSearch(e.target.value);
              settoggle(true);
            }}
          />

          {toggle && searchUsers.length > 0 && (
            <div className="w-[70%] max-h-60 overflow-y-auto hide-scrollbar border-2 border-black rounded-md mt-2">
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
                    setGcUserSearch(null);
                    addUser(val._id);
                  }}
                >
                  <div className="flex gap-x-3 items-center px-2">
                    <Avatar name={val.name} />
                    <div className="flex-col gap-y-2">
                      <h1>{val.name}</h1>
                      <h1>{val.email}</h1>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              leaveGrp();
              setgcProfile(false);
            }}
            className="bg-black text-white px-2 py-1 rounded-md transform-cpu duration-300 active:scale-75 text-[0.7em] md:text-[0.9em]"
          >
            Leave Group
          </button>
        </div>
      </div>
      <div className="absolute top-1 right-3">
        <button
          onClick={() => setgcProfile(false)}
          className="transform-cpu duration-300 active:scale-75"
        >
          ✖
        </button>
      </div>
    </>
  );
};

export default GcModal;
