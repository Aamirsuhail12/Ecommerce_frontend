
import { createSlice } from "@reduxjs/toolkit";
import { addReview, getReview } from "./reviewAPI";

const initialState = {
    item: [],
    status: 'idle',
    error: ''
}
const reviewSlice = createSlice({

    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(addReview.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(addReview.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.item.push(action.payload);
            })
            .addCase(getReview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(getReview.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.item = action.payload;
            })
    }
})

export default reviewSlice.reducer;