import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createGuide = createAsyncThunk('guide/createGuide', async (payload, { rejectWithValue }) => {
    try {
        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/guides`,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: payload,
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});