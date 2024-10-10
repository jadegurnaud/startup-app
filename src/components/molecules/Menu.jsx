import React from "react";
import { Button, Container } from "../atoms";

const Menu = ({ configs }) => {
  return (
    <Container.Menu
    
    >
      {configs.map((config, i) => {
        return (
          <Button.Base>
            {config.displayName}
          </Button.Base>
        );
      })}
    </Container.Menu>
  );
};

export default Menu;
