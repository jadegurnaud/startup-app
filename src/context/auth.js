import { store } from "../store";

export const getAuthenticatedUser = async () => {
    try {
        const token = store.getState().auth.token;

        if (!token || token === undefined) {
            console.error("Token is missing");
            return null;
        }

        const response = await fetch("http://localhost:3001/auth", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (response.status === 200) {
            return data;
        } else {
            return null;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const isTokenExpired = () => {
    const token = store.getState().auth.token;

    if (!token) {
        return true;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;
}