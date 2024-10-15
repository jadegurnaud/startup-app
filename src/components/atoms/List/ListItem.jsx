import React from "react";
import { DOM } from "../../nanites";

const Base = ({ ...props }) => {
  return <DOM.StyledListItem {...props}></DOM.StyledListItem>;
};

export default Base;