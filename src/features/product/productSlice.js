
import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProduct, SearchProduct } from './productAPI';

const initialState = {
    items: [],         // list of all products
    singleItem: null,  // specific product (for detail page)
    status: 'idle',// 'Loading', 'succeeded', 'failed'
    error: null,
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.payload || action.error?.message;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action?.payload?.products;
            })
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.payload || action.error?.message;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.singleItem = action.payload;
            })
            .addCase(SearchProduct.pending,(state)=>{
                state.status = 'loading';
            })
            .addCase(SearchProduct.rejected,(state,action)=>{
                state.status = 'failed';
                state.error = action?.payload || action?.error?.message;
            })
            .addCase(SearchProduct.fulfilled,(state,action)=>{
                state.status = 'succeeded';
                console.log('pp',action.payload)
                state.items = action?.payload;
            })
    }
})

export default productSlice.reducer;