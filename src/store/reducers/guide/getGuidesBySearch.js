import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const getGuidesBySearch = createAsyncThunk('guide/search', async (payload, { rejectWithValue }) => {
   
    try {
        const response = await apiClient.post("guides/search", payload);
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});