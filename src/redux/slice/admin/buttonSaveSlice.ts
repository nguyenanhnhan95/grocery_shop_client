'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    onClickActionId: string | null; 
    close: boolean;                
    funcClose: (() => void) | null; 
}

const initialState: InitialState = {
    onClickActionId: null,          
    close: false,                   
    funcClose: null,                
};
export const actionAdminSlice = createSlice({
    name: "actionAdmin",
    initialState,
    reducers: {
        setFuncClose: (state, action: PayloadAction<() => void>) => {
            state.funcClose=action.payload
        },
        actionSave: (state, action: PayloadAction<boolean>) => {
            state.close = action.payload;
        },
        onClickSaveAction: (state, action: PayloadAction<{ buttonSaveId: string | null }>) => {
            state.onClickActionId = action.payload.buttonSaveId;
        },
    }
})
export const { actionSave, onClickSaveAction,setFuncClose } = actionAdminSlice.actions