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
export const recommendedGuidesSlice = createSlice({
    name: 'recommendedGuides',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(Guide.getRecommendedGuides.pending, (state, action) => {
                state.status.guides = "pending";
            })
            .addCase(Guide.getRecommendedGuides.fulfilled, (state, action) => {
                state.status.guides = "succeed";
                state.error = null;
                if (action?.payload) {  
                    state.guides = action.payload;
                }
            })
            .addCase(Guide.getRecommendedGuides.rejected, (state, action) => {
                state.status.guides = "failed";
                if(action?.payload?.message){
                    state.error = action.payload.message;
                }
            })
            .addCase(Guide.getFavoritesGuides.pending, (state, action) => {
                state.status.favorites = "pending";
            })
            .addCase(Guide.getFavoritesGuides.fulfilled, (state, action) => {
                state.status.favorites = "succeed";
                state.error = null;
                if (action?.payload) {  
                    const favoritesMap = action.payload.reduce((acc, favorite) => {
                        acc[favorite.id] = true;
                        return acc;
                    }, {});
                    state.favorites = favoritesMap;
                }
            })
            .addCase(Guide.getFavoritesGuides.rejected, (state, action) => {
                state.status.favorites = "failed";
                if(action?.payload?.message){
                    state.error = action.payload.message;
                }
            })
            .addCase(Guide.toggleFavorite.pending, (state, action) => {
                state.status.favorites = "pending";
            })
            .addCase(Guide.toggleFavorite.fulfilled, (state, action) => {
                state.status.favorites = "succeed";
                state.error = null;
                if (action?.payload) {
                    const { guideId, isFavorite } = action.payload;
                    state.favorites[guideId] = isFavorite;
                }
            })
            .addCase(Guide.toggleFavorite.rejected, (state, action) => {
                state.status.favorites = "failed";
                if(action?.payload?.message){
                    state.error = action.payload.message;
                }
            })
            .addCase(RESET_APP_STATE, (state, action) => initialState);
    },
});