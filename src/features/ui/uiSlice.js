
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isHeaderFooterShow: true
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setHeaderFooterVisibility: (state, action) => {
            state.isHeaderFooterShow = action.payload;
        }
    }
})

export const { setHeaderFooterVisibility } = uiSlice.actions;
export default uiSlice.reducer;