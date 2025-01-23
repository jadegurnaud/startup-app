import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetAppState } from '../../../actions/resetState';

export const logout = createAsyncThunk('user/logout', async (_, {dispatch, rejectWithValue}) => {
    try {
        localStorage.removeItem('accessToken');
        dispatch(resetAppState());
        return true;
    } catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});