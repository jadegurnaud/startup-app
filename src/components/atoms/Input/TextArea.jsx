import React from "react";
import { DOM } from "../../nanites";

const TextArea = (props) => {
    return <DOM.StyledTextArea style={{  padding: '10px', borderRadius: '6px',  border: "none" }} className="input" {...props}></DOM.StyledTextArea>;
}

export default TextArea;