
import { FETCH_PRODUCT_FAILED, FETCH_PRODUCT_SUCCEEDED, FETCH_PRODUCT_LOADING } from "../../constants/product"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseService from "../../services/base/base";
const initialState = {
    status: 'uninitialized',
    products: [],
    error: null,
    queryParameter: {
        "size": 10,
        "page": 0,
        "criterias": {
            "name": "nhan"
        }
    }
}
export const findQueryProduct = createAsyncThunk('product', async (queryParameter) => {
    console.log(JSON.stringify(queryParameter))
    const encodedQuery = encodeURIComponent(JSON.stringify(queryParameter));
    return BaseService.findAll("http://localhost:8080/home/products",encodedQuery)
})
// export const fetchProduct = createAsyncThunk('product/fetchEmployees')
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(findQueryProduct.pending, (state, action) => {
                state.status = FETCH_PRODUCT_LOADING
                state.products = []
            })
            .addCase(findQueryProduct.fulfilled, (state, action) => {
                state.status = FETCH_PRODUCT_SUCCEEDED
                state.products = action.payload
            })
            .addCase(findQueryProduct.rejected, (state, action) => {
                state.status = FETCH_PRODUCT_FAILED
                state.products = []
                state.error = action.error
            })
    }
})