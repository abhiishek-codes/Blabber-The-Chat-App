import React, { useState } from "react";
import Logo from "../assets/logo-no-background.png";
import PHidelogo from "../assets/eye.png";
import PShowlogo from "../assets/hidden.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ Setloginstate }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [eyelogo, Seteyelogo] = useState(true);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://blabber-chat-app.vercel.app/api/users/login",
        formData
      );
      localStorage.setItem("userInfo", JSON.stringify(await response.data));
      console.log(response.data);
      navigate("/chats"); // Assuming successful login
    } catch (error) {
      if (error.response && error.response.data.error) {
        const { error: responseError } = error.response.data;
        if (Array.isArray(responseError)) {
          setErrors(
            responseError.map((fieldError) => ({
              field: fieldError.field,
              message: fieldError.message,
            }))
          );
        } else {
          // General error
          setErrors([{ message: responseError }]);
        }
      } else {
        // Request failed before reaching server
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl text-center">Login to your Account</h1>
        <img className="w-[30%] py-7 mx-auto" src={Logo} alt="Blabber" />
      </div>
      <div className="text-left mx-7 ">
        <div className="px-1">
          <label className="block pb-1 px-1 text-[1.1rem]">username</label>
          <input
            className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.map(
            (error, index) =>
              error.field === "username" && (
                <div className="text-red-600" key={index}>
                  <p>{error.message}</p>
                </div>
              )
          )}

          <label className="block pt-4 pb-1 px-1 text-[1.1rem]">password</label>
          <div className="relative">
            <input
              className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]  "
              type={eyelogo ? "password" : "text"}
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              className={`absolute right-2 top-1 w-[26px] hover:bg-slate-200 hover:rounded-full hover:p-[0.5px]`}
              onClick={() => Seteyelogo(!eyelogo)}
            >
              <img src={eyelogo ? PHidelogo : PShowlogo} alt="/" />
            </button>
          </div>
          {errors.map(
            (error, index) =>
              error.field === "password" && (
                <div className="text-red-600" key={index}>
                  <p>{error.message}</p>
                </div>
              )
          )}
        </div>
        <div className="flex flex-col items-center ">
          {errors.map(
            (error, index) =>
              !error.field && (
                <div className="text-red-600" key={index}>
                  <p>{error.message}</p>
                </div>
              )
          )}
          <div className="pt-10 flex flex-col">
            <button
              className="border px-[4rem] py-[0.3rem] rounded-md bg-green-700 text-white hover:bg-slate-800 transition-all duration-300 mb-5"
              onClick={() => {
                setFormData({
                  username: "testuser@gmail.com",
                  password: "test@1234",
                });
              }}
            >
              Get test Credentials
            </button>
            <button
              className="border px-[4rem] py-[0.3rem] rounded-md bg-green-700 text-white hover:bg-slate-800 transition-all duration-300 mb-5"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>

          <h2>
            Not registered Yet :
            <Link to="/signup">
              <button
                className="border-b-2 border-black"
                onClick={() => {
                  Setloginstate(false);
                }}
              >
                Signup
              </button>
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Login;
