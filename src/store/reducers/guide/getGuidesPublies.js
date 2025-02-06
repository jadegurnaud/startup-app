import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const getGuidesPublies = createAsyncThunk('guide/getGuidesPublies', async (userId, { rejectWithValue }) => {
    if (!userId) {
        return rejectWithValue("L'id de l'utilisateur est manquant");
    }
    try {
        const response = await apiClient.get(`/guides/publies/user/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});