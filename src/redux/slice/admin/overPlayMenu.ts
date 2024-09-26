'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ClickOutsideHandler = (target: EventTarget | null) => boolean;
interface OverPlayMenuMainState {
  open: boolean;
  clickMenuAdminRef: ClickOutsideHandler | null; 
}

const initialState: OverPlayMenuMainState = {
  open: false,
  clickMenuAdminRef: null,
};

export const overPlayMenuMainSlice = createSlice({
  name: 'overPlayMenuMain',
  initialState,
  reducers: {
    onClickHandleOverPlay: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    onClickMenuAdminRef: (state, action: PayloadAction<ClickOutsideHandler >) => { 
      state.clickMenuAdminRef = action.payload;
    },
  },
});

export const { onClickHandleOverPlay, onClickMenuAdminRef } = overPlayMenuMainSlice.actions;

export default overPlayMenuMainSlice;