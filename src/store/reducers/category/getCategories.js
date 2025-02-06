import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const getCategories = createAsyncThunk('category/getCategories', async (_, { rejectWithValue }) => {
   
    try {
        const response = await apiClient.get(`/categories`);
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});