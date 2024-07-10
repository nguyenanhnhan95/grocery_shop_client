import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_USER_FAILED, FETCH_USER_LOADING, FETCH_USER_SUCCEEDED } from "../../constants/user";
import axios from "axios";
import { createHeader } from "../../utils/commonUtils";
import { linkHttp } from "../../utils/commonConstants";
const initialState = {
    authenticate: false,
    profile: null,
    status: null,
    loading: false,
    error: null,
}
export const fetchProfile = createAsyncThunk('fetchProfile', async ({ dispatch, rejectWithValue }) => {
    try {
        const response = await axios.get(linkHttp.getProfile, createHeader());
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    } finally {
    }
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile:(state,action)=>{
            console.log(action.payload.profile)
            state.profile=action?.payload.profile;
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state, action) => {
                state.authenticate = false;
                state.profile = null;
                state.loading = true;
                state.status = FETCH_USER_LOADING;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.authenticate = true;
                state.profile = action?.payload;
                state.loading = false;
                state.status = FETCH_USER_SUCCEEDED;
                state.error = null;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.authenticate = false;
                state.profile = null;
                state.loading = false;
                state.status = FETCH_USER_FAILED;
                state.error = action.error;
            })
    }
})
export const { updateProfile } = profileSlice.actions