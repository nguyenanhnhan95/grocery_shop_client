'use client'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ErrorResponse } from "@/utils/types";
import { createActionURL } from "@/utils/commonUtils";

// Define the types
export interface AccountPayload {
    username: string;
    password: string;
}

interface LoginResponse {
    code: number;
    result: string;  // Assuming accessToken is stored in result
}


interface LoginState {
    accessToken: string | null;
    error: string | null;
    loading: boolean;
}

export const loginFormAuth = createAsyncThunk<
    LoginResponse,
    AccountPayload,
    { rejectValue: ErrorResponse }>('auth/login', async (account: AccountPayload, { rejectWithValue }) => {
        try {
            const response = await axios.post<LoginResponse>(`${createActionURL('auth/login').instant()}`, account, { withCredentials: true });
            return response.data;  // Return data if code is 200
        } catch (error: any) {
            return rejectWithValue(error.response?.data as ErrorResponse);  // Handle error case
        }
    }
    );

// Initial state for the slice
const initialState: LoginState = {
    accessToken: null,
    error: null,
    loading: false,
};

// Create slice for login form
export const loginFormSlice = createSlice({
    name: "loginForm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginFormAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginFormAuth.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.accessToken = action.payload.result;
                state.error = null;
            })
            .addCase(loginFormAuth.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
                state.loading = false;
                state.accessToken = null;
                state.error = action.payload?.message || 'Unknown error';  // Gracefully handle error message
            });
    },
});

// Export the slice reducer
export default loginFormSlice.reducer;