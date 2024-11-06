import React, { useState, useEffect } from 'react';
import { Text, Container } from '../atoms';
import { DOM } from '../nanites';
import GuideCard from '../organisms/GuideCard';
import { useSelector } from "react-redux";

const Accueil = () => {
  const [guides, setGuides] = useState([]);
  const [favorites, setFavorites] = useState({});
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {

    const fetchGuides = async () => {
      try {
        const response = await fetch("http://localhost:3001/guides");
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }

    };
    fetchGuides();

    if(user?.id){

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:3001/favorites/user/${user.id}`);
        const data = await response.json();
        const favoritesMap = data.reduce((acc, favorite) => {
          acc[favorite.guide.id] = true;
          return acc;
        }, {});
        setFavorites(favoritesMap);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }
  }, [user]);

  const toggleFavorite = async (guideId) => {
    const isCurrentlyFavorite = favorites[guideId];
    try {
      if (isCurrentlyFavorite) {
        await fetch(`http://localhost:3001/favorites/${user.id}/${guideId}`, {
          method: 'DELETE',
        });
      } else {
        await fetch("http://localhost:3001/favorites", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, guideId }),
        });
      }
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [guideId]: !isCurrentlyFavorite,
      }));
    } catch (error) {
      console.error("Error toggling favorite:", error);
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
        {guides.map((guide, index) => (
          <GuideCard
            key={index}
            guide={guide}
            isFavorite={user?.id ? favorites[guide?.id] : false}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </DOM.StyledContainer>
    </DOM.StyledContainer>
    </Container.App>
  );
};

export default Accueil;