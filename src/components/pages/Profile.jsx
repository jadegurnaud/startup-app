import React, { useEffect, useState } from "react";
import { Text, Container, Image, Button } from "../atoms";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Guide, User } from "../../store/reducers";
import { useDispatch } from "react-redux";
import { GuidesContainer } from "../organisms";
import { DOM } from "../nanites";
import { InfosProfile, GuidesPublies, ImageUpload } from "../molecules";
import { ReactComponent as Vector } from "../../assets/Vector.svg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => {
    return state?.user;
  });
  const { guidesPublies: guides } = useSelector((state) => {
    return state?.myGuides
  });
  const { followers } = useSelector((state) => {
    return state?.userFollowers;
  });
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(user?.coverImage || "/coverImage-Profil.png");

  useEffect(() => {
    if (login) {    
      dispatch(Guide.getGuidesPublies(user?.id));
      dispatch(User.getFollowers(user?.id));
    }

  }, [login, user, dispatch]);

  const formattedDate = user?.dateOfBirth ? format(new Date(user.dateOfBirth), "dd/MM/yyyy") :  '';

  const handleCoverImageChange = (newImage) => {
    setCoverImage(newImage);
    // Ici, vous pouvez ajouter la logique pour sauvegarder l'image dans votre backend
  };

  const handleLogout = async () => {
      try {
        const result = await dispatch(User.logout()).unwrap();
        if (result) {
          navigate("/accueil");
        }
      } catch (error) {
        console.error("Failed to logout", error);
      }
    };

  return (
    <Container.Page className="Profil">
      <DOM.StyledContainer style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
            <ImageUpload onImageChange={handleCoverImageChange} initialImage={coverImage} />
          
          <DOM.StyledContainer style={{ position: "relative", marginBottom: "120px", top: "-60px", backgroundColor: "transparent" }}>
            <DOM.StyledContainer style={{ boxSizing: "border-box", width:"100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", alignSelf: "stretch", backgroundColor: "transparent", padding: " 0 10px" }}>
              <DOM.StyledContainer style={{ backgroundColor: "transparent", display: "flex", flexDirection: "column" }}>
                <Image.Base borderRadius="50%" width="110px"
                  src={
                    user?.profileImage
                    ? user.image
                    : "/profil.png"
                  }
                  alt="Photo de profil"
                />
                <Text.Span>{user?.pseudo}</Text.Span>
              </DOM.StyledContainer>
              <DOM.StyledContainer style={{ backgroundColor: "transparent", display: "flex", alignItems: "center", gap: "10px" }}>
              <Button.Base>Modifier le profil</Button.Base>
              <Vector onClick={handleLogout}/>
              </DOM.StyledContainer>
            </DOM.StyledContainer>
            <DOM.StyledContainer style={{ padding: "10px" }}>
              <Text.Paragraph>{user?.firstName}</Text.Paragraph>
              <InfosProfile followers={followers} nbGuidesPublies={ guides.length }></InfosProfile>
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
           
          </DOM.StyledContainer>
      </DOM.StyledContainer>
    </Container.Page>
  );
};

export default Profile;