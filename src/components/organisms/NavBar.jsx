import React from "react";
import { ReactComponent as Heart } from "../../assets/Heart.svg";
import { Container } from "../atoms";
import { useNavigate } from "react-router-dom";
import { DOM } from "../nanites";
import { NavBarLogoContainer, NavBarButtonContainer, NavBarMenuBurger, NavLinkContainer } from "../molecules";
import { useSelector } from "react-redux";

import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const { login, user } = useSelector((state) => state.user);

  return (
    <Container.Aside >
      <NavBarLogoContainer />
      <NavBarMenuBurger />
      <NavLinkContainer />
      <DOM.StyledContainer id="heartSVGnoText" display="none" onClick={() => navigate("/favorites")} >
        <Heart />
      </DOM.StyledContainer>
      <NavBarButtonContainer isLogin={login} user={user} />
    </Container.Aside >
  );
};

export default NavBar;
