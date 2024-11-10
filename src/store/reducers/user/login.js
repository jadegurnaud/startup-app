import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('user/login', async (payload) => {
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
    
    const response = await axios(config).then((res) => {
        localStorage.setItem('token', res.data.access_token);
        return res;
    }).catch((error) => {
        return error;
    });
    return response.data;
});
    

    