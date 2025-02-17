import React from "react";
import { ReactComponent as Heart } from "../../assets/Heart.svg";
import { Container, Text } from "../atoms";
import { useNavigate } from "react-router-dom";
import { DOM } from "../nanites";
import { NavBarLogoContainer, NavBarButtonContainer, NavBarMenuBurger, NavLinkContainer } from "../molecules";
import { useSelector } from "react-redux";

const AsideNewGuide = () => {
  const navigate = useNavigate();
  const { login, user } = useSelector((state) => state.user);

  return (
    <Container.ColumnContainer gap="20px">
        <Text.Span>Page de couverture</Text.Span>
        <Text.Span>Itineraire</Text.Span>
        <Text.Span>Tokyo</Text.Span>
    </Container.ColumnContainer >
  );
};

export default AsideNewGuide;
