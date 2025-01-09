import React from "react";
import { Button, Container, Image, Text } from "../atoms";
import { Link } from "react-router-dom";
import MenuItemIcon from "../molecules/MenuItemIcon";
import { ReactComponent as Notif } from "../../assets/notif.svg";

const Menu = ({ configs }) => {
  return (
    <Container.Menu>
      <Container.RowContainer
        gap={40}
        justifyContent="flex-start"
        alignItems="center"
      >
        {/* A CHANGER LE LOGO ICI */}
        <Link to="/" style={{ width: 100, height: 34 }}>
          <Image.Base
            src="https://via.placeholder.com/150"
            height={"100%"}
            width={"100%"}
          />
        </Link>
        <MenuItemIcon config={configs[0]} left />
      </Container.RowContainer>
      <Container.RowContainer gap={40}>
        <Container.RowContainer gap={20}>
          {configs.map((config, i) =>
            config.slug !== "specialOffers" &&
            config.slug !== "login" &&
            config.slug !== "profil" &&
            config.slug !== "newGuideHome" ? (
              <MenuItemIcon config={config} key={i} />
            ) : null
          )}
        </Container.RowContainer>
        <Container.RowContainer gap={10}>
          {configs.map((config, i) =>
            config.slug === "login" ? (
              <Button.Base key={i} onClick={config.onClick}>
                {config.displayName}
              </Button.Base>
            ) : config.slug === "profil" ? (
              <Container.RowContainer gap={20}>
                <MenuItemIcon config={config} key={i} />
                <Button.Base onClick={config.onClick}>
                  <Notif />
                </Button.Base>
              </Container.RowContainer>
            ) : config.slug === "newGuideHome" ? (
              <Button.Base key={i} onClick={config.onClick}>
                {config.displayName}
              </Button.Base>
            ) : null
          )}
        </Container.RowContainer>
      </Container.RowContainer>
    </Container.Menu>
  );
};

export default Menu;
