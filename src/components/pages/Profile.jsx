import React, { useEffect } from "react";
import { Text, Container, Image } from "../atoms";
import { useSelector } from "react-redux";
import { DOM } from "../nanites";
import { Guide } from "../../store/reducers";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => {
    return state?.user;
  });
  const { guides } = useSelector((state) => {
    return state?.userGuides;
  });
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (login) {    
      dispatch(Guide.getUserGuides(user?.id));
    }

  }, [login, user, dispatch]);


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