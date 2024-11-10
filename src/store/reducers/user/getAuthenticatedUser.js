import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuthenticatedUser = createAsyncThunk('user/getAuthenticatedUser', async (payload) => {
    try {
        const token = localStorage.getItem("token");
        if (!token || token === undefined) {
            console.error("Token is missing");
            return null;
        }

        
        let config = {
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/auth`,

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
        const response = await axios(config).then((res) => {
            return res;
        }).catch((error) => {
            return error;
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});