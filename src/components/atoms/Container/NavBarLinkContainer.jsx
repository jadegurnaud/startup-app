import React from "react";
import { DOM } from "../../nanites";

const NavLinkContainer = ({ children, ...props }) => {
    return (
        <DOM.StyledContainer
            display="flex"
            flexDirection="row"
            alignItems="center"
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