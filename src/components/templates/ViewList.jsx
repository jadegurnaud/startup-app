import React from "react";
import { DOM } from "../nanites";
import { Text } from "../atoms";
import { GuidesContainer } from '../organisms';

const ViewList = ({ guides, favorites, handleToggleFavorite}) => {
    return (
        <DOM.StyledContainer>
            <Text.SubTitle>
                Recommandés pour vous
            </Text.SubTitle>
            <GuidesContainer
            guides={guides}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
            />
           
        </DOM.StyledContainer>
    );
};

export default ViewList;