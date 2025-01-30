import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Accueil, Login, Profile, Register, Guide, Favorites, NewGuideHome, NewGuide, ProfileOtherUser, MyGuides, OffresSpeciales, PlanMyTravel } from './components/pages';
import './App.css';
import { NavBar } from './components/organisms';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthenticatedUser } from './store/reducers/user/getAuthenticatedUser';
import { ThemeProvider } from 'styled-components';
import { NightThemeProvider } from './providers/contexts';
import useTheme from './hooks/useTheme';
import { lightTheme, darkTheme } from './styles/themes';
import { DOM } from './components/nanites';

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
      <NavBar/>
      <Routes>
        <Route path="/" element={<Navigate to="/accueil" />} />
        <Route path="/accueil" element={<Accueil/>} />
        <Route path='/guides/:id' element={<Guide/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path="/logout" element={<Accueil/>} />
        <Route path="/offresSpeciales" element={<OffresSpeciales/>} />
        <Route path="/users/:userId" element={<ProfileOtherUser />} />
        <Route path="/profil" element={<ProtectedRoute>
          <Profile/>
        </ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute>
          <Favorites/>
        </ProtectedRoute>} />
        <Route path="/newGuideHome" element={<ProtectedRoute>
          <NewGuideHome/>
        </ProtectedRoute>} />
        <Route path="/newGuide" element={<ProtectedRoute>
          <NewGuide/>
        </ProtectedRoute>} />
        <Route path="/myGuides" element={<ProtectedRoute>
          <MyGuides/>
        </ProtectedRoute>} />
        <Route path="/planMyTravel" element={<ProtectedRoute>
          <PlanMyTravel/>
        </ProtectedRoute>} />
      </Routes>
    </>
  );
};

function App() {
  const [isNight, setIsNight] = useState(false);
  const [theme, setTheme] = useTheme({
    container: isNight ? darkTheme.container : lightTheme.container,
    colors: isNight ? darkTheme.colors : lightTheme.colors,
  });

  const changeNightTheme = () => {
    setIsNight(prev => {
      const newIsNight = !prev;
      setTheme({
        colors: newIsNight ? darkTheme.colors : lightTheme.colors,
        containers: newIsNight ? darkTheme.container : lightTheme.container
      });
      return newIsNight;
    });
  };

  useEffect(() => {
   
  }, [isNight]);

  return (
    <ThemeProvider theme={theme} >
      <NightThemeProvider nightTheme={{ toggleNightMode: changeNightTheme, isNight: isNight }}>
        <DOM.StyledContainer>
          <Router basename="/">
            <AppContent/>
          </Router>
        </DOM.StyledContainer>
      </NightThemeProvider>
    </ThemeProvider>
  );
}

export default App;
