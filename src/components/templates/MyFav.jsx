import React, { useEffect } from "react";
import { Text, Container } from "../atoms";
import { useSelector, useDispatch } from "react-redux";
import { Guide } from "../../store/reducers";
import { GuidesContainer } from "../organisms";
import { DOM } from "../nanites"

const MyFav = () => {
  const { guides, favorites } = useSelector((state) => {
    return state?.favoritesGuidesUser;
  });
  const { user, login } = useSelector((state) => state.user);

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
    <DOM.StyledContainer>
      <Text.SubTitle style={{ marginBottom: "20px" }} >Mes favoris</Text.SubTitle>
      {guides.length > 0 ? (
        <GuidesContainer
          guides={guides}
          favorites={favorites}
          handleToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <Text.Paragraph>Vous n'avez pas encore de favoris.</Text.Paragraph>
      )}
    </DOM.StyledContainer>

  );
};

export default MyFav;