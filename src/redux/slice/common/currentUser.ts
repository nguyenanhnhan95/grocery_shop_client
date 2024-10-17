'use client'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ACCESS_SYSTEM_FAIL, LINK_USER, SCREEN_MODE } from "../../../utils/commonConstants";
import { ApiResponse } from "@/types/apiResponse";

export const LOCAL_STORAGE_USER = "STORE_USER";
export const SCREEN_THEME = "SCREEN_THEME";


export interface CurrentUser {
    id: number;
    name: string;
    avatar: string;
    roles: string[];
    permission: string;
    screenTheme: string;
}


interface InitialState {
    authenticate: boolean;
    user: CurrentUser | null;
    screenMode: string;
    loading: boolean | null;
    roles: string[];
    srcAvatar: string | null;
    errorAvatar: string | null;
    error: object | null;
}

const initialState: InitialState = {
    authenticate: false,
    user: null,
    screenMode: SCREEN_MODE.light,
    loading: null,
    roles: [],
    srcAvatar: null,
    errorAvatar: null,
    error:  null,
};

// Async thunk to fetch current user
export const fetchCurrentUser = createAsyncThunk<ApiResponse<CurrentUser>, void>(
    'fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<ApiResponse<CurrentUser>> = await axios.get(LINK_USER.getInformationUser, { withCredentials: true });
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue(new AxiosError(ACCESS_SYSTEM_FAIL));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Slice
export const CurrentUserSlice = createSlice({
    name: 'informationUser',
    initialState,
    reducers: {
        updateCurrentUser: (state, { payload }: PayloadAction<{ user: CurrentUser | null }>) => {
            if (payload.user) {
                state.screenMode = payload.user.screenTheme?.toLowerCase() || SCREEN_MODE.light;
                state.user = payload.user;
                state.authenticate=true;
                
            } else {
                state.user = null;
                state.authenticate=false;
                console.log(state.screenMode) // Reset về giá trị mặc định khi không có người dùng
            }
        },
        updateSrcAvatar: (state, { payload }: PayloadAction<{ srcAvatar: string | null; error: object | null }>) => {
            if (!payload.error) {
                state.srcAvatar = payload.srcAvatar;
            }
        },
        logoutUser: (state) => {
            state.authenticate = false;
            state.user = null;
            state.screenMode = SCREEN_MODE.light;
            state.loading = false;
            state.roles = [];
            state.srcAvatar = null;
            state.errorAvatar = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
                state.authenticate = false;
                state.user = null;
                state.loading = false;
                state.error = payload || null;
                state.roles = [];
            })
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.authenticate = true;
                state.user = payload.result || null;
                state.roles = payload.result?.roles || [];
                state.loading = false;
                state.error = null;
                state.screenMode = payload.result?.screenTheme || SCREEN_MODE.light;
            });
    }
});

export const { updateCurrentUser, updateSrcAvatar, logoutUser } = CurrentUserSlice.actions;

export default CurrentUserSlice.reducer;