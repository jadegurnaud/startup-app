import React from "react";
import { Container, Text } from "../atoms";
import { Link } from "react-router-dom";

const Menu = ({ configs }) => {
  return (
    <Container.Menu className="Menu">
      {configs.map((config, i) => (
        <Link
          to={`/${config.slug}`}
          key={i}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={config.onClick}
        >
          <Text.Paragraph style={{ textAlign: "center" }}>{config.displayName}</Text.Paragraph>
        </Link>
        
      ))}
    </Container.Menu>
  );
};

export default Menu;
