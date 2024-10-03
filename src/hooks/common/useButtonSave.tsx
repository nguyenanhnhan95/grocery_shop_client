'use client'

import { useAppDispatch } from "@/lib/redux";
import { onClickSaveAction } from "@/redux/slice/admin/buttonSaveSlice";
import {  useEffect, useId, useMemo, useRef } from "react";

export const useButtonSave = () => {
    const dispatch = useAppDispatch();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const idButtonSave = useId()
    const buttonSaveId = useMemo(() => buttonRef.current ? buttonRef.current.id : null, [buttonRef.current]);
    useEffect(() => {
        dispatch(onClickSaveAction({ buttonSaveId: buttonSaveId }));
    }, [dispatch, buttonSaveId])
    return {idButtonSave,buttonRef}
}