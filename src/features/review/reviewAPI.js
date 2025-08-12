
import { createAsyncThunk, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';


export const addReview = createAsyncThunk('review/addReview', async (payload, { rejectWithValue }) => {

    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/review/add`, payload, {
            'content-type': 'application/json',
            withCredentials: true
        })

        return response?.data?.review;
    } catch (error) {
        return rejectWithValue(error?.message || error?.response?.data?.msg);
    }
})
export const getReview = createAsyncThunk('review/getReview', async (id, { rejectWithValue }) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/review/${id}`);
        return response?.data?.reviews;
    } catch (error) {
        return rejectWithValue(error?.message || error?.response?.data?.msg);
    }
})