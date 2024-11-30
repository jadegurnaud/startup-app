import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteGuide = createAsyncThunk('guide/deleteGuide', async (guideId, { rejectWithValue }) => {
    try {
        const config = {
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}/guides/${guideId}`,
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});