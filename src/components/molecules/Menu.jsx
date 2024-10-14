import React from "react";
import { Button, Container, Text } from "../atoms";
import { Link } from "react-router-dom";

const Menu = ({ configs }) => {
  return (
    <Container.Menu className="Menu">
      {configs.map((config, i) => {
        return (
          <Link to={`/${config.slug}`} key={i} style={{ textDecoration: "none", color: "inherit"}}>
            <Text.Paragraph style={{ textAlign: "center" }}>{config.displayName}</Text.Paragraph>
          </Link>
        );
      })}
    </Container.Menu>
  );
};

export default Menu;
