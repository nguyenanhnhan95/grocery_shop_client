'use client'
import { useRouter } from "next/navigation";


function RedirectLogin() {
    const router = useRouter();
    return (
        <div className="header-user-login" onClick={() => router.push("/login")} >Đăng nhập</div>

    )
}
export default RedirectLogin;