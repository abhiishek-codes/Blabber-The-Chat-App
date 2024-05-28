import React, { useState } from "react";
import login from "url:../assets/login.mp4";

const Videocard = () => {
  return (
    <>
      <video
        pointer-events-none
        loop
        autoPlay
        muted
        className="rounded-3xl w-4/5 object-fill mx-auto"
      >
        <source src={login} type="video/mp4" />
      </video>
    </>
  );
};

export default Videocard;
