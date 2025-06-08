import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  useEffect(() => {
    setWindowSize(getWindowSize());
  }, []); 

  return { windowSize };
};

export default useScreenSize;
