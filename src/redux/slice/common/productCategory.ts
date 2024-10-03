'use client'
import { createActionURL } from "@/utils/commonUtils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductCategory {
    id: number;
    name: string;
    href: string;
    description: string | null;
    parentCategory: ProductCategory | null;
    children: ProductCategory[];
}
interface ProductCategoryState {
    list: ProductCategory[];
    loadingList: boolean | null;
    loadingChildren: boolean | null;
    children: object[];
    error: string | null;
}

const initialState: ProductCategoryState = {
    list: [],
    loadingList: null,
    loadingChildren: null,
    children: [],
    error: null,
};


export const findAllCategoryMenus = createAsyncThunk<ApiResponse<ProductCategory[]>, void>(
    'product-category',
    async () => {
        try {
            const response = await axios.get<ApiResponse<ProductCategory[]>>(`${createActionURL('product-category').instant()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const findChildrenCategory = createAsyncThunk<ApiResponse<object>, void>(
    'product-category/children',
    async () => {
        try {
            const response = await axios.get<ApiResponse<object>>(`${createActionURL('product-category/children').instant()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);


export const getAllCategoryMenus = createSlice({
    name: "product-category",
    initialState,
    reducers: {
        createProductCategoryMenus: (state, action: PayloadAction<ProductCategory[]>) => {
            state.list = action.payload || [];;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(findAllCategoryMenus.pending, (state) => {
            state.loadingList = true;
        })
            .addCase(findAllCategoryMenus.fulfilled, (state, action: PayloadAction<ApiResponse<ProductCategory[]>>) => {
                state.loadingList = false;
                console.log(action.payload.result)
                state.list = action.payload.result || [];
            })
            .addCase(findAllCategoryMenus.rejected, (state, action) => {
                state.loadingList = false;
                state.list = [];
                state.error = action.error?.message || null;
            });

        builder.addCase(findChildrenCategory.pending, (state) => {
            state.loadingChildren = true;
        })
            .addCase(findChildrenCategory.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingChildren = false;
                state.children = action.payload;
            })
            .addCase(findChildrenCategory.rejected, (state, action) => {
                state.loadingChildren = false;
                state.error = action.error?.message || null;
            });
    }
});
export const { createProductCategoryMenus } = getAllCategoryMenus.actions;