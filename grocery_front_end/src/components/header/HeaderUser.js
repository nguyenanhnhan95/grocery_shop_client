import { memo,  useCallback,  useEffect,useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findByUser } from "../../slice/user";
import {  PROVIDER_ID,  USER_LOGIN, constLogin } from "../../constants/login/login";
import "../../css/header/headerUser.css"
import { getRefreshToken } from "../../services/token";
import { createHeader } from "../../utils/common";
import { linkHttp } from "../../constants/common/resource";
import InformationUserHeader from "./InformationUserHeader";
import RedirectAdminHeader from "./RedirectAdminHeader";
function HeaderUser() {
    const dispatch = useDispatch();
    const getUserDataRef = useRef();
    const { authenticate } = useSelector((state) => state.user)
    const [isModalUserVisible, setIsModalUserVisible] = useState(false);
    const headerUserRef = useRef(null);
    const headerUserModalRef = useRef(null);
    const handleRefreshToken =useCallback( async () => {
        try {
            const response = await getRefreshToken(localStorage.getItem(constLogin.ACCESS_TOKEN))
            localStorage.setItem(constLogin.ACCESS_TOKEN, response.accessToken)
            getUserDataRef.current();

        } catch (error) {
            localStorage.removeItem(constLogin.ACCESS_TOKEN);
            handleLogIn();
        }
    },[])
    const getUserData =useCallback( async () => {
        try {
            await dispatch(findByUser(linkHttp.getUserHeader, createHeader())).unwrap();
        } catch (error) {
            if (error.status) {
                switch (error.status) {
                    case 4007:
                        localStorage.removeItem(constLogin.ACCESS_TOKEN);
                        handleLogIn()
                        break;
                    case 4008:
                        handleRefreshToken()
                        break;
                    default:
                        handleLogIn()
                }
            }
        }
    },[dispatch,handleRefreshToken])
   
    
    useEffect(() => {
        if (localStorage.getItem(constLogin.ACCESS_TOKEN) !== null ) {
            getUserData(localStorage.getItem(constLogin.ACCESS_TOKEN));
        }
    },[getUserData])
  
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (headerUserRef.current && !headerUserRef.current.contains(event.target)) {
                setIsModalUserVisible(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleHeaderUserClick = () => {
        setIsModalUserVisible(!isModalUserVisible);
    };
    const handleLogIn=()=>{
        window.location.href=linkHttp.linkLogin;
    }
    const handleLogout = () => {
        let token = localStorage.getItem(constLogin.ACCESS_TOKEN);
        localStorage.removeItem(constLogin.ACCESS_TOKEN);
        localStorage.removeItem(PROVIDER_ID);
        localStorage.removeItem(USER_LOGIN);
        window.location.href = `${linkHttp.linkLogOut}?token=${token}`;
    }
    return (
        <>

            { authenticate ?
                <div className="header-user dropdown d-flex justify-content-center" ref={headerUserRef} onClick={handleHeaderUserClick}>
                    <InformationUserHeader/>
                    <div className={`dropdown-menu dropdown-menu-user ${isModalUserVisible ? 'show' : 'close'}`} ref={headerUserModalRef}>
                        <div className="dropdown-item"><i className="fa-solid fa-user-gear mr-2"></i>Cập nhập tài khoản</div>
                        <RedirectAdminHeader/>
                        <div className="dropdown-item" onClick={() => handleLogout()}><i className="fa-solid fa-power-off mr-2"></i>Đăng xuất</div>
                    </div>
                </div>
                :<div className="header-user-login" onClick={()=>handleLogIn()} >Đăng nhập</div>
            }


        </>
    )
}
export default memo(HeaderUser);