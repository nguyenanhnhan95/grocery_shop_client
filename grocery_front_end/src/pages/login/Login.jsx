import "../../assets/css/login/login.css"
import LoginForm from "../../components/login/LoginForm";
import SocialLogin from "../../components/login/SocialLogin";
import BackgroundImg from "../../assets/img/background_img_login.png"
import { memo } from "react";
function Login() {
  return (
    <div className="container-fluid login">
      <div className="row">
        <div className="col-0 col-sm-0 col-md-0 col-lg-0 col-xl-8 loin-img">
          <img src={BackgroundImg} alt="" />
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 d-flex align-items-center justify-content-center login-form">
          <div className="card card-login">
            <div className="card-header">
              Đăng nhập
            </div>
            <div className="card-body">
              <LoginForm />
              <div className="separator mb-3">Hoặc</div>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default memo(Login);