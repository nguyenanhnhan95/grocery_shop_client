'use client';

import { useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import { useMemo } from "react";

export const useScreenMode = () => {
    const screenMode = useAppSelector((state:RootState) => state.currentUser.screenMode);
    return useMemo(() => ({ screenMode }), [screenMode]);
};