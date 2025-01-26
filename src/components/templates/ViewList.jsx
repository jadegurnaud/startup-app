import React from "react";
import { DOM } from "../nanites";
import { GuidesContainer } from '../organisms';

const ViewList = ({ guides, favorites, handleToggleFavorite}) => {
    return (
        <DOM.StyledContainer>
            <GuidesContainer
            guides={guides}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
            />
           
        </DOM.StyledContainer>
    );
};

export default ViewList;