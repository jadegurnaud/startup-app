import React, { createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:3001/api/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setIsLoggedIn(true);
                setUser(data);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }
    , []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.accessToken);
                setIsLoggedIn(true);
                setUser(data.user);
                navigate("/accueil");
            } else {
                alert("Erreur lors de la connexion");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/accueil");
    };

    const isAdmin = user?.role === "admin";
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, user, isAdmin, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };