import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Text, Icon, Image } from '../atoms';
import { DOM } from "../nanites";
import { ReactComponent as WhiteHeart } from "../../assets/Heart_white.svg";
import { ReactComponent as RedHeart } from "../../assets/HeartFillRed.svg";
import { useSelector } from 'react-redux';

const GuideCard = ({ guide, isFavorite, toggleFavorite, isProfilePage = false }) => {

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (guide.user.id !== user.id) {
      navigate(`/users/${guide.user.id}`);
    } else {
      navigate("/profil");
    }
  };

  const srcImage = guide?.coverImage ? guide.coverImage : "/coverImage.png";


  return (
    <DOM.StyledContainer onClick={() => navigate(`/guides/${guide.id}`)} style={{ display: "flex", flexDirection: "column", borderRadius: "12px", width: "304px", maxWidth: "328px", margin: "auto", gap: "8px", aligneItems: "center", padding: "12px", backgroundColor: "white" }}>
      <DOM.StyledContainer
        position="relative"
        borderRadius="6px"
        overflow="hidden"
        height="204px"
        padding="12px"
        gap="10px"
        boxShadow="0px 4px 15px 0px rgba(0, 0, 0, 0.25)"
        // backgroundImage={srcImage}
        backgroundSize="cover"
        background={`linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${srcImage}) lightgray 50% / cover no-repeat`}
      >
        <DOM.StyledContainer display="flex" height="36px" padding="0 6px" alignItems="center" gap="10px" >
          {!isProfilePage && (
            <Container.RowContainer gap="10px">
            <DOM.StyledContainer overflow="hidden" borderRadius="50%" width="40px" height="40px" backgroundColor="blue" cursor="pointer" onClick={handleProfileClick} >
                <Image.Base width="100%"
                    src={
                        guide.user?.profileImage
                            ? guide.user.image
                            : "/profil.png"
                    }
                    alt="Photo de profil"
                />
            </DOM.StyledContainer>
            <Text.Span
              fontSize="0.75rem"
              color="white"
              fontWeight="500"
              width="160px"
              cursor="pointer"
              onClick={handleProfileClick}
                          >
                {guide.user.firstName} {guide.user.lastName}
              
            </Text.Span>
            <Icon.Base
              style={{ cursor: "pointer" }}
              onClick={() => toggleFavorite(guide.id)}
            >
              {isFavorite ? (
                <RedHeart />
              ) : (
                <WhiteHeart />
              )}
            </Icon.Base>
            </Container.RowContainer>
          )}
        </DOM.StyledContainer>
      </DOM.StyledContainer>
      <DOM.StyledContainer style={{ padding: "0.5rem", display: "flex", flexDirection: "column",  }}>
        <Text.Span style={{ fontWeight: "700" }}>{guide.title}</Text.Span>
        <Container.RowContainer gap= '10px'>
            { guide?.categories?.map((category, index) => (
                <Text.Span key={index}>{ category.name }</Text.Span>
            ))}
        </Container.RowContainer>
      </DOM.StyledContainer>
    </DOM.StyledContainer>

  );
};

export default GuideCard;