
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {

    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile`, {
            withCredentials: true
        });

        return response?.data?.user;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error?.message);
    }
})

export const editProfile = createAsyncThunk('user/editProfile', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/edit-profile`, payload, {
            withCredentials: true
        })
        if (response?.data?.success)
            return payload;
        else
            return rejectWithValue('Error');
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error?.message);
    }
})

export const changePassword = createAsyncThunk('user/changePassword', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/change-password`, payload, {
            withCredentials: true
        })
        return response?.data?.success
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error?.message);
    }
})

export const signUp = createAsyncThunk('user/signUp', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, payload, {
            withCredentials: true
        });
        return response?.data?.msg;
    } catch (error) {

        return rejectWithValue(error?.response?.data?.msg || error?.message);
    }
})

export const signIn = createAsyncThunk('user/signIn', async (payload, { rejectWithValue }) => {
    try {

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signin`, payload, {
            withCredentials: true
        })

        return response?.data?.msg;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error?.message); //ye action.payload me jayega without it action.error.message me jayega.
    }
})

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {

    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {}, {
            withCredentials: true
        })
        return response?.data?.msg;
    } catch (error) {

        return rejectWithValue(error?.response?.data?.msg || error?.message);
    }
})


export const updateCart = createAsyncThunk('user/updateCart', async (payload, { rejectWithValue }) => {
    try {
        const id = payload?.id;
        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/cart/${id}`, { quantity: payload?.quantity }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })

        if (response?.data?.success === true)
            return payload;
        else {
            return rejectWithValue("Update failed");
        }

    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error?.message);
    }
})

export const deleteCart = createAsyncThunk('user/deleteCart', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/cart/${id}`, {
            withCredentials: true
        })

        if (response?.data?.success === true)
            return id;
        else {
            return rejectWithValue("Update failed");
        }

    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error?.message);
    }
})

export const addCart = createAsyncThunk('user/addCart', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/cart/add`, payload, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        if (response?.data?.success)
            return response?.data?.cart?.[response?.data?.cart?.length - 1];
        else {
            return rejectWithValue("Product not add to card");
        }
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error?.message);
    }
})

export const addWishList = createAsyncThunk('user/addWishList', async (id, { rejectWithValue }) => {

    try {
        const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/wishlist/${id}`, {}, {
            withCredentials: true
        })
        return response?.data?.product
    } catch (error) {
        return rejectWithValue(error?.message || error?.response?.data?.msg)
    }
})

export const getWishList = createAsyncThunk('user/getWishList', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/wishlist/`, {
            withCredentials: true
        })

        return response?.data?.products
    } catch (error) {
        return rejectWithValue(error?.message || error?.response?.data?.msg)
    }
})

export const deleteWishList = createAsyncThunk('user/deleteWishList', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/wishlist/${id}`, {
            withCredentials: true
        })
        return response?.data?.id
    } catch (error) {
        return rejectWithValue(error?.message || error?.response?.data?.msg)
    }
})