
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const addOrder = createAsyncThunk("orders/addOrder", async (payload, { rejectWithValue }) => {

    try {
        const response = await axios.post("http://localhost:5000/orders", payload, {
            withCredentials: true,
            'content-type': 'application/json'
        })
        return response?.data?.order
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error.message)
    }
})


export const getOrder = createAsyncThunk("orders/getOrder", async (_, { rejectWithValue }) => {

    try {
        const response = await axios.get(`http://localhost:5000/orders?all=false`, {
            withCredentials: true
        })
        
        return response?.data?.orders
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error.message)
    }
})

export const updateOrder = createAsyncThunk("orders/updateOrder", async (payload, { rejectWithValue }) => {

    
    try {
        const response = await axios.patch(`http://localhost:5000/orders/${payload.id}`,payload, {
            withCredentials: true,
            'content-type': 'application/json'
        })
        return payload;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error.message)
    }
})
