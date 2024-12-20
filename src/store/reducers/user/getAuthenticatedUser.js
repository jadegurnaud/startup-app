import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../api/apiClient";
import { logout } from "./logout";

export const getAuthenticatedUser = createAsyncThunk('user/getAuthenticatedUser', async (payload, { dispatch, rejectWithValue }) => {
    try {
        const response = await apiClient.get("/auth");
        return response.data;
    } catch (error) {
        if(error.response.data.error === "Invalid or expired refresh token") {
            dispatch(logout());
        }
        return rejectWithValue(error.response.data);
    }
});