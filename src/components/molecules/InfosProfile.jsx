import React from 'react';
import {DOM} from "../nanites";
import {Text} from "../atoms";

const InfosProfile = ({ followers, nbGuidesPublies }) => {
 
  return (
    <DOM.StyledSection>
          <DOM.StyledArticle>
            <Text.Span>Pays</Text.Span>
            <Text.Span>France</Text.Span>
          </DOM.StyledArticle>
          <DOM.StyledArticle>
            <Text.Span>Guides en ligne</Text.Span>
            <Text.Span>{ nbGuidesPublies }</Text.Span>
          </DOM.StyledArticle>
          <DOM.StyledArticle>
            <Text.Span>Abonnés</Text.Span>
            <Text.Span>{ followers }</Text.Span>
          </DOM.StyledArticle>
        </DOM.StyledSection>
      
  );
};

export default InfosProfile;