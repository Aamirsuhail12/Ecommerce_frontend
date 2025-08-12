
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async(_,{rejectWithValue})=>{

    try {
        
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/categories?page=-1`);
        return response?.data;
    } catch (error) {
        return rejectWithValue(error?.message || error?.response?.data?.msg);
    }
})