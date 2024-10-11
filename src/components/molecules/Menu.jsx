import React from "react";
import { Button, Container, Text } from "../atoms";

const Menu = ({ configs }) => {
  return (
    <Container.Menu className="Menu">
      {configs.map((config, i) => {
        return (
          <Button.Base key={i}>
            <Text.Paragraph>{config.displayName}</Text.Paragraph>
          </Button.Base>
        );
      })}
    </Container.Menu>
  );
};

export default Menu;
