import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { login} = useSelector((state) => state.user);

  if (!login) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
