import React from "react";
import { DOM } from "../../nanites";

const NavLinkContainer = ({ children, ...props }) => {
    return (
        <DOM.StyledContainer
            display="flex"
            flexDirection="row"
            alignItems="center"
            height="38px"
            padding="10px 14px"
            gap="10px"
            borderRadius="4px"
            cursor="pointer"
            {...props}
        >
            {children}
        </DOM.StyledContainer>
    );
}

export default NavLinkContainer;