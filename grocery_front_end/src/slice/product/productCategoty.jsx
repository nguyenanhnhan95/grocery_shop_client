import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const findAllCategoryMenus = createAsyncThunk('productCategoryMenus',
    async () => {
        try {
            const response = await axios.get("http://localhost:8080/category");
            return response.data;
        } catch (error) {

        }
        finally {
        }
    }
)
export const getAllCategoryMenus = createSlice({
    name: "productCategoryMenus",
    initialState: {
        loading: false,
        productCategories: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(findAllCategoryMenus.pending, (state) => {
            state.loading = true;
            state.productCategories = [];
            state.error = null;
        })
            .addCase(findAllCategoryMenus.fulfilled, (state, action) => {
                state.loading = false;
                state.productCategories = action.payload;
                state.error = null;
            })
            .addCase(findAllCategoryMenus.rejected, (state, action) => {
                state.loading = false;
                state.productCategories = [];
                state.error = action.error;
            })
    }
})