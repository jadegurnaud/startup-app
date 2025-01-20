import { createSlice } from '@reduxjs/toolkit';
import { User } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
  user:{},
  status: {
    user: "idle",
  },
  error: null,
};
export const otherUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(User.getUser.pending, (state, action) => {
        state.status.user = "pending";
      })
      .addCase(User.getUser.fulfilled, (state, action) => {
        state.status.user = "succeed";
        state.error = null;
        if(action?.payload){
          state.user = action.payload;
        }
      })
      .addCase(User.getUser.rejected, (state, action) => {
        state.status.user = "failed";
        if(action?.payload?.message){
          state.error = action.payload.message;
        }
      })
      .addCase(RESET_APP_STATE, (state, action) => initialState);
  },
});
