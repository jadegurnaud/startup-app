import React, { useEffect } from 'react';
import { Text, Container } from '../atoms';
import { DOM } from '../nanites';
import { useSelector, useDispatch } from "react-redux";
import { Guide } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';
import { GuidesContainer } from '../organisms';

const Accueil = () => {
  const { guides, favorites } = useSelector((state) => {
    return state?.recommendedGuides;
  });

  const user = useSelector((state) => state.user.user);
  const login = useSelector((state) => state.user.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(Guide.getRecommendedGuides());
  }, [dispatch, login]);

  useEffect(() => {
    if (login) {
      dispatch(Guide.getFavoritesGuides(user.id));
    }
  }, [login, user, dispatch]);

  const handleToggleFavorite = (guideId) => {
    if (!login) {
      navigate("/login");
      return;
    }

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
    <Container.Page className="Accueil">
        <DOM.StyledContainer>
          <Text.Title>Parcourez le monde</Text.Title>
          <Text.SubTitle textAlign= "center">
            Trouver le guide de voyage parfait pour votre prochaine destination
          </Text.SubTitle>
        </DOM.StyledContainer>
      
        <Text.SubTitle>
          Recommandés pour vous
        </Text.SubTitle>
        <GuidesContainer
          guides={guides}
          favorites={favorites}
          handleToggleFavorite={handleToggleFavorite}
        />
    </Container.Page>
  );
};

export default Accueil;