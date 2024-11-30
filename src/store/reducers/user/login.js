import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
    let data = JSON.stringify({
        email: payload.email,
        password: payload.password,
    });
    let config = {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };
    
    try {
        const response = await axios(config);
        localStorage.setItem('token', response.data.access_token);
        return response.data;
    } catch (error) {
        console.error(error.response.data, 'error');
        return rejectWithValue(error.response.data);
    };
});
    

    