import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Accueil, Login } from './components/pages';
import './App.css';
import { Aside } from './components/organisms';
import { AuthProvider, AuthContext } from './context/AuthContext';

const AppContent = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  return (
    <>
      <Aside />
      <Routes>
        <Route path="/" element={<Navigate to="/accueil" />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/seconnecter" element={<Login login={(email, password) => login(email, password, navigate)} />} />
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
