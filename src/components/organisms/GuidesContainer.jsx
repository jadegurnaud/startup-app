import React from "react";
import { DOM } from "../nanites";
import { GuideCard } from "../molecules";

const GuidesContainer = ({ guides, favorites, handleToggleFavorite, isProfilePage = false }) => {
    return (
        <DOM.StyledContainer
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(13rem, 1fr))",
                gap: "1rem",

            }}>
            {guides && guides.map((guide, index) => (
                <GuideCard key={index}
                    guide={guide}
                    isFavorite={favorites[guide.id]}
                    toggleFavorite={handleToggleFavorite}
                    isProfilePage={isProfilePage} />
            ))}
        </DOM.StyledContainer>
    );
};

export default GuidesContainer;