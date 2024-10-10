import React from "react";
import { DOM } from "../../nanites";

const Base = ({ ...props }) => {
  return <DOM.StyledImage {...props}></DOM.StyledImage>;
};

export default Base;