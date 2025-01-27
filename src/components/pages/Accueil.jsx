import React, { useEffect, useState } from 'react';
import { Container, Button } from '../atoms';
import { DOM } from '../nanites';
import { useSelector, useDispatch } from "react-redux";
import { Guide } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';
import { ViewMap, ViewList } from '../templates';
import { SearchBar, GuidesFilter } from '../molecules';
import { ReactComponent as GridFour } from '../../assets/GridFour.svg';
import { ReactComponent as MapTrifold } from '../../assets/MapTrifold.svg';


const Accueil = () => {
  const { guides, favorites } = useSelector((state) => state?.guides);
  const { user, login} = useSelector((state) => state?.user);

  const [isVueListe, setIsVueListe] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('plusAimes');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    switch(currentFilter) {
      case 'plusAimes':
        dispatch(Guide.getPlusAimesGuides());
        break;
      case 'ajoutsRecents':
        console.log('ajoutsRecents');
        dispatch(Guide.getAjoutsRecentsGuides());
        break;
      case 'abonnements':
        dispatch(Guide.getAbonnementsGuides());
        break;
      case 'plusConsultes':
        dispatch(Guide.getPlusConsultesGuides());
        break;
    }
  }, [dispatch, login, currentFilter]);

  useEffect(() => {
    if (login) {
      dispatch(Guide.getFavoritesGuides(user.id));
    }
  }, [login, user, dispatch]);

  const handleFilterChange = (filter) => {
    console.log(filter);
    setCurrentFilter(filter);
  };

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
      <Container.RowContainer justifyContent="space-between">
                
        <GuidesFilter onFilterChange={handleFilterChange} />
        <DOM.StyledContainer backgroundColor="#F2F2F2" padding="5px" style={{ display: "inline-block", borderRadius: "6px" }}>
        <Container.RowContainer backgroundColor="transparent" >
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
        </Container.RowContainer>
      </DOM.StyledContainer>
            </Container.RowContainer>
      
      {isVueListe ? (
        <ViewList guides={guides} favorites={favorites} handleToggleFavorite={handleToggleFavorite} />

      ) : (
        <ViewMap guides={guides} handleToggleFavorite={handleToggleFavorite} />
      )}

    </Container.Page>
  );
};

export default Accueil;