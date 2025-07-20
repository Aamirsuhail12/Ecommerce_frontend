
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from '../features/ui/uiSlice';
import alertReducer from '../features/alert/alertSlice';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/category/categorySlice';
import filterReducer from '../features/filter/filterSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        alert: alertReducer,
        products: productReducer,
        categories: categoryReducer,
        filter: filterReducer,
        user: userReducer
    }
})