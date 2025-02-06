import React from "react";
import { DOM } from "../../nanites";

const InputForm = (props) => {
    return <DOM.StyledInput style={{  padding: '10px', borderRadius: '6px', height: '48px', border: '2px solid #EFEFEF' }} className="input" {...props}></DOM.StyledInput>;
}

export default InputForm;