import { createSlice } from '@reduxjs/toolkit';
import { User } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
  login: false,
  token: null,
  user:{},
  status: {
    user: "idle",
    login: "idle",
    register: "idle",
  },
  error: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(User.register.pending, (state, action) => {
        state.status.register = "pending";
      })
      .addCase(User.register.fulfilled, (state, action) => {
        state.status.register = "succeed";
      })
      .addCase(User.register.rejected, (state, action) => {
        state.status.register = "failed";
        if(action?.payload?.message){
          state.error = action.payload.message;
        }
      })
      .addCase(User.login.pending, (state, action) => {
        state.status.login = "pending";
      })
      .addCase(User.login.fulfilled, (state, action) => {
        state.status.login = "succeed";
        if (action?.payload?.access_token) {
          state.login = true;
          state.token = action.payload.access_token;
        }
      })
      .addCase(User.login.rejected, (state, action) => {
        state.status.login = "failed";
        if(action?.payload?.message){
          state.error = action.payload.message;
        }
      })
      .addCase(User.logout.pending, (state, action) => {
        state.status.login = "pending";
      })
      .addCase(User.logout.fulfilled, (state, action) => {
        state.status.login = "idle";
        state.status.user = "idle";
        state.status.register = "idle";
        state.login = false;
        state.token = null;
        state.user = {};
      })
      .addCase(User.getAuthenticatedUser.pending, (state, action) => {
        state.status.user = "pending";
      })
      .addCase(User.getAuthenticatedUser.fulfilled, (state, action) => {
        state.status.user = "succeed";
        if(action?.payload){
          state.user = action.payload
        }
      })
      .addCase(User.getAuthenticatedUser.rejected, (state, action) => {
        state.status.user = "failed";
      })
      .addCase(RESET_APP_STATE, (state, action) => initialState);
  },
});
