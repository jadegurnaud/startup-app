import React, { useState } from "react";
import { Aside } from "../organisms";
import { Text, Container, Image } from "../atoms";
import { DOM } from "../nanites";

const Accueil = () => {
  const [images, setImages] = useState([
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" }
  ]);

  return (
    <DOM.StyledContainer className="Accueil">
      <Container.App>
        <Image.Base $width="100%"
          style={{ objectFit: "cover", height: "150px" }} src='/sapins.jpg' />
        <Text.SubTitle style={{ textAlign: "left" }}>
          Vos recommandations
        </Text.SubTitle>
        <DOM.StyledContainer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", margin: "0px 10px" }}>
          {images.map((image, index) => (
            <Image.Base key={index} src={image.url} $width= "100%" />
          ))}
        </DOM.StyledContainer>
      </Container.App>
    </DOM.StyledContainer>
  );
};

export default Accueil;