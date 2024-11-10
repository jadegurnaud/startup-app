import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk('user/register', async (payload) => {
    let data = JSON.stringify({
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
    });
    let config = {
        method: "POST",
        url: "http://localhost:3001/auth/register",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    const response = await axios(config).then((res) => {
        return res;
    }).catch((error) => {
        return error;
    });
    return response.data;
});