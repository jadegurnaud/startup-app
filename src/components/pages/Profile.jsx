import React from "react";
import { Text, Container, Image } from "../atoms";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

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
        
    </Container.App>
  );
};

export default Profile;