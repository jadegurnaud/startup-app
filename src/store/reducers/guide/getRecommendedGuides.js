import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecommendedGuides = createAsyncThunk('guide/getRecommendedGuides', async () => {
   
    try {
        
        const config = {
            method: "GET",
            url: `http://localhost:3001/guides`,
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