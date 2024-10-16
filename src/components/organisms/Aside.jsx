import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../molecules";
import { Container } from "../atoms";
import { AuthContext } from "../../context/AuthContext";

const Aside = () => {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  }
  
  const menuConfigs = [
    { displayName: "Accueil", slug: "accueil" }
  ];

  if (!isLoggedIn) {
    menuConfigs.push({ displayName: "Se connecter", slug: "seconnecter" });
  }
  if (isLoggedIn) {
    if(isAdmin) {
      menuConfigs.push({ displayName: "Utilisateurs", slug: "admin" });
    }
    menuConfigs.push({ displayName: "Profil", slug: "profil" });
    menuConfigs.push({ displayName: "Se déconnecter", slug: "accueil", onClick: handleLogout });
  }
  return (
    <Container.Aside className="Aside">
      <Menu
        configs={menuConfigs}
      />
    </Container.Aside>
  );
};

export default Aside;