import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const getGuidesByCategory = createAsyncThunk('guide/category', async (categoryId, { rejectWithValue }) => {
   
    try {
        const response = await apiClient.get(`/guides/category/${categoryId}`);
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});