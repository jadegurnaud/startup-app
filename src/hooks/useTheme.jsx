import useColor from "./useColor";

const useTheme = ({
  container = {
    primary: "white",
    secondary: "#D9D9D9",
  },
  colors = {
    primary: "black",
    secondary: "white",
  },
}) => {
  const [containerColors, setContainerColors] = useColor(container);
  const [colorsColors, setColorsColors] = useColor(colors);
  const setTheme = ({ colors, containers }) => {
    setColorsColors(colors);
    setContainerColors(containers);
  };
  return [
    {
      colors: { colors: colorsColors, containers: containerColors },
    },
    setTheme,
  ];
};

export default useTheme;