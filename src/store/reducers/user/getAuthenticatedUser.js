import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAuthenticatedUser = createAsyncThunk('user/getAuthenticatedUser', async (payload, { rejectWithValue }) => {
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
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});