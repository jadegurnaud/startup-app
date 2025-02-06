import { createSlice } from '@reduxjs/toolkit';
import { User } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
  followers: null,
  status: {
    followers: "idle",
  },
  error: null,
};
export const userFollowersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(User.getFollowers.pending, (state, action) => {
        state.status.followers = "pending";
      })
      .addCase(User.getFollowers.fulfilled, (state, action) => {
        state.status.followers = "succeed";
        if (action?.payload) {  
          state.followers = action.payload;
        }
        state.error = null;
      })
      .addCase(User.getFollowers.rejected, (state, action) => {
        state.status.followers = "failed";
        if(action?.payload?.message){
          state.error = action.payload.message;
        }
      })
      
      .addCase(RESET_APP_STATE, (state, action) => initialState);
  },
});
