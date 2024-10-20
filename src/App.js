import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Accueil, Login, Profile, AccessDenied, Register } from './components/pages';
import './App.css';
import { Aside } from './components/organisms';
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

const AppContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <Aside />
      <Routes>
        <Route path="/" element={<Navigate to="/accueil" />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/admin" element={<AccessDenied />} />
        <Route path="/seconnecter" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/sedeconnecter" element={<Accueil />} />
        <Route path="/profil" element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router basename="/">
          <AppContent />
      </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
