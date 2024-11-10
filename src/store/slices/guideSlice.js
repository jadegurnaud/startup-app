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
            console.log(action.payload);
            if (action?.payload) {  
                state.guide = action.payload;
            }
        })
        .addCase(Guide.getGuide.rejected, (state, action) => {
            state.status.guide = "failed";
            state.error = action.payload;
        })
      .addCase(RESET_APP_STATE, (state, action) => initialState);
  },
});
