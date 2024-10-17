'use client'
import LoadingPage from "@/components/loading/LoadingPage";
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { createActionURL } from "@/utils/commonUtils";
import { useRouter } from "next/navigation";
import { ComponentType, ReactNode,  useEffect } from "react";

export default  function withAuthAdminPage(WrappedComponent: ComponentType<{ children: ReactNode }>) {
    return function AuthenticatedAdminPage({ children }: { children?: ReactNode }) {
        const { fetchData, code,  isPending } = useFetchData();
        const router = useRouter();

        // Memoized fetch to avoid unnecessary re-fetches
        useEffect(() => {
            const authorizePage = async () => {
              await fetchData(createActionURL("auth/authorize-page").requestParam([{ key: 'require-page', value: 'dash-board:view' }]));
            };
            authorizePage();
          }, [fetchData]);
          console.log(code)
          useEffect(() => {
            if (code !== null && code !== 200) {
              router.back(); // Navigate back if unauthorized
            }
          }, [code, router]);
      
          if (isPending) return <LoadingPage />; // Show loading while pending
      
          if (code === 200) {
            return <WrappedComponent>{children}</WrappedComponent>; // Render the wrapped component with children
          }
      
          return null; // Render nothing until auth check completes
        };
}

