'use client'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { LINK_USER } from "../../../utils/commonConstants";

export const LOCAL_STORAGE_USER = "STORE_USER";
export const SCREEN_THEME = "SCREEN_THEME";

export const SCREEN_MODE = {
    dark: "dark",
    light: "light"
};

interface CurrentUser {
    id: number;
    name: string;
    avatar: string;
    idProvider: string;
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
export const fetchCurrentUser = createAsyncThunk<CurrentUser, void>(
    'fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            console.log(LINK_USER.getInformationUser)
            const response: AxiosResponse<CurrentUser> = await axios.get(LINK_USER.getInformationUser, { withCredentials: true });
            console.log(response)
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue(new Error('Unexpected response code'));
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
        updateUser: (state, { payload }: PayloadAction<{ user: CurrentUser }>) => {
            state.user = payload.user;
            state.screenMode = payload.user.screenTheme.toLowerCase();
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
                console.log(payload)
                state.roles = [];
            })
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.authenticate = true;
                state.user = payload;
                state.roles = payload.roles;
                state.loading = false;
                state.error = null;
                state.screenMode = payload.screenTheme;
            });
    }
});

export const { updateUser, updateSrcAvatar, logoutUser } = CurrentUserSlice.actions;

export default CurrentUserSlice.reducer;