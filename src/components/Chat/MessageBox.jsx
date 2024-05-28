import React, { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { userContext } from "../../utils/userContext";
import axios from "axios";
import SenderCard from "./SenderCard.jsx";
import RecieverCard from "./RecieverCard.jsx";
import io from "socket.io-client";
import typinganimation from "../../assets/typinganimation.gif";

const ENDPOINT = "https://blabber-chat-app.vercel.app";
let socket;
let selectedChatCompare;

const MessageBox = () => {
  const { token, activeChat, chatData, notifications, setNotifications } =
    useContext(userContext);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const loggedinUser = user._id;
  const [allMsg, setallMsgs] = useState([]);
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketconnected, setsocketconnected] = useState(false);

  const notificationHandler = async (newMessageRecieved) => {
    try {
      const { data } = await axios.get(
        `https://blabber-chat-app.vercel.app/api/chat/${newMessageRecieved.chat._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      const { _id, latestMessage } = data;
      const newNotification = {
        activechatId: _id,
        chatdata: data,
        name: latestMessage.sender.name,
      };
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
    } catch {
      console.log(err.message);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setsocketconnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => {
      setIsTyping(false);
      console.log(istyping);
    });

    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageRecieved.chat._id
      ) {
        notificationHandler(newMessageRecieved);
      } else {
        console.log("msg received");
        setallMsgs((prevMsgs) => [...prevMsgs, newMessageRecieved]);
        const messageContainer = document.getElementById("messageContainer");
        messageContainer.scrollTo({
          top: messageContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    });

    return () => {
      socket.off("message recieved");
    };
  }, []);

  useEffect(() => {
    if (activeChat) {
      axios
        .get(`https://blabber-chat-app.vercel.app/api/messages/${activeChat}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setallMsgs(response.data);
          selectedChatCompare = activeChat;

          socket.emit("joinChat", activeChat);
        })
        .catch((error) => console.log(error.message));
    }
  }, [activeChat]);

  const SendMsg = () => {
    if (msg) {
      const Data = {
        chatId: activeChat,
        content: msg,
      };
      const formdata = JSON.stringify(Data);
      setMsg("");
      axios
        .post("https://blabber-chat-app.vercel.app/api/messages", formdata, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          socket.emit("new message", response.data);
          setallMsgs((prevMsgs) => [...prevMsgs, response.data]);
        })
        .catch((error) => console.log(error.message));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      SendMsg();
    }
  };

  let typingTimeout; // Declare this outside the component

  const typingHandler = () => {
    if (!socketconnected) return;

    if (!typing && selectedChatCompare === activeChat) {
      setTyping(true);
      socket.emit("typing", activeChat);
    }

    var timerLength = 1000;

    // Clear the previous timeout
    if (typingTimeout) clearTimeout(typingTimeout);

    // Set a new timeout
    typingTimeout = setTimeout(() => {
      if (typing) {
        socket.emit("stop typing", activeChat);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div
      id="messageContainer"
      className="rounded-md h-full w-full flex flex-col overflow-y-auto"
    >
      <div className="flex-1 text-sm tracking-wide py-2 flex flex-col h-[calc(100%-4rem)] overflow-y-auto hide-scrollbar gap-y-3 relative">
        {allMsg.length > 0 &&
          allMsg.map((msg, idx) => {
            const { content, sender, createdAt } = msg;
            const timestamp = new Date(msg.createdAt);
            const hours = timestamp.getHours();
            const minutes = timestamp.getMinutes();
            return (
              <div
                className={`flex ${
                  sender._id == loggedinUser ? "justify-end" : "justify-start"
                }`}
                key={idx}
                ref={(el) => {
                  if (el && idx === allMsg.length - 1) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {sender._id === loggedinUser ? (
                  <SenderCard
                    content={content}
                    hours={hours}
                    minutes={minutes}
                  />
                ) : (
                  <RecieverCard
                    content={content}
                    {...sender}
                    hours={hours}
                    minutes={minutes}
                  />
                )}
              </div>
            );
          })}
      </div>
      <div className="flex gap-x-2 mt-auto pb-2 pt-9">
        <div className="flex flex-col gap-y-1 flex-1">
          {istyping && (
            <img
              src={typinganimation}
              alt="typing..."
              className="w-12 h-9 absolute bottom-12 py-1"
            />
          )}
          <input
            type="text"
            className="rounded-sm h-full w-full px-2 text-sm py-1 text-black relative text-[1rem]"
            id="msgIp"
            placeholder="Enter your message here....."
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
              console.log(e.target.value);
              typingHandler();
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />
        </div>

        <button
          className="bg-green-700 text-white p-1 rounded-sm hover:bg-black transform-cpu duration-300 active:scale-75 text-xl"
          onClick={SendMsg}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
