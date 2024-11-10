import React, { useEffect } from "react";
import { Text, Container } from "../atoms";
import { useSelector, useDispatch } from "react-redux";
import GuideCard from "../organisms/GuideCard";
import { DOM } from "../nanites";
import { Guide } from "../../store/reducers";

const Favorites = () => {
  const { guides, favorites } = useSelector((state) => {
    return state?.favoritesGuidesUser;
  });
  const {user, login} = useSelector((state) => state.user);

  const dispatch = useDispatch();


  useEffect(() => {
    if (login) {
      dispatch(Guide.getFavoritesGuides(user.id));
    }
  }, [login, user, dispatch]);

    const handleToggleFavorite = async (guideId) => {
      try {
        dispatch(
          Guide.toggleFavorite({ 
            userId: user.id,
            guideId,
            isFavorite: favorites[guideId] || false
          })
        );
      } catch (error) {
        console.error("Failed to toggle favorite", error);
      }
    };

    return (
        <Container.App className="Favorites">
            <Text.Title>Favoris</Text.Title>
            {guides.length > 0 ? (
                <DOM.StyledContainer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", margin: "0px 10px" }}>
                    {guides && guides.map((guide, index) => (
                        <GuideCard key={index}
                        guide={guide}
                        isFavorite={favorites[guide.id]}
                        toggleFavorite={handleToggleFavorite} />
                    ))}
                </DOM.StyledContainer>
            ) : (
                <Text.Paragraph>Vous n'avez pas encore de favoris.</Text.Paragraph>
            )}
        </Container.App>

    );
};

export default Favorites;