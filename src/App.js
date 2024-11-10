import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Accueil, Login, Profile, Register, Guide, Favorites } from './components/pages';
import './App.css';
import { Aside } from './components/organisms';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthenticatedUser } from './store/reducers/user/getAuthenticatedUser';


const AppContent = () => {
  const { login } = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if(login){
      dispatch(getAuthenticatedUser())
    }
  }, [login, dispatch]);



  return (
    <>
      <Aside />
      <Routes>
        <Route path="/" element={<Navigate to="/accueil" />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path='/guides/:id' element={<Guide />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/logout" element={<Accueil />} />
        <Route path="/profil" element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute>
          <Favorites />
        </ProtectedRoute>} />
      </Routes>
    </>
  );
};

function App() {
  return (
   
      <Router basename="/">
          <AppContent />
      </Router>
  );
}

export default App;
