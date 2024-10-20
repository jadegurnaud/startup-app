import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const token = useSelector(state => state.auth.token); // Récupère le token du store Redux

  if (!token) {
    return <Navigate to="/seconnecter" />; // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  }

  return children; // Rendre les enfants si l'utilisateur est authentifié
};

export default ProtectedRoute;
