import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Text, Icon } from '../atoms';
import {DOM} from "../nanites";
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const GuideCard = ({ guide, isFavorite, toggleFavorite, isProfilePage = false }) => {
  return (
    <DOM.StyledSubContainer style={{ display: "flex", flexDirection: "column", borderRadius: "1.4rem", width: "100%", maxWidth: "13rem", margin: "auto"}}>
               <DOM.StyledSubContainer style={{ position: "relative", borderRadius: "1.4rem" }}>
                <Link to={`/guides/${guide.id}`} style={{ textDecoration: "none"}}>
                  <Image.Base
                    $width="100%"
                    src={guide.coverImage}
                    style={{
                      objectFit: "cover",
                      height: "10rem",
                      borderTopLeftRadius: "1.4rem",
                      borderTopRightRadius: "1.4rem",
                    }}
                  />
                  {!isProfilePage && (
                    <Text.Span
                      style={{
                        position: "absolute",
                        top: "0.6rem",
                        left: "0.5rem",
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        padding: "0.3rem",
                        borderRadius: "0.3rem",
                      }}
                    >
                      {guide.user.firstName} {guide.user.lastName}
                    </Text.Span>
                  )}
                </Link>
                {!isProfilePage && (
                  <Icon.Base
                    $position="absolute"
                    $top="0.5rem"
                    $right="0.5rem"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleFavorite(guide.id)}
                  >
                    {isFavorite ? (
                      <MdFavorite />
                    ) : (
                      <MdFavoriteBorder />
                    )}
                  </Icon.Base>
                )}
              </DOM.StyledSubContainer>
              <DOM.StyledSubContainer style={{ padding: "0.5rem", display:"flex", flexDirection:"column", gap:"0.4rem", borderRadius: "1.4rem" }}>
                <Text.Span $fontSize="1rem">{guide.title}</Text.Span>
                <Text.Span $fontSize="1rem">{guide.description}</Text.Span>
              </DOM.StyledSubContainer>
            </DOM.StyledSubContainer>
      
  );
};

export default GuideCard;