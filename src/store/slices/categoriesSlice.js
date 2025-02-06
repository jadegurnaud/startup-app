import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../reducers';
import { RESET_APP_STATE } from '../../actions/resetState';

const initialState = {
    categories: [],
    status: {
        categories: "idle",
    },
    error: null,
};
export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(Category.getCategories.pending, (state, action) => {
                state.status.categories = "pending";
            })
            .addCase(Category.getCategories.fulfilled, (state, action) => {
                state.status.categories = "succeed";
                state.error = null;
                if (action?.payload) {  
                    state.categories = action.payload;
                }
            })
            .addCase(Category.getCategories.rejected, (state, action) => {
                state.status.categories = "failed";
                if(action?.payload?.message){
                    state.error = action.payload.message;
                }
            })
            
            .addCase(RESET_APP_STATE, (state, action) => initialState);
    },
});