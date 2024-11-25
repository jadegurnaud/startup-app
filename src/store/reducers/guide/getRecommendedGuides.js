import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecommendedGuides = createAsyncThunk('guide/getRecommendedGuides', async (payload, { rejectWithValue }) => {
   
    try {
        
        const config = {
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/guides`,
            headers: {
                "Content-Type": "application/json",
            },
        }

        const response = await axios(config);
        return response.data;
    }
    catch (error) {
        console.error(error.response.data, "error");
        return rejectWithValue(error.response.data);
    }
});