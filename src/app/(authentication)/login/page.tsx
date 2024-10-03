'use client';
import BackgroundImgDark from "./../../../../public/image/background_img_login_dark.jpg";
import BackgroundImg from "./../../../../public/image/background_img_login.jpg";
import LOGO from "./../../../../public/image/logo-sky.png"
import Image, { StaticImageData } from "next/image";
import LoginForm from "@/components/login/LoginForm";
import LoginSocial from "@/components/login/LoginSocial";
import "./../../../components/login/login.css"
import { SCREEN_MODE } from "@/utils/commonConstants";
import { withNoAuth } from "@/hoc/auth/withNoAuth";
import { useEffect, useState } from "react";
function Login() {
    const [srcBackgound, setSrcBackgound] = useState<StaticImageData |null>(null);
    useEffect(() => {     
        const htmlElement = document.documentElement;
        const theme = htmlElement.getAttribute('dark-theme');
        if (theme === SCREEN_MODE.dark) {
            setSrcBackgound(BackgroundImgDark);
        } else {
            setSrcBackgound(BackgroundImg);
        }
    }, []);
    if (!srcBackgound) return null; 
    return (
        <div className="container-fluid login">
            <div className="login-logo">
                <Image src={LOGO} alt="Logo-brand" />
            </div>
            <div className="login-content">
                <div className=" loin-img">
                        <Image src={srcBackgound} alt="ảnh nền đăng nhập" priority />
                </div>
                <div className="  justify-content-center login-form">
                    <div className="card card-login">
                        <div className="card-header">
                            <div className="card-header-title">
                                Đăng nhập
                            </div>
                        </div>
                        <div className="card-body">
                            <LoginForm />
                            <div className="separator mb-3">Hoặc</div>
                            <LoginSocial />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const AuthLogin = withNoAuth(Login);
export default AuthLogin;