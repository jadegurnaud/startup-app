import { useState } from "react";

const useColor = (
  state = { primary: "black", secondary: "white" }
) => {
  const [primary, setPrimary] = useState(state.primary);
  const [secondary, setSecondary] = useState(state.secondary);
  const setColors = ({ primary, secondary }) => {
    setPrimary(primary);
    setSecondary(secondary);
  };
  return [
    {
      primary: primary,
      secondary: secondary,
      setPrimary: setPrimary,
      setSecondary: setSecondary,
    },
    setColors,
  ];
};

export default useColor;