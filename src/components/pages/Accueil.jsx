import React, { useEffect } from 'react';
import { Text, Container } from '../atoms';
import { DOM } from '../nanites';
import GuideCard from '../organisms/GuideCard';
import { useSelector, useDispatch } from "react-redux";
import { Guide } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';

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
    <Container.App className="Accueil">
      <DOM.StyledContainer>
        <DOM.StyledContainer>
          <Text.Title style={{ textAlign: "center" }}>Parcourez le monde</Text.Title>
          <Text.SubTitle style={{ textAlign: "center" }}>
            Trouver le guide de voyage parfait pour votre prochaine destination
          </Text.SubTitle>
        </DOM.StyledContainer>
      
      <Text.SubTitle style={{ textAlign: "left" }}>
        Recommandés pour vous
      </Text.SubTitle>
      <DOM.StyledContainer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", margin: "0px 10px" }}>
        {guides && guides.map((guide, index) => (
          <GuideCard
            key={index}
            guide={guide}
            isFavorite={favorites[guide.id] || false}
            toggleFavorite={handleToggleFavorite}
          />
        ))}
      </DOM.StyledContainer>
    </DOM.StyledContainer>
    </Container.App>
  );
};

export default Accueil;