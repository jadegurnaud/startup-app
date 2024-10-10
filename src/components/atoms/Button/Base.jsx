import React from "react";
import { DOM } from "../../nanites";

const Base = ({ ...props }) => {
  return <DOM.StyledButton {...props}></DOM.StyledButton>;
};

export default Base;