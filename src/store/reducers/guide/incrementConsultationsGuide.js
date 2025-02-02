import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../../api/apiClient';

export const incrementConsultations = createAsyncThunk('guide/incrementConsultations', async (id, { rejectWithValue }) => {
    try {
        const response = await apiClient.patch(`/guides/incrementConsultations/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});