import React from "react";
import { DOM } from "../../nanites";

const NavLinkContainer = ({ children, ...props }) => {
    return (
        <DOM.StyledContainer
            display="flex"
            flexDirection="row"
            alignItems="center"
            padding="10px 14px"
            borderRadius="4px"
            cursor="pointer"
            background="none"
            {...props}
        >
            {children}
        </DOM.StyledContainer>
    );
}

export default NavLinkContainer;