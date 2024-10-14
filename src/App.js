import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Accueil, Login } from './components/pages';
import './App.css';
import { Aside } from './components/organisms';

function App() {
  return (
    <Router basename="/">
      <Aside />
      <Routes>
        <Route path="/" element={<Navigate to="/accueil" />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/seconnecter" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
