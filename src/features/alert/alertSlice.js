
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    color: '',
    msg: ''
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.open = true;
            state.color = action.payload.color;
            state.msg = action.payload.msg;
        },
        closeAlert: (state) => {
            state.open = false;
            state.color = '';
            state.msg = '';
        }
    }
})

export const { showAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;