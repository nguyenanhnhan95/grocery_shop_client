'use client'
import { CLOSE, SHOW } from '@/utils/commonConstants';
import { NotificationPayload } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define types for the state and payload
interface NotificationModalState {
    show: boolean;
    message?: string;
    handleServiceConfirm?: () => void; // Optional function
}


const initialState: NotificationModalState = {
    show: false,
    message: "",
    handleServiceConfirm: undefined
};

export const notificationModalSlice = createSlice({
    name: 'notificationModalSlice',
    initialState,
    reducers: {
        handleNotificationModal: (state, action: PayloadAction<NotificationPayload>) => {
            switch (action.payload.type) {
                case SHOW:
                    state.show = true;
                    state.message = action.payload.message || "";
                    state.handleServiceConfirm = action.payload.handleServiceConfirm;
                    break;
                case CLOSE:
                    state.show = false;
                    state.message = ""; // Optionally clear the message on close
                    state.handleServiceConfirm = undefined; // Optionally clear the handler on close
                    break;
                default:
                    return state;
            }
        }
    },
});

export const { handleNotificationModal } = notificationModalSlice.actions;
