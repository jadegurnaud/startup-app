import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const getMyGuidesBrouillons = createAsyncThunk('guide/getMyGuidesBrouillons', async (userId, { rejectWithValue }) => {
    if (!userId) {
        return rejectWithValue("L'id de l'utilisateur est manquant");
    }
    try {
        const response = await apiClient.get(`/guides/brouillons/user/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});