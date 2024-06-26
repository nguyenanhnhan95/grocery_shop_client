import { memo, useEffect} from "react";
import "../../css/header/header.css"
import HeaderSearch from "./HeaderSearch";
import HeaderCart from "./HeaderCart";
import HeaderNotification from "./HeaderNotification";
import HeaderUser from "./HeaderUser";
import HeaderMenusMB from "./HeaderMenusMB";
import HeaderMenusPc from "./HeaderMenusPC";
import { useDispatch } from "react-redux";
import { findAllCategoryMenus} from "../../slice/product/productCategoty";
function Header() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(findAllCategoryMenus())
    },[dispatch])  
    return (
        <div className="header">
            <div className="container-fluid container-header ">
                <div className="d-flex justify-content-between ">
                    <div className="d-flex justify-content-start align-items-center">
                        <HeaderMenusMB />
                        <HeaderMenusPc/>
                    </div>
                    <div className="d-flex justify-content-end align-items-center mr-5">
                        <HeaderSearch />
                        <HeaderCart />
                        <HeaderNotification />
                        <HeaderUser />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(Header);