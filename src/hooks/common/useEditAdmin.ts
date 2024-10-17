'use client'
import { toastTopRight } from "@/config/toast";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { actionSave } from "@/redux/slice/admin/buttonSaveSlice";
import { RootState } from "@/setting/store";
import { useCallback, useEffect } from "react";

export const useEditAdmin = ({ code, message }: { code: number | null; message: string | null }) => {
    const { funcClose, close } = useAppSelector((state: RootState) => state.actionAdmin)
    const dispatch = useAppDispatch();
    const handleEdit = useCallback(() => {
        if (code === 200) {
            if (close) {
                funcClose?.();
                dispatch(actionSave(false));
            }
            if (message) {
                toastTopRight.toastSuccess(message)
            }
        } else {
            if (message) {
                toastTopRight.toastWarning(message)
            }
        }

    }, [code, message, funcClose, close, dispatch]);
    useEffect(() => {
        handleEdit()
    }, [handleEdit])
}