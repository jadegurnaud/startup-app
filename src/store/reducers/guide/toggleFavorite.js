import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleFavorite = createAsyncThunk('guide/toggleFavorites', async ({ userId, guideId, isFavorite }, { rejectWithValue }) => {
    try {
        const config = {
            method: isFavorite ? "DELETE" : "POST",
            url: isFavorite
            ? `${process.env.REACT_APP_API_URL}/favorites/user/${userId}/guide/${guideId}`
            : `${process.env.REACT_APP_API_URL}/favorites`,
            headers: {
                "Content-Type": "application/json",
            },
            ...((!isFavorite) && {
                data: JSON.stringify({ user: userId, guide: guideId }),
            }),
        };
        const response = await axios(config);

            return {
                guideId,
                isFavorite: !isFavorite,
                data: response.data,
            };
        } catch (error) {
            console.error(error.response.data, "error");
            return rejectWithValue(error.response.data);
        };
    }
);