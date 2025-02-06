import { createSlice } from '@reduxjs/toolkit';
import { User } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
  isFollowing: false,
  status: {
    follow: "idle",
    unfollow: "idle",
  },
  error: null,
};

export const userFollowingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(User.followUser.pending, (state) => {
        state.status.follow = "pending";
      })
      .addCase(User.followUser.fulfilled, (state) => {
        state.status.follow = "succeeded";
        state.isFollowing = true;
        state.error = null;
      })
      .addCase(User.followUser.rejected, (state, action) => {
        state.status.follow = "failed";
        state.error = action.payload;
      })
      .addCase(User.unfollowUser.pending, (state) => {
        state.status.unfollow = "pending";
      })
      .addCase(User.unfollowUser.fulfilled, (state) => {
        state.status.unfollow = "succeeded";
        state.isFollowing = false;
        state.error = null;
      })
      .addCase(User.unfollowUser.rejected, (state, action) => {
        state.status.unfollow = "failed";
        state.error = action.payload;
      })
        .addCase(User.checkIfFollowing.pending, (state) => {
            state.status.follow = "pending";
        })
        .addCase(User.checkIfFollowing.fulfilled, (state, action) => {
            state.status.follow = "succeeded";
            state.isFollowing = action.payload;
            state.error = null;
        })
        .addCase(User.checkIfFollowing.rejected, (state, action) => {
            state.status.follow = "failed";
            state.error = action.payload;
        })


      .addCase(RESET_APP_STATE, (state, action) => initialState);
      
  },
});
