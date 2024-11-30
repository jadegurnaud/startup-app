import React from "react";
import { DOM } from "../../nanites";

const Base = ({ ...props }) => {
    return <DOM.StyledForm {...props}
    style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
    ></DOM.StyledForm>;
};

export default Base;
