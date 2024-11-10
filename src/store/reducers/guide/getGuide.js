import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGuide = createAsyncThunk('guide/getGuide', async (guideId, {dispatch}) => {
    try {
        const config = {
            method: "GET",
            url: `http://localhost:3001/guides/${guideId}`,
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await axios(config).then((res) => {
            return res;
        }).catch((error) => {
            return error;
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
});