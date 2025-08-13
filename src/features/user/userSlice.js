
import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, logout, signUp, signIn, updateCart, deleteCart, addCart, addWishList, getWishList, deleteWishList, editProfile, changePassword } from "./userAPI";

const initialState = {
    item: {},
    status: 'idle',
    error: '',
    isLogin: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        emptyCart : (state)=>{
            state.item.cart = []
        }
    },
    extraReducers: (builder) => {

        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action?.error?.message;
                state.isLogin = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.item = action.payload;
                state.isLogin = true;
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isLogin = false;
                state.item = {}
            })
            .addCase(signUp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = 'failed';
                state.isLogin = false;
                state.error = action.payload || action.error?.message;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isLogin = true;
            })
            .addCase(signIn.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'failed';
                state.isLogin = false;
                state.error = action.payload || action.error?.message;
                state.item = {};
            })
            .addCase(signIn.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isLogin = true;
            })
            .addCase(updateCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const idx = state?.item?.cart?.findIndex((p) => p?._id?.toString() === action?.payload?.id);
                if (idx !== -1) {
                    const ele = state?.item?.cart[idx];
                    state.item.cart[idx] = { ...ele, quantity: action?.payload?.quantity };
                }
            })
            .addCase(deleteCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const idx = state?.item?.cart?.findIndex((p) => p?._id?.toString() === action?.payload);
                if (idx !== -1) {
                    state?.item?.cart?.splice(idx, 1);
                }
            })
            .addCase(addCart.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state?.item?.cart?.push(action.payload);
            })
            .addCase(addWishList.pending, (state) => {
                // state.status = 'loading'
            })
            .addCase(addWishList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(addWishList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state?.item?.wishList?.push(action.payload);
            })
            .addCase(getWishList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getWishList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(getWishList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.item.wishList = action?.payload;
            })
            .addCase(deleteWishList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteWishList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(deleteWishList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.item.wishList = state?.item?.wishList?.filter((pro) => pro._id.toString() !== action.payload);
            })
            .addCase(editProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.item.name = action?.payload?.name;
                state.item.phone = action?.payload?.phone;
                if (action?.payload?.image) {
                    state.item.image = action?.payload?.image;
                }
            })
            .addCase(changePassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error?.message;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.status = 'succeeded'
            })
    }
})

export const {emptyCart} = userSlice.actions
export default userSlice.reducer;