import React from "react";
import HomeVideo from "url:../assets/home1.mp4";
import Global from "url:../assets/home2.mp4";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../utils/userContext";
import wave from "../assets/wave.svg";

const Home = () => {
  const { remainingHeight, setRemainingHeight } = useContext(userContext);

  return (
    <>
      <div
        className=" bg-bgcolor my-auto pt-2 md:pt-0"
        style={{ height: `${remainingHeight}px` }}
      >
        <div className="pt-2 mx-auto flex flex-col items-center justify-center gap-y-4 md:gap-y-8 text-white max-w-7xl">
          <h1 className="text-3xl  md:text-5xl font-bold tracking-wide">
            Blabber The Chat App
          </h1>
          <p className="text-md md:text-lg tracking-wide font-medium text-center px-4 pt-1">
            Blabber Makes it easy and fun to stay in touch & communicate
            anywhere anyplace with anyone
          </p>
          <div className="flex items-center justify-center w-full gap-x-2 overflow-hidden">
            <div className="flex-1 max-w-lg p-2 hidden md:block">
              <video loop autoPlay muted className="w-full h-auto rounded-lg">
                <source src={HomeVideo} type="video/mp4" />
              </video>
            </div>
            <div className="flex-1 max-w-lg p-2">
              <video loop autoPlay muted className="w-full h-auto rounded-lg">
                <source src={Global} type="video/mp4" />
              </video>
            </div>
          </div>

          <Link to="/login">
            <button className="bg-bgbutton px-10 py-2 rounded-sm transform-cpu active:scale-75 duration-300 tracking-wide text-black hover:bg-white hover:text-black font-[Mona]">
              Start Journey
            </button>
          </Link>
        </div>
      </div>

      {/* <div className="overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 270"
          preserveAspectRatio="xMidYMid meet"
          className="w-screen"
        >
          <path
            fill="#1C1C24"
            fill-opacity="1"
            d="M0,32L26.7,48C53.3,64,107,96,160,122.7C213.3,149,267,171,320,154.7C373.3,139,427,85,480,85.3C533.3,85,587,139,640,181.3C693.3,224,747,256,800,245.3C853.3,235,907,181,960,138.7C1013.3,96,1067,64,1120,74.7C1173.3,85,1227,139,1280,154.7C1333.3,171,1387,149,1413,138.7L1440,128L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
          ></path>
        </svg>
      </div> */}
    </>
  );
};

export default Home;
