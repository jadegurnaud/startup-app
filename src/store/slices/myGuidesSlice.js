import { createSlice } from '@reduxjs/toolkit';
import { Guide } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
    guidesPublies: [],
    guidesBrouillons: [],
    status: {
        guidesPublies: "idle",
        guidesBrouillons: "idle",
    },
    error: null,
};
export const myGuidesSlice = createSlice({
    name: 'myGuides',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(Guide.getGuidesPublies.pending, (state, action) => {
                state.status.guidesPublies = "pending";
            })
            .addCase(Guide.getGuidesPublies.fulfilled, (state, action) => {
                state.status.guidesPublies = "succeed";
                state.error = null;
                if (action?.payload) {  
                    state.guidesPublies = action.payload;
                }
            })
            .addCase(Guide.getGuidesPublies.rejected, (state, action) => {
                state.status.guidesPublies = "failed";
                if(action?.payload?.message){
                    state.error = action.payload.message;
                }
            })
            .addCase(Guide.getMyGuidesBrouillons.pending, (state, action) => {
                state.status.guidesBrouillons = "pending";
            })
            .addCase(Guide.getMyGuidesBrouillons.fulfilled, (state, action) => {
                state.status.guidesBrouillons = "succeed";
                state.error = null;
                if (action?.payload) {  
                    state.guidesBrouillons = action.payload;
                }
            })
            .addCase(Guide.getMyGuidesBrouillons.rejected, (state, action) => {
                state.status.guidesBrouillons = "failed";
                if(action?.payload?.message){
                    state.error = action.payload.message;
                }
            })
            
            .addCase(RESET_APP_STATE, (state, action) => initialState);
    },
});