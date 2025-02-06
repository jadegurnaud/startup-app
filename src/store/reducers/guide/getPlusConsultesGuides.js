import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";

export const getPlusConsultesGuides = createAsyncThunk('guide/getPlusConsultesGuides', async (payload, { rejectWithValue }) => {
   
    try {
        const response = await apiClient.get("/guides/plusConsultes");
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});