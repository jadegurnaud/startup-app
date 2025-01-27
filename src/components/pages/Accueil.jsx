import React, { useEffect, useState } from 'react';
import { Container, Button } from '../atoms';
import { DOM } from '../nanites';
import { useSelector, useDispatch } from "react-redux";
import { Guide } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';
import { ViewMap, ViewList } from '../templates';
import { SearchBar, GuidesFilter, HomeCategorieFilter } from '../molecules';
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
      <DOM.StyledContainer height="auto" padding="68px 100px" gap="30px" borderBottom="2px solid #F1F1F1" width="100%" >
        <SearchBar />
      </DOM.StyledContainer>

      <HomeCategorieFilter />

      <DOM.StyledContainer padding="20px 20px 40px 20px" display="flex" flexDirection="column" gap="20px" >
        <Container.RowContainer display="flex" justifyContent="space-between" alignItems="center" padding="0px 12px" >
          <GuidesFilter />
          <DOM.StyledContainer backgroundColor="#F2F2F2" padding="4px" borderRadius="6px" flexDirection="row" display="flex" >

            <Button.Switch onClick={handleVueListe} style={{
              backgroundColor: isVueListe ? "white" : "transparent",
            }}>
              <GridFour />
            </Button.Switch>
            <Button.Switch onClick={handleVueMap} style={{
              backgroundColor: !isVueListe ? "white" : "transparent",
            }}>
              <MapTrifold />
            </Button.Switch>

          </DOM.StyledContainer>
        </Container.RowContainer>

        {isVueListe ? (
          <ViewList guides={guides} favorites={favorites} handleToggleFavorite={handleToggleFavorite} />

        ) : (
          <ViewMap guides={guides} handleToggleFavorite={handleToggleFavorite} />
        )}
      </DOM.StyledContainer>
    </Container.Page>
  );
};

export default Accueil;