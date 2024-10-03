'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface QueryParameterState {
    initialQueryParameter: QueryParameter | null;
    queryParameter: QueryParameter;
}
const initialState: QueryParameterState = {
    initialQueryParameter: null,
    queryParameter: {
        size: 5,
        page: 0,
    },
};

export const queryParameterSlice = createSlice({
    name: 'queryParameterSlice',
    initialState,
    reducers: {
        updateQueryParameter: (state, action: PayloadAction<QueryParameter>) => {
            state.queryParameter = action.payload
        },
        // Initializes query parameters
        createQueryParameter: (state, action: PayloadAction<QueryParameter>) => {
            state.initialQueryParameter = action.payload;
            state.queryParameter = action.payload;
        },
        updateQueryCriterias: (state, action: PayloadAction<Partial<Record<string, any>>>) => {
            state.queryParameter = {
                ...state.queryParameter,
                ...action.payload, // Only updates the fields provided in payload
                criterias: action.payload
            };
        },
    },
})
export const { updateQueryParameter, createQueryParameter,updateQueryCriterias } = queryParameterSlice.actions