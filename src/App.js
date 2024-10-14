import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Accueil, Login } from './components/pages';
import './App.css';
import { Aside } from './components/organisms';

function App() {
  return (
    <Router basename="/app">
      <Aside />
      <Routes>
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/seconnecter" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
