import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "url:../assets/blabber.png";
import { useContext } from "react";
import { userContext } from "../utils/userContext";

const Navbar = () => {
  const { remainingHeight, setRemainingHeight } = useContext(userContext);

  useEffect(() => {
    const elementHeight = document.getElementById("myElement").offsetHeight;

    const newRemainingHeight = window.innerHeight - elementHeight;

    setRemainingHeight(newRemainingHeight);
  }, []);

  return (
    <div id="myElement" className="h-auto bg-bgcolor text-white font-['Mona']">
      <div className="flex justify-between items-center w-[80%] mx-auto py-8">
        <Link to="/">
          <img
            src={Logo}
            alt="Blabber The Chat App"
            className="w-36 h-22 scale-110 transform-cpu duration-300 active:scale-75"
          />
        </Link>
        <Link to="/login">
          <button className="bg-bgbutton px-7 py-2 rounded-sm transform-cpu active:scale-75 duration-300 tracking-wide text-black hover:bg-white hover:text-black">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
