import React, { useEffect, useState } from "react";
import { Text, Container, Image } from "../atoms";
import { DOM } from "../nanites";
import { Link } from "react-router-dom";

const Accueil = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch("http://localhost:3001/guides");
        const data = await response.json();
        setGuides(data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchGuides();
  }, []);

  return (
    <Container.App className="Accueil">
      <DOM.StyledContainer>
        <DOM.StyledContainer>
          <Text.Title style={{ textAlign: "center" }}>Parcourez le monde</Text.Title>
          <Text.SubTitle style={{ textAlign: "center" }}>
          Trouver le guide de voyage parfait pour votre prochaine destination
          </Text.SubTitle>
        </DOM.StyledContainer>
        <Text.SubTitle style={{ textAlign: "left" }}>
          Recommandés pour vous
        </Text.SubTitle>
        <DOM.StyledContainer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", margin: "0px 10px" }}>
          {guides.map((guide, index) => (
            <DOM.StyledContainer key={index} style={{ display: "flex", flexDirection: "column", backgroundColor: "#DCDCDC", borderRadius: "20px" }}>
               <DOM.StyledContainer style={{ position: "relative" }}>
                <Link to={`/guides/${guide.id}`} style={{ textDecoration: "none"}}>
                  <Image.Base
                    $width="100%"
                    src={guide.coverImage}
                    style={{
                      objectFit: "cover",
                      height: "150px",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  />
                  <Text.Paragraph
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {guide.user.firstName} {guide.user.lastName}
                  </Text.Paragraph>
                </Link>
              </DOM.StyledContainer>
              <DOM.StyledContainer style={{ padding: "10px" }}>
                <Text.Paragraph>{guide.title}</Text.Paragraph>
                <Text.Paragraph>{guide.description}</Text.Paragraph>
              </DOM.StyledContainer>
            </DOM.StyledContainer>
          ))}
        </DOM.StyledContainer>
      </DOM.StyledContainer>
    </Container.App>
  );
};

export default Accueil;