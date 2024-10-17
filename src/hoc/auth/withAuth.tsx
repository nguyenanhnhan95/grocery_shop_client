'use client';

import { fetchCurrentUser } from "@/redux/slice/common/currentUser";
import { RootState } from "@/setting/store";
import React, { useEffect } from "react";

import { NOT_AUTHENTICATION } from "@/utils/commonConstants";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import useNotificationModal from "@/hooks/useNotificationModal";

export function withAuth<T extends object>(WrappedComponent: React.ComponentType<T>) {
    // Return a new component
    const WithAuth: React.FC<T> = (props: T) => {
      const { authenticate, loading, error } = useAppSelector((state: RootState) => state.currentUser);
      const showNotificationModal = useNotificationModal();
      const dispatch = useAppDispatch();
      const router = useRouter();
  
      // Fetch current user on component mount
      useEffect(() => {
        if (loading === null) {
          dispatch(fetchCurrentUser());
        }
      }, [loading, dispatch]);
  
      // Show notification and redirect if authentication fails
      useEffect(() => {
        if (authenticate === false ) {
          const message =  NOT_AUTHENTICATION;
  
          showNotificationModal(message, () => router.push("/"));
        }
      }, [authenticate, error, showNotificationModal, router]);
  
      // Render the wrapped component if authenticated, otherwise render a loader or null
      if (loading) {
        return <div>Loading...</div>; // Or replace with a custom loader component
      }
  
      if (authenticate === true) {
        return <WrappedComponent {...props} />;
      }
  
      // Optionally, you can return null or a different fallback UI while redirecting
      return null;
    }
  
    return WithAuth;
  }