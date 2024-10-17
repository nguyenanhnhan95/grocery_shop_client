'use client'
import { ApiResponse } from "@/types/apiResponse";
import { MainMenu } from "@/types/menu";
import { ACCESS_SYSTEM_FAIL } from "@/utils/commonConstants";
import { createActionURL } from "@/utils/commonUtils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
interface MainMenuState{
    menu:MainMenu|null,
    loadingMenu:boolean|null,
    errorMenu:AxiosError|null,
    menus:MainMenu[]|[],
    errorMenus:AxiosError|null,
    loadingMenus:boolean|null,
}
const initialState:MainMenuState={
    menu:null,
    loadingMenu:null,
    errorMenu:null,
    menus:[],
    errorMenus:null,
    loadingMenus:null,
}
export const getSidebarMenusAdmin = createAsyncThunk<ApiResponse<MainMenu[]>, void>('getSidebarMenus',
    async (_, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<ApiResponse<MainMenu[]>>= await axios.get(createActionURL('menu/admin-side').instant(), { withCredentials: true });
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue(new AxiosError(ACCESS_SYSTEM_FAIL));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
export const getMenuByPathAdmin = createAsyncThunk<ApiResponse<MainMenu>, string>('/menu/admin-side/path',
    async (path, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<ApiResponse<MainMenu>>= await axios.get(createActionURL('menu/admin-side/path').requestParam([{key:'path',value:path}]), { withCredentials: true });
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue(new AxiosError(ACCESS_SYSTEM_FAIL));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
export const menMainSlice = createSlice({
    name: 'menuMainSlice',
    initialState,
    reducers: {
        transferMenuToContentMain: (state, { payload }: PayloadAction<MainMenu >) => {
            state.menu = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSidebarMenusAdmin.pending, (state) => {
            state.loadingMenus =true;
            state.errorMenus = null;
        })
            .addCase(getSidebarMenusAdmin.rejected, (state, { payload }) => {
                state.loadingMenus=false;
                state.errorMenus = payload as AxiosError;
            })
            .addCase(getSidebarMenusAdmin.fulfilled, (state, { payload }) => {
                state.loadingMenus=false;
                state.menus = payload.result || []
            })
        builder.addCase(getMenuByPathAdmin.pending, (state) => {
            state.loadingMenu=true;
        })
            .addCase(getMenuByPathAdmin.rejected, (state, { payload }) => {
                state.loadingMenu=false;
                state.errorMenu = payload as AxiosError;
            })
            .addCase(getMenuByPathAdmin.fulfilled, (state,  { payload }) => {
                state.loadingMenu=false;
                state.menu = payload.result
            })
    }
})
export const { transferMenuToContentMain } = menMainSlice.actions

export default menMainSlice;