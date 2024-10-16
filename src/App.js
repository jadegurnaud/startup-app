import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Accueil, Login, Users, Profile, AccessDenied } from './components/pages';
import './App.css';
import { Aside } from './components/organisms';
import { AuthProvider, AuthContext } from './context/AuthContext';

const AppContent = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn, isAdmin } = useContext(AuthContext);

  return (
    <>
      <Aside />
      <Routes>
        <Route path="/" element={<Navigate to="/accueil" />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/admin" element={isLoggedIn && isAdmin ? <Users /> : <AccessDenied />} />
        <Route path="/seconnecter" element={<Login login={(email, password) => login(email, password, navigate)} />} />
        <Route path="/profil" element={<Profile/>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router basename="/">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
