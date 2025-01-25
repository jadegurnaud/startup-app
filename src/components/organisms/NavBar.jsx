import React from "react";
import { Container } from "../atoms";
import { NavBarLogoContainer, NavLinkContainer, NavBarButtonContainer } from "../molecules";
import { useSelector } from "react-redux";

const NavBar = () => {

  const { login, user } = useSelector((state) => state.user);

  return (
    <Container.Aside >
      <NavBarLogoContainer />
      <NavLinkContainer />
      <NavBarButtonContainer isLogin={login} user={user} />
    </Container.Aside >
  );
};

export default NavBar;
