import React, { useEffect, useState } from 'react';
import { Text, Container, Button } from '../atoms';
import { DOM } from '../nanites';
import { useSelector, useDispatch } from "react-redux";
import { Guide } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';
import { ViewMap, ViewList } from '../templates';
import { se } from 'date-fns/locale';

const Accueil = () => {
  const { guides, favorites } = useSelector((state) => {
    return state?.recommendedGuides;
  });

  const user = useSelector((state) => state.user.user);
  const login = useSelector((state) => state.user.login);

  const [isVueListe, setIsVueListe] = useState(true);
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

  const handleVueListe = () => {
    setIsVueListe(true);
  };

  const handleVueMap = () => {
    setIsVueListe(false);
  };

  return (
    <Container.Page className="Accueil">
        <Button.Base onClick={handleVueListe}>
            <Text.Paragraph>
                Vue liste
            </Text.Paragraph>
        </Button.Base>
        <Button.Base onClick={handleVueMap}>
            <Text.Paragraph>
                Vue carte
            </Text.Paragraph>
        </Button.Base>
        {isVueListe ? (
            <ViewList guides={guides} favorites={favorites} handleToggleFavorite={handleToggleFavorite} />
        
        ) : (
            <ViewMap/>
        )}
        
    </Container.Page>
  );
};

export default Accueil;