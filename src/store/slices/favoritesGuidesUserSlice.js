import { createSlice } from '@reduxjs/toolkit';
import { Guide } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
    guides: [],
    favorites: {},
    status: {
        guides: "idle",
        favorites: "idle",
    },
    error: null,
};
export const favoritesGuidesUserSlice = createSlice({
    name: 'favoritesGuidesUser',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(Guide.getFavoritesGuides.pending, (state, action) => {
                state.status.guides = "pending";
            })
            .addCase(Guide.getFavoritesGuides.fulfilled, (state, action) => {
                state.status.guides = "succeed";
                if (action?.payload) {  
                    state.guides = action.payload;
                    state.favorites = action.payload.reduce((acc, favorite) => {
                        acc[favorite.id] = true;
                        return acc;
                    }, {});
                }
            })
            .addCase(Guide.getFavoritesGuides.rejected, (state, action) => {
                state.status.guides = "failed";
                state.error = action.payload;
            })
            .addCase(Guide.toggleFavorite.pending, (state, action) => {
                state.status.favorites = "pending";
            })
            .addCase(Guide.toggleFavorite.fulfilled, (state, action) => {
                state.status.favorites = "succeed";
                if (action?.payload) {
                    const { guideId, isFavorite } = action.payload;
                    state.favorites[guideId] = isFavorite;
                }
            })
            .addCase(Guide.toggleFavorite.rejected, (state, action) => {
                state.status.favorites = "failed";
                state.error = action.payload;
            })
            .addCase(RESET_APP_STATE, (state, action) => initialState);
    },
});