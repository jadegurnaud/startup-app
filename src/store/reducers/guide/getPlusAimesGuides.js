import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const getPlusAimesGuides = createAsyncThunk('guide/getPlusAimesGuides', async (payload, { rejectWithValue }) => {
   
    try {
        const response = await apiClient.get("/guides/plusAimes");
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});