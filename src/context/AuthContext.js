import React, { createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

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
                localStorage.setItem("token", data.token);
                setIsLoggedIn(true);
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
        navigate("/accueil");
    };
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };