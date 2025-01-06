import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiClient from '../../../api/apiClient';

export const createGuide = createAsyncThunk('guide/createGuide', async (payload, { rejectWithValue }) => {
    try {
        // const config = {
        //     method: "POST",
        //     url: `${process.env.REACT_APP_API_URL}/guides`,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        //     data: payload,
        // }
        // //const response = await axios(config);
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