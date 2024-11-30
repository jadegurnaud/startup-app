import React from "react";
import { DOM } from "../../nanites";

const Base = ({ ...props }) => {
  return <DOM.StyledContainer backgroundColor = "transparent" {...props}></DOM.StyledContainer>;
};

export default Base;