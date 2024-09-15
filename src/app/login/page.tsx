'use client';

import dynamic from "next/dynamic";
import LoadingPage from "@/components/loading/LoadingPage";
const LazyLogin = dynamic(() => import('../../components/login/Login'), {
    loading: () => <LoadingPage />
})
function Login() {
    
    return (
        <>
            <LazyLogin />
        </>

    );
}
export default Login