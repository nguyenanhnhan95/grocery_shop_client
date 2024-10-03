'use client'
import { fetchCurrentUser } from "@/redux/slice/common/currentUser";
import { RootState } from "@/setting/store";
import { ComponentType, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import LoadingPage from "@/components/loading/LoadingPage";



export function withNoAuth(WrappedComponent: ComponentType<{ children?: ReactNode }>) {
    return function WithNoAuth({ children }: { children?: ReactNode }) {
        const { authenticate, loading } = useAppSelector((state: RootState) => state.currentUser);
        const dispatch = useAppDispatch();
        const router = useRouter();

 
        useEffect(() => {
            if (loading === null) {
                dispatch(fetchCurrentUser());
            }
        }, [loading, dispatch]);


        useEffect(() => {
            if (authenticate === true) {
                router.push("/");
            }
        }, [authenticate, router]);

        // Loading state handling
        if (loading === true) {
            return <LoadingPage />; 
        }

        if (authenticate === false) {
            return <WrappedComponent>{children}</WrappedComponent>;
        }

        // Return null by default if still checking authentication or loading state is unclear
        return null;
    };
}
