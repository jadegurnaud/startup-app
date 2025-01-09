import React, { useEffect } from "react";
import { Text, Container, Image } from "../atoms";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Guide } from "../../store/reducers";
import { useDispatch } from "react-redux";
import { GuidesContainer } from "../organisms";
import { DOM } from "../nanites";
import { InfosProfile, GuidesPublies } from "../molecules";

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

  const formattedDate = user?.dateOfBirth ? format(new Date(user.dateOfBirth), "dd/MM/yyyy") :  '';

  return (
    <Container.Page className="Profil">
      <DOM.StyledContainer style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
      <DOM.StyledContainer
        height="402px"
        width="100%"
      >
      <Image.Base borderRadius="7%" width="100%" height="100%"
        src={user?.coverImage
          ? user.coverImage
          : "/coverImage.png"
        }
        alt="Image de couverture"
      />
      </DOM.StyledContainer>
        <Image.Base borderRadius="50%" width="110px"
          src={
            user?.profileImage
            ? user.image
            : "/profil.png"
          }
          alt="Photo de profil"
        />
        <Text.Paragraph>{user?.pseudo}</Text.Paragraph>
        <Text.Paragraph>{user?.firstName}</Text.Paragraph>
        <InfosProfile></InfosProfile>
        <GuidesPublies></GuidesPublies>
        <DOM.StyledSection id="descriptionProfile">
          <Text.SubTitle>Description</Text.SubTitle>
          <Text.Paragraph>{user?.description}</Text.Paragraph>
        </DOM.StyledSection>
        <Text.SubTitle>Mes guides publiés</Text.SubTitle>
        {guides.length > 0 ? (
          <GuidesContainer
            guides={guides}
            favorites={{}}
            handleToggleFavorite={() => {}}
            isProfilePage={true}
          />
        ) : (
          <Text.Paragraph>Vous n'avez pas encore crée de guides.</Text.Paragraph>
        )}
        </DOM.StyledContainer>
    </Container.Page>
  );
};

export default Profile;