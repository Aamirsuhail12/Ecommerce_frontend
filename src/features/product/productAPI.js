
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (filter = {}, { rejectWithValue }) => {

    try {
        const response = await axios.get(`http://localhost:5000/products?page=-1&filter=${encodeURIComponent(JSON.stringify(filter))}`);
        return response?.data;
    } catch (error) {
        console.log('error in fetchpro', error);
        return rejectWithValue(error?.response?.data.msg || error?.message);
    }

})

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);

        return response?.data?.product;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error?.message)
    }
})
