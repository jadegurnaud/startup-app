import React from "react";
import { DOM } from "../../nanites";

const MainButton = ({ ...props }) => {
    return <DOM.StyledButton
        padding="10px 14px"
        width="141px"
        height="38px"
        gap="10px"
        color="white"
        fontWeight="700"
        fontSize="12px"
        {...props}></DOM.StyledButton>;
};

export default MainButton;