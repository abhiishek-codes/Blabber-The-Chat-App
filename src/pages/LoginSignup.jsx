/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Videocard from "../components/Videocard";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";

const LoginSignupUser = () => {
  const navigate = useNavigate();

  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const name = userinfo?.name;
  useEffect(() => {
    if (name) {
      navigate("/chats");
    }
  }, [name, navigate]);
  const [loginstate, Setloginstate] = useState(false);
  return !name ? (
    <div className="flex justify-center items-center  md:p-4">
      <div className="w-full max-w-lg md:max-w-[85%] p-4 md:p-[1.5rem] overflow-hidden">
        <div className="flex flex-col md:flex-row justify-evenly tracking-wide">
          <div className="w-full md:w-[40%] pt-4 font-['Basis']">
            {loginstate ? (
              <Login Setloginstate={Setloginstate} />
            ) : (
              <Signup Setloginstate={Setloginstate} />
            )}
          </div>
          <div className="hidden md:block w-full md:w-[60%] mx-auto">
            <Videocard />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginSignupUser;
