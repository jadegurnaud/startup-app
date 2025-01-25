import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../atoms";
import { NavBarLogoContainer, NavLinkContainer, NavBarButtonContainer } from "../molecules";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { User } from "../../store/reducers";
import { ReactComponent as Gift } from "../../assets/Gift.svg";
import { ReactComponent as CalendarDots } from "../../assets/CalendarDots.svg";
import { ReactComponent as Heart } from "../../assets/Heart.svg";
import { ReactComponent as Books } from "../../assets/Books.svg";

const Aside = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { login, user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const result = await dispatch(User.logout()).unwrap();
      if (result) {
        navigate("/accueil");
      }
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const menuConfigs = [
    {
      displayName: "Offres spéciales",
      slug: "specialOffers",
      iconSource: <Gift />,
    },
    {
      displayName: "Planifier mon voyage",
      slug: "planMyTrip",
      iconSource: <CalendarDots />,
    },
    { displayName: "Mes guides", slug: "myGuides", iconSource: <Books /> },
    { displayName: "Favoris", slug: "favorites", iconSource: <Heart /> },
  ];

  if (login) {
    menuConfigs.push({ displayName: "Mon profil", slug: "profil", imageSource: "https://via.placeholder.com/150" });
    menuConfigs.push({ displayName: "Créer un guide", slug: "newGuideHome", onClick: () => navigate("/newGuideHome") });
  } else {

    menuConfigs.push({ displayName: "Créer un guide", slug: "newGuideHome", onClick: () => navigate("/newGuideHome") });
    menuConfigs.push({ displayName: "Se connecter / Créer un compte", slug: "login", onClick: () => navigate("/login") });
  }

  return (
    <Container.Aside >
      <NavBarLogoContainer />
      <NavLinkContainer />
      <NavBarButtonContainer isLogin={login} user={user} />
    </Container.Aside >
  );
};

export default Aside;
