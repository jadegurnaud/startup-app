import React from "react";
import { DOM } from "../nanites";
import { Text } from "../atoms";
import { GuidesContainer } from '../organisms';
import { Guide } from "../../store/reducers";
import { GuidesFilter } from "../molecules";

const ViewList = ({ guides, favorites, handleToggleFavorite}) => {
    return (
        <DOM.StyledContainer>
            <GuidesFilter />
            <GuidesContainer
            guides={guides}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
            />
           
        </DOM.StyledContainer>
    );
};

export default ViewList;