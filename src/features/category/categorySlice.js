
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoryAPI";
const initialState = {
    items: [],
    status: 'idle',
    error: null
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.payload;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action?.payload?.categories;
            })
    }
})


export default categorySlice.reducer;