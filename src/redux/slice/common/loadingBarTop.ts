'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Progress {
    progress: number
}
const initialState: Progress = {
    progress: 0,
}
export const loadingBarTopSlice = createSlice({
    name: 'loadingBarTopSlice',
    initialState,
    reducers: {
        chaneProgressTop: (state, action: PayloadAction<number>) => {
            // Assign only the progress value (which is a number)
            state.progress = action.payload;
        },
    },
})
export const { chaneProgressTop } = loadingBarTopSlice.actions
