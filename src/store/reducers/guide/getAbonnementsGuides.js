import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const getAbonnementsGuides = createAsyncThunk('guide/getAbonnementsGuides', async (payload, { rejectWithValue }) => {
   
    try {
        const response = await apiClient.get("/guides/abonnements");
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});