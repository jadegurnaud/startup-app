import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import apiClient from "../../../api/apiClient";

export const login = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
    try {
        const response = await apiClient.post("/auth/login", {
            email: payload.email,
            password: payload.password
        });
        localStorage.setItem('accessToken', response.data.access_token);
        apiClient.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
        return response.data;
    } catch (error) {
        console.error( 'error', error.response.data);
        return rejectWithValue(error.response.data);
    };
});
    

    