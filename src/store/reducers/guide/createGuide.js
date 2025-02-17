import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';

export const createGuide = createAsyncThunk('guide/createGuide', async (payload, { rejectWithValue }) => {
    console.log(payload);
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


export const createGuideDirect = createAsyncThunk('guide/createGuideDirect', async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
        const response = apiClient.post("/guides/direct", payload, {
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

export const createGuideItinerary = createAsyncThunk('guide/createGuideItinerary', async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
        const response = apiClient.post("/guides/itinerary", payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});


export const newGuide = createAsyncThunk('guide/newGuide', async (payload, { rejectWithValue }) => {
    try {
        return payload;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});