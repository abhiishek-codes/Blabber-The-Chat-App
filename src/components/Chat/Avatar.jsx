import React from "react";

const Avatar = ({ name }) => {
  // Extract the first letter from the name
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center text-xl">
      {firstLetter}
    </div>
  );
};

export default Avatar;
