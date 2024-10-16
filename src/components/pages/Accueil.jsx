import React, { useEffect, useState } from "react";
import { Aside } from "../organisms";
import { Text, Container, Image } from "../atoms";
import { DOM } from "../nanites";

const Accueil = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/guides");
        const data = await response.json();
        // Extraire les URLs des images
        const imageUrls = data.map(guide => guide.image);
        setImages(imageUrls);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGuides();
  }, []);

  return (
    <Container.App className="Accueil">
      <DOM.StyledContainer>
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
      </DOM.StyledContainer>
    </Container.App>
  );
};

export default Accueil;