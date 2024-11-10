import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserGuides = createAsyncThunk('user/getUserGuides', async (userId, { rejectWithValue }) => {
    if (!userId) {
        return rejectWithValue('User ID is required');
      }
    try {
        
        const config = {
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/guides/user/${userId}`,
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
    }
    catch (error) {
        console.error(error);
        return null;
    }
});