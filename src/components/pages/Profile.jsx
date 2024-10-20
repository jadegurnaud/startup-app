import React, { useEffect, useState } from "react";
import { Text, Container, Image } from "../atoms";
import { useSelector } from "react-redux";
import { DOM } from "../nanites";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [guides, setGuides] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
          const response = await fetch(`http://localhost:3001/guides/${user.id}`);
          const data = await response.json();
          setGuides(data);
      } catch (error) {
          console.error(error);
      }
  };
  fetchGuides();
});


  return (
    <Container.App className="Profil">
        <Text.Title>Profil</Text.Title>
        <Image.Base $borderRadius="50%" $width="100px"
          src={
            user?.image?.url
            ? user.image.url
            : "https://www.gravatar.com/avatar/?d=identicon"
          }
          alt="Avatar"
        />
        <Text.Paragraph>{user?.firstName} {user?.lastName}</Text.Paragraph>
        <Text.Paragraph>{user?.email}</Text.Paragraph>
        <Text.Paragraph>{user?.biography}</Text.Paragraph>
        <Text.Title>Mes guides</Text.Title>
        <DOM.StyledContainer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", margin: "0px 10px" }}>
          {guides?.map((guide, index) => (
            <DOM.StyledContainer key={index} style={{ display: "flex", flexDirection: "column", backgroundColor: "#DCDCDC", borderRadius: "20px" }}>
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
              <Text.Paragraph>{guide.title}</Text.Paragraph>
              <Text.Paragraph>{guide.description}</Text.Paragraph>
            </DOM.StyledContainer>
          ))}
        </DOM.StyledContainer>
        
    </Container.App>
  );
};

export default Profile;