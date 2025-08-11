
import { createSlice } from "@reduxjs/toolkit";
import { addOrder, getOrder, updateOrder } from "./orderAPI";

const initialState = {
    item: [],
    status: 'idle',
    error: ''
}

const orderSlice = createSlice({

    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addOrder.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(addOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.payload || action?.message
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log('ord', action?.payload);
                state.item = [...state.item, action?.payload];
            })
            .addCase(updateOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action?.payload || action?.message
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const idx = state.item.findIndex((o) => o._id.toString() === action.payload.id);
                state.item[idx].orderStatus = action.payload.orderStatus;
            })
            .addCase(getOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.message;
            })
            .addCase(getOrder.fulfilled, (state, acion) => {
                state.status = 'succeeded';
                state.item = acion.payload;
            })
    }
})

export default orderSlice.reducer;