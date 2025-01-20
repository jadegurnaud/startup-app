import React from "react";
import { Container, Icon, Image, Text } from "../atoms";
import { Link } from "react-router-dom";

const MenuItemIcon = ({ config, left = false, ...props }) => {
  return (
    <Container.RowContainer>
      <Link
        to={`/${config.slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={config.onClick}
      >
        <Container.RowContainer
          justifyContent="center"
          alignItems="center"
          gap={10}
        >
          {left && config.iconSource && (
            <Icon.Base height={'24px'}>{config.iconSource}</Icon.Base>
          )}
          <Text.Paragraph textAlign="center">
            {config.displayName}
          </Text.Paragraph>
          {!left && config.iconSource && (
            <Icon.Base height={'24px'}>{config.iconSource}</Icon.Base>
          )}
          {!left && config.imageSource && (
            <Image.Base src={config.imageSource} borderRadius="50%" width={40} height={'40px'} />
          )}
        </Container.RowContainer>
      </Link>
    </Container.RowContainer>
  );
};

export default MenuItemIcon;
