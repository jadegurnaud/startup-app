import { createSlice } from '@reduxjs/toolkit';
import { Guide } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
    guidesPublies: [],
    status: {
        guidesPublies: "idle",
    },
    error: null,
};
export const otherUserGuidesSlice = createSlice({
    name: 'otherUserGuides',
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
            
            .addCase(RESET_APP_STATE, (state, action) => initialState);
    },
});