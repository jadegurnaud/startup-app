import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';

export const createGuide = createAsyncThunk('guide/createGuide', async (payload, { rejectWithValue }) => {
    try {
        const response = apiClient.post("/guides", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});