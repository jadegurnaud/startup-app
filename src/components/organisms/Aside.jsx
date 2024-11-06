import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../molecules";
import { Container } from "../atoms";
import { useSelector } from "react-redux";
import { persistor, removeToken } from "../../store";
import { useDispatch } from "react-redux";

const Aside = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  
  const handleLogin = () => {
    dispatch(removeToken());
    persistor.purge();
    navigate("/accueil");
  }

  const menuConfigs = [
    { displayName: "Accueil", slug: "accueil" }
  ];

  
  if (token) {
    menuConfigs.push({ displayName: "Favoris", slug: "favorites" });
    menuConfigs.push({ displayName: "Profil", slug: "profil" });
    menuConfigs.push({ displayName: "Deconnexion", slug: "sedeconnecter", onClick: handleLogin});
  } else {
    menuConfigs.push({ displayName: "Se connecter", slug: "seconnecter" });
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