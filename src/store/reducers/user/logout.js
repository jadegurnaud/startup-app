import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetAppState } from '../../../actions/resetState';

export const logout = createAsyncThunk('user/logout', async (_, {dispatch}) => {
    try {
        localStorage.removeItem('token');
        dispatch(resetAppState());
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
});