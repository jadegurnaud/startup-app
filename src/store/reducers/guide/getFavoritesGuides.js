import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../../../api/apiClient";

export const getFavoritesGuides = createAsyncThunk('guide/getFavoritesGuides', async (userId, {rejectWithValue}) => {
    if (!userId) {
        return rejectWithValue("L'id de l'utilisateur est manquant");
    }
    try {
        
        // const config = {
        //     method: "GET",
        //     url: `${process.env.REACT_APP_API_URL}/favorites/user/${userId}`,
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // }

        // const response = await axios(config);
        const response = await apiClient.get(`/favorites/user/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});