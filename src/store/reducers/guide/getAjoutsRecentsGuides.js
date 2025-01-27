import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const getAjoutsRecentsGuides = createAsyncThunk('guide/getAjoutsRecentsGuides', async (payload, { rejectWithValue }) => {
   
    try {
        const response = await apiClient.get("/guides/ajoutsRecents");
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});