import { createSlice } from '@reduxjs/toolkit';
import { Travel } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
    travelsInProgress: [],
    travelsPast: [],
    status: {
        travelsInProgress: "idle",
        travelsPast: "idle",
    },
    error: null,
};
export const myTravelsSlice = createSlice({
    name: 'myTravels',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(Travel.getTravelsInProgress.pending, (state, action) => {
                state.status.travelsInProgress = "pending";
            })
            .addCase(Travel.getTravelsInProgress.fulfilled, (state, action) => {
                state.status.travelsInProgress = "succeed";
                state.error = null;
                if (action?.payload) {  
                    state.travelsInProgress = action.payload;
                }
            })
            .addCase(Travel.getTravelsInProgress.rejected, (state, action) => {
                state.status.travelsInProgress = "failed";
                if(action?.payload?.message){
                    state.error = action.payload.message;
                }
            })
            .addCase(Travel.getTravelsPast.pending, (state, action) => {
                state.status.travelsPast = "pending";
            })
            .addCase(Travel.getTravelsPast.fulfilled, (state, action) => {
                state.status.travelsPast = "succeed";
                state.error = null;
                if (action?.payload) {  
                    state.travelsPast = action.payload;
                }
            })
            .addCase(Travel.getTravelsPast.rejected, (state, action) => {
                state.status.travelsPast = "failed";
                if(action?.payload?.message){
                    state.error = action.payload.message;
                }
            })
            
            .addCase(RESET_APP_STATE, (state, action) => initialState);
    },
});