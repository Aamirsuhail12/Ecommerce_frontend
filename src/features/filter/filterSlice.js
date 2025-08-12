

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 'Electronics',
    subcategory: '',
    brand: '',
    price: [10, 200000],
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSubcategory: (state, action) => {
            state.subcategory = action.payload;
        },
        setBrand: (state, action) => {
            state.brand = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload
        },
        resetFilter: (state) => {
            Object.assign(state, initialState)
        },
        emptyFilter : (state)=>{
            state.category = '';
            state.subcategory = '';
            state.brand = '';
            state.price = [10,50000];
        }
    }
})

export const { setBrand, setCategory, setPrice, setSubcategory, resetFilter ,emptyFilter} = filterSlice.actions;
export default filterSlice.reducer;