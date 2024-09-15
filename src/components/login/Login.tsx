'use client';
import React from "react";
import { useScreenMode } from "@/hooks/common/useScreenMode";
import { SCREEN_MODE } from "@/redux/slice/common/currentUser";
import BackgroundImgDark from "../../../public/image/background_img_login_dark.jpg";
import BackgroundImg from "../../../public/image/background_img_login.jpg";
import LOGO from "../../../public/image/logo-sky.png"
import Image from "next/image";
import LoginForm from "@/components/login/LoginForm";
import LoginSocial from "@/components/login/LoginSocial";
import { withNoAuth } from "@/components/hoc/auth/withNoAuth";
import "./login.css"
function Login() {
    const { screenMode } = useScreenMode();
    
    return (
        <div className="container-fluid login">
            <div className="login-logo">
                <Image src={LOGO} alt="Logo-brand"  />
            </div>
            <div className="login-content">
                <div className=" loin-img">
                    {screenMode === SCREEN_MODE.dark ? (
                        <Image src={BackgroundImgDark} alt="ảnh nền đăng nhập" priority  />
                    ) : (<Image src={BackgroundImg} alt="ảnh nền đăng nhập" priority  />)}
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
export default withNoAuth(Login)