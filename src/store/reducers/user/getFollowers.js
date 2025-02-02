import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';

export const getFollowers = createAsyncThunk('user/getFollowers', async (userId, { rejectWithValue }) => {
    try {
        const response = await apiClient.get(`/users/followers/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});