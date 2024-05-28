import React, { useEffect, useState } from "react";

const useScreenSize = (threshold = 1024) => {
  const [screenSize, setscreenSize] = useState(window.innerWidth < threshold);

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setscreenSize(window.innerWidth < threshold);
      }, 50);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
