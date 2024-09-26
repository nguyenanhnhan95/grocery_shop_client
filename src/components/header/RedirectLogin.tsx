'use client'
import { useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import { useRouter } from "next/navigation";


function RedirectLogin() {
    const { authenticate, loading } = useAppSelector((state: RootState) => state.currentUser)
    const router = useRouter();
    return (
        <div className="header-user-login" onClick={() => router.push("/login")} >Đăng nhập</div>

    )
}
export default RedirectLogin;