import { RESET_APP_STATE } from "../../actions/resetState";
import { Guide } from "../reducers";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    guides: [],
    status: {
        guides: "idle",
    },
    error: null,
};
export const userGuidesSlice = createSlice({
    name: 'userGuides',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(Guide.getUserGuides.pending, (state, action) => {
                state.status.guides = "pending";
            })
            .addCase(Guide.getUserGuides.fulfilled, (state, action) => {
                state.status.guides = "succeed";
                if (action?.payload) {  
                    state.guides = action.payload;
                }
            })
            .addCase(Guide.getUserGuides.rejected, (state, action) => {
                state.status.guides = "failed";
                state.error = action.payload;
            })
            .addCase(RESET_APP_STATE, (state, action) => initialState);
    },
});