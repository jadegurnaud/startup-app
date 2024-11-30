import { createSlice } from '@reduxjs/toolkit';
import { Guide } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
  guide:{},
  status: {
    guide: "idle",
  },
  error: null,
};
export const guideSlice = createSlice({
  name: 'guide',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
        .addCase(Guide.getGuide.pending, (state, action) => {
            state.status.guide = "pending";
        })
        .addCase(Guide.getGuide.fulfilled, (state, action) => {
            state.status.guide = "succeed";
            state.error = null;
            if (action?.payload) {  
                state.guide = action.payload;
            }
        })
        .addCase(Guide.getGuide.rejected, (state, action) => {
            state.status.guide = "failed";
            if(action?.payload?.message){
                state.error = action.payload.message;
            }
        })
        .addCase(Guide.createGuide.pending, (state, action) => {
            state.status.guide = "pending";
        })
        .addCase(Guide.createGuide.fulfilled, (state, action) => {
            state.status.guide = "succeed";
            state.error = null;
        })
        .addCase(Guide.createGuide.rejected, (state, action) => {
            state.status.guide = "failed";
            if(action?.payload?.message){
                state.error = action.payload.message;
            }
        })
        .addCase(Guide.deleteGuide.pending, (state, action) => {
            state.status.guide = "pending";
        })
        .addCase(Guide.deleteGuide.fulfilled, (state, action) => {
            state.status.guide = "succeed";
            state.error = null;
        })
        .addCase(Guide.deleteGuide.rejected, (state, action) => {
            state.status.guide = "failed";
            if(action?.payload?.message){
                state.error = action.payload.message;
            }
        })
      .addCase(RESET_APP_STATE, (state, action) => initialState);
  },
});
