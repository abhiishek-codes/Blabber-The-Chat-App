import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Chat/Header";
import AllChats from "../components/Chat/AllChats";
import SendMessage from "../components/Chat/SendMessage";
import { userContext } from "../utils/userContext";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const { isVisible, setisVisible } = useContext(userContext);

  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const name = userinfo?.name;

  useEffect(() => {
    const handleResize = () => {
      setisVisible(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return name ? (
    <div>
      <Header />
      <div className="flex flex-col h-[87vh] py-3 px-4 font-['Basis'] max-w-full">
        <div className="flex justify-between h-full gap-x-4 relative">
          <div
            className={`font-["Basis"] transition-all duration-300 ease-in-out transform lg:translate-x-0 ${
              isVisible
                ? "translate-x-0"
                : "-translate-x-[120%] lg:translate-x-0"
            } w-[95vw] lg:w-[30vw] xl:w-[25vw] h-full absolute lg:relative z-10`}
          >
            <AllChats />
          </div>
          <div className=" w-[99vw] md:w-[85vw] lg:w-[70vw] xl:w-[75vw] h-full mx-auto font-['Basis']">
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="w-screen h-screen bg-bgcolor flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <h1 className="text-white text-3xl">Login and try again</h1>
          <Link to="/login">
            <button className="px-3 py-2 bg-bgbutton transform-cpu active:scale-75 duration-300 rounded-md">
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
