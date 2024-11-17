import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
    let data = JSON.stringify({
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
    });
    let config = {
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/auth/register`,
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch(error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    };
});