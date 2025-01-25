import React from "react";
import { DOM } from "../../nanites";

const Switch = ({ ...props }) => {
  return <DOM.StyledButton padding= "2px 12px" border="none" {...props}></DOM.StyledButton>;
};

export default Switch;