import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Text, Icon } from '../atoms';
import {DOM} from "../nanites";
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const GuideCard = ({ guide, isFavorite, toggleFavorite }) => {
  return (
    <DOM.StyledContainer style={{ display: "flex", flexDirection: "column", backgroundColor: "#DCDCDC", borderRadius: "20px" }}>
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
                <Icon.Base
                  $position="absolute"
                  $top="10px"
                  $right="10px"
                  $width="30px"
                  $height="30px"
                  style={{ cursor: "pointer", backgroundColor: "transparent" }}
                  onClick={() => toggleFavorite(guide.id)}
                >
                  {isFavorite ? (
                    <MdFavorite />
                  ) : (
                    <MdFavoriteBorder />
                  )}
                </Icon.Base>
              </DOM.StyledContainer>
              <DOM.StyledContainer style={{ padding: "10px" }}>
                <Text.Paragraph>{guide.title}</Text.Paragraph>
                <Text.Paragraph>{guide.description}</Text.Paragraph>
              </DOM.StyledContainer>
            </DOM.StyledContainer>
      
  );
};

export default GuideCard;