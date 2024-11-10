import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleFavorite = createAsyncThunk('guide/toggleFavorites', async ({ userId, guideId, isFavorite }) => {
    try {
        const config = {
            method: isFavorite ? "DELETE" : "POST",
            url: isFavorite
            ? `http://localhost:3001/favorites/user/${userId}/guide/${guideId}`
            : `http://localhost:3001/favorites`,
            headers: {
                "Content-Type": "application/json",
            },
            ...((!isFavorite) && {
                data: JSON.stringify({ userId, guideId }),
            }),
        };
        const response = await axios(config);

            return {
                guideId,
                isFavorite: !isFavorite,
                data: response.data,
            };
        } catch (error) {
            return error;
        };
    }
);