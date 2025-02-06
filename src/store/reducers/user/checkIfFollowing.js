import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';

export const checkIfFollowing = createAsyncThunk('user/checkIfFollowing', async ({ userId, followerId }, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/users/checkIfFollowing/${userId}/${followerId}`);
        return response.data;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});