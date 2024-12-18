import { createSlice } from '@reduxjs/toolkit';
import { Guide } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
  guide:{},
  isGuideDirect: true,
  status: {
    guide: "idle",
  },
  error: null,
};
export const newGuideSlice = createSlice({
  name: 'guide',
  initialState,
  reducers: {
    setIsGuideDirect(state, action) {
      state.isGuideDirect = action.payload;
    },
  },
});

export const { setIsGuideDirect } = newGuideSlice.actions;