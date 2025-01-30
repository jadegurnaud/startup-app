import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Text, Icon } from '../atoms';
import { DOM } from "../nanites";
import { ReactComponent as WhiteHeart } from "../../assets/Heart_white.svg";
import { ReactComponent as RedHeart } from "../../assets/HeartFillRed.svg";
import { useNetwork } from '../../providers/contexts';
import Reactotron from 'reactotron-react-js';

const GuideCard = ({ guide, isFavorite, toggleFavorite, isProfilePage = false }) => {

  const srcImage = guide?.coverImage ? guide.coverImage : "/coverImage.png";


  return (
    <DOM.StyledContainer style={{ display: "flex", flexDirection: "column", borderRadius: "12px", width: "304px", maxWidth: "328px", margin: "auto", gap: "8px", aligneItems: "center", padding: "12px" }}>
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
          <Link to={`/guides/${guide.id}`} style={{}}>
          </Link>
          {!isProfilePage && (
            <Text.Span
              fontSize="0.75rem"
              color="white"
              fontWeight="500"
              width="189px"
            >
              <Link
                to={`/users/${guide.user.id}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}

              >
                {guide.user.firstName} {guide.user.lastName}
              </Link>
            </Text.Span>
          )}
          {!isProfilePage && (
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
          )}
        </DOM.StyledContainer>
      </DOM.StyledContainer>
      <DOM.StyledContainer style={{ padding: "0.5rem", display: "flex", flexDirection: "column", fontWeight: "700" }}>
        <Text.Span>{guide.title}</Text.Span>
      </DOM.StyledContainer>
    </DOM.StyledContainer>

  );
};

export default GuideCard;