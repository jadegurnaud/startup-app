import React, { useEffect, useState } from "react";
import { Text, Container, Image, Button } from "../atoms";
import { useSelector } from "react-redux";
import { Guide, User } from "../../store/reducers";
import { useDispatch } from "react-redux";
import { GuidesContainer } from "../organisms";
import { DOM } from "../nanites";
import { InfosProfile, GuidesPublies } from "../molecules";
import { useParams } from "react-router-dom";

const ProfileOtherUser = () => {
    const { userId } = useParams();
    const { user } = useSelector((state) => state?.otherUser);
    const { user: currentUser } = useSelector((state) => state?.user);
    const { guidesPublies: guides } = useSelector((state) => state?.otherUserGuides);
    const { followers } = useSelector((state) => state?.userFollowers);
    const { isFollowing } = useSelector((state) => state?.userFollowing);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(User.getUser(userId));
        dispatch(User.getFollowers(userId));
        dispatch(Guide.getGuidesPublies(userId));
        dispatch(User.checkIfFollowing({ userId: currentUser.id, followerId: user.id }));

    }, [userId, dispatch]);

    const handleFollowUser = () => {
        dispatch(User.followUser({ userId: currentUser.id, followerId: user.id }));
    };

    const handleUnfollowUser = () => {
        dispatch(User.unfollowUser({ userId: currentUser.id, followerId: user.id }));
    };
  

  return (
    <Container.Page className="Profil">
      <DOM.StyledContainer style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
            {/*coverImage*/}
        <DOM.StyledContainer position="relative">
            <Image.Base src={
                    user?.coverImage ?? "/coverImage-Profil.png"
                  }
                  alt="Photo de profil" style={{ width: "100%", borderRadius: "20px" }} />        
        </DOM.StyledContainer>
        <DOM.StyledContainer style={{ position: "relative", marginBottom: "120px", top: "-60px", backgroundColor: "transparent" }}>
            <DOM.StyledContainer style={{ boxSizing: "border-box", width:"100%", display: "flex", justifyContent: "space-between", alignItems: "flex-end", alignSelf: "stretch", backgroundColor: "transparent", padding: " 0 10px" }}>
              <DOM.StyledContainer style={{ backgroundColor: "transparent", display: "flex", flexDirection: "column" }}>
                <Image.Base borderRadius="50%" width="110px"
                  src={
                    user?.profileImage ?? "/profil.png"
                  }
                  alt="Photo de profil"
                />
                <Text.Span>{user?.pseudo}</Text.Span>
              </DOM.StyledContainer>
              { isFollowing ? (
                <Button.Base onClick={() => handleUnfollowUser()}>Ne plus suivre</Button.Base>
              ) : ( 
                <Button.Base onClick={() => handleFollowUser()}>Suivre</Button.Base>
              )}

            </DOM.StyledContainer>
            <DOM.StyledContainer style={{ padding: "10px" }}>
              <Text.Paragraph>{user?.firstName}</Text.Paragraph>
              <InfosProfile followers={followers} nbGuidesPublies={ guides.length }></InfosProfile>
              <GuidesPublies></GuidesPublies>
              <DOM.StyledSection id="descriptionProfile">
                <Text.SubTitle>Description</Text.SubTitle>
                <Text.Paragraph>{user?.description}</Text.Paragraph>
              </DOM.StyledSection>
              <Text.SubTitle>Guides publiés</Text.SubTitle>
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

export default ProfileOtherUser;