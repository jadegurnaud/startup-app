import React from "react";
import { DOM } from "../../nanites";

const Base = ({ ...props }) => {
  return <DOM.StyledList {...props}></DOM.StyledList>;
};

export default Base;