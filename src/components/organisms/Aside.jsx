import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../molecules";
import { Button, Container } from "../atoms";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { User } from "../../store/reducers";

const Aside = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  
  const handleLogout = async () => {
    try {  
      const result = await dispatch(User.logout()).unwrap();
      if (result) {
        navigate("/accueil");
      }
    } catch (error) {
      console.error("Failed to logout", error);
    }
  }

  const menuConfigs = [
    { displayName: "Accueil", slug: "accueil" }
  ];

  
  if (token) {
    menuConfigs.push({ displayName: "Favoris", slug: "favorites" });
    menuConfigs.push({ displayName: "Profil", slug: "profil" });
    menuConfigs.push({ displayName: "Deconnexion", slug: "logout", onClick: handleLogout});
  } else {
    menuConfigs.push({ displayName: "Se connecter", slug: "login" });
  }
  
  return (
    <Container.Aside className="Aside">
      <Menu
        configs={menuConfigs}
      />
      <Button.NightSwitch />
    </Container.Aside>
  );
};

export default Aside;