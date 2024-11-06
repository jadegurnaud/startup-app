import React, { useEffect, useState } from "react";
import { Text, Container } from "../atoms";
import { useSelector } from "react-redux";
import GuideCard from "../organisms/GuideCard";
import { DOM } from "../nanites";

const Favorites = () => {
    const user = useSelector((state) => state.auth.user);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://localhost:3001/favorites/user/${user.id}`);
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (user?.id) {
            fetchFavorites();
          }
    }, [user.id]);

    const toggleFavorite = async (guideId) => {
        const isCurrentlyFavorite = favorites.some((favorite) => favorite.guide.id === guideId);
        try {
          if (isCurrentlyFavorite) {
            await fetch(`http://localhost:3001/favorites/${user.id}/${guideId}`, {
              method: 'DELETE',
            });
            setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.guide.id !== guideId));
          } else {
            const response = await fetch("http://localhost:3001/favorites", {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: user.id, guideId }),
            });
            const newFavorite = await response.json();
            setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
          }
        } catch (error) {
          console.error("Error toggling favorite:", error);
        }
      };

    return (
        <Container.App className="Favorites">
            <Text.Title>Favoris</Text.Title>
            {favorites.length > 0 ? (
                <DOM.StyledContainer style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", margin: "0px 10px" }}>
                    {favorites.map((favorite, index) => (
                        <GuideCard key={index}
                        guide={favorite.guide}
                        isFavorite={true}
                        toggleFavorite={toggleFavorite} />
                    ))}
                </DOM.StyledContainer>
            ) : (
                <Text.Paragraph>Vous n'avez pas encore de favoris.</Text.Paragraph>
            )}
        </Container.App>

    );
};

export default Favorites;