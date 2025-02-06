import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';

export const followUser = createAsyncThunk('user/followUser', async ({ userId, followerId }, { rejectWithValue }) => {
    try {
        const response = await apiClient.post("/users/followUser", { userId, followerId });
        return response.data;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});