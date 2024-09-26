'use client'
import {createSlice } from "@reduxjs/toolkit";

interface InitialState{
    onClickAction:HTMLButtonElement|null,
    close:boolean
}
const initialState:InitialState={
    onClickAction:null,
    close:false
}
export const actionAdminSlice = createSlice({
    name: "actionAdmin",
    initialState,
    reducers: {

        actionSave: (state, {payload}) => {
            state.close = payload.close;
        },
        onClickSaveAction: (state, {payload}) => {
            state.onClickAction = payload;
        },
    }
})
export const { actionSave,onClickSaveAction} = actionAdminSlice.actions