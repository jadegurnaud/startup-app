import React, { useEffect, useState } from 'react';
import { Container, Button } from '../atoms';
import { DOM } from '../nanites';
import { useSelector, useDispatch } from "react-redux";
import { Guide, Category } from '../../store/reducers';
import { useNavigate } from 'react-router-dom';
import { ViewMap, ViewList } from '../templates';
import { SearchBar, GuidesFilter, HomeCategorieFilter } from '../molecules';
import { ReactComponent as GridFour } from '../../assets/GridFour.svg';
import { ReactComponent as MapTrifold } from '../../assets/MapTrifold.svg';
import { ca } from 'date-fns/locale';


const Accueil = () => {
  const { guides, favorites } = useSelector((state) => state?.guides);
  const { categories } = useSelector((state) => state?.categories);
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
        dispatch(Guide.getAjoutsRecentsGuides());
        break;
      case 'abonnements':
        dispatch(Guide.getAbonnementsGuides(user.id));
        break;
      case 'plusConsultes':
        dispatch(Guide.getPlusConsultesGuides());
        break;
    }
  }, [dispatch,user, login, currentFilter]);

  useEffect(() => {
    if (login) {
      dispatch(Guide.getFavoritesGuides(user.id));
    }
  }, [login, user, dispatch]);

  useEffect(() => {
    
    dispatch(Category.getCategories());
  }, [dispatch]);

  const handleFilterChange = (filter) => {
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

  const handleLocationSelect = (location) => {
    dispatch(Guide.getGuidesBySearch(location));
  };

  const handleCategorySelect = (categoryId) => {
    dispatch(Guide.getGuidesByCategory(categoryId));
  };

  return (
    <Container.Page className="Accueil">

      <DOM.StyledContainer height="auto" padding="68px 100px" gap="30px" borderBottom="2px solid #F1F1F1" width="100%" >
        <SearchBar onLocationSelect={handleLocationSelect} />

      </DOM.StyledContainer>

      <HomeCategorieFilter categories={categories} onCategorySelect={handleCategorySelect}/>

      <DOM.StyledContainer padding="20px 20px 40px 20px" display="flex" flexDirection="column" gap="20px" >
        <Container.RowContainer display="flex" justifyContent="space-between" alignItems="center" padding="0px 12px" >
          <GuidesFilter onFilterChange={handleFilterChange}/>
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
          <ViewMap guides={guides} favorites={favorites} handleToggleFavorite={handleToggleFavorite} />
        )}
      </DOM.StyledContainer>
    </Container.Page>
  );
};

export default Accueil;