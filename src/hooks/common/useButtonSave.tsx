'use client'

import { useAppDispatch } from "@/lib/redux";
import { onClickSaveAction } from "@/redux/slice/admin/buttonSaveSlice";
import {  useEffect, useId, useRef } from "react";

export const useButtonSave = () => {
    const dispatch = useAppDispatch();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const idButtonSave = useId()
    useEffect(() => {
        if (buttonRef.current) {
            dispatch(onClickSaveAction({ buttonSaveId: buttonRef.current.id }));
        }
    }, [dispatch])
    return {idButtonSave,buttonRef}
}