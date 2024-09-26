'use client'
import { fetchCurrentUser } from "@/redux/slice/common/currentUser";
import { RootState } from "@/setting/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux";



export function withNoAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
    // Return a new component
    const WithNoAuth: React.FC<T> = (props: T) => {
        const { authenticate, loading } = useAppSelector((state: RootState) => state.currentUser);
        const dispatch = useAppDispatch();
        const router = useRouter();

        // Fetch current user on component mount
        useEffect(() => {
            if (loading === null) {
                dispatch(fetchCurrentUser());
            }
        }, [loading, dispatch]);

        // Redirect if the user is authenticated
        useEffect(() => {
            if (authenticate === true) {
                router.push("/");
            }
        }, [authenticate, router]);

        // Render the wrapped component if not authenticated, otherwise render nothing
        if (authenticate === false || loading === null) {
            return <WrappedComponent {...props} />;
        }

        // Optionally, you can return a loading indicator or null while authentication status is being determined
        return null;
    };

    return WithNoAuth;
}