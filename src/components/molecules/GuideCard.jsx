import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Text, Icon } from '../atoms';
import {DOM} from "../nanites";
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useNetwork } from '../../providers/contexts';
import Reactotron from 'reactotron-react-js';

const GuideCard = ({ guide, isFavorite, toggleFavorite, isProfilePage = false }) => {
  const {isOnline} = useNetwork();
  const srcImage = isOnline && guide?.coverImage ? guide.coverImage : "/coverImage.png";
  
  
  return (
    Reactotron.log(isOnline, "Online"),
    <DOM.StyledSubContainer style={{ display: "flex", flexDirection: "column", borderRadius: "1.4rem", width: "100%", maxWidth: "13rem", margin: "auto"}}>
               <DOM.StyledSubContainer position= "relative" borderRadius= "1.4rem">
                <Link to={`/guides/${guide.id}`} style={{ }}>
                  <Image.Base
                    width="100%"
                    height="150px"
                    objectFit= "cover"
                    src={srcImage}
                      alt="Photo de couverture"
                    style={{
                      borderTopLeftRadius: "1.4rem",
                      borderTopRightRadius: "1.4rem",
                    }}
                  />
                  {!isProfilePage && (
                    <Text.Span
                      fontSize="0.7rem"
                      backgroundColor= "rgba(0, 0, 0, 0.5)"
                      style={{
                        position: "absolute",
                        top: "0.6rem",
                        left: "0.5rem",
                        color: "white",
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
                    position="absolute"
                    top="0.5rem"
                    right="0.5rem"
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
                <Text.Span>{guide.title}</Text.Span>
                <Text.Span>{guide.description}</Text.Span>
              </DOM.StyledSubContainer>
            </DOM.StyledSubContainer>
      
  );
};

export default GuideCard;