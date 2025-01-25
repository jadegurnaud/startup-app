import React, { useEffect, useState } from 'react';
import { Text, Container, Button, Input } from '../atoms';
import { DOM } from '../nanites';
import { useSelector, useDispatch } from "react-redux";
import { Guide } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';
import { ViewMap, ViewList } from '../templates';
import { SearchBar } from '../molecules';
import { ReactComponent as GridFour } from '../../assets/GridFour.svg';
import { ReactComponent as MapTrifold } from '../../assets/MapTrifold.svg';

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
      <SearchBar />
      <DOM.StyledContainer backgroundColor="#F2F2F2" padding= "5px" style={{ display: "inline-block", borderRadius: "6px"}}>
        <Button.Switch onClick={handleVueListe} style={{
          backgroundColor: isVueListe ? "white" : "transparent",
        }}>
            <GridFour/> 
        </Button.Switch>
        <Button.Switch onClick={handleVueMap}style={{
          backgroundColor: !isVueListe ? "white" : "transparent",
        }}>
            <MapTrifold/>
        </Button.Switch>
      </DOM.StyledContainer>
        {isVueListe ? (
            <ViewList guides={guides} favorites={favorites} handleToggleFavorite={handleToggleFavorite} />
        
        ) : (
            <ViewMap guides={guides}/>
        )}
        
    </Container.Page>
  );
};

export default Accueil;