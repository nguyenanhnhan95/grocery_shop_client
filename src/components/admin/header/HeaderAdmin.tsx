'use client'
import { memo, useEffect, useRef, useState } from "react";
import OverPlayMenuAdmin from "./OverPlayMenuAdmin";
import SearchHeaderAdminPC from "./SearchHeaderAdminPC";
import SearchHeaderAdminMB from "./SearchHeaderAdminMB";
import "./styles/headerAdmin.css"
import Link from "next/link";
import HeaderNotification from "@/components/header/HeaderNotification";
import HeaderUser from "@/components/header/HeaderUser";
import OverSearchAdminMB from "./OverSearchAdminMB";
import { useAppDispatch } from "@/lib/redux";
import { fetchCurrentUser } from "@/redux/slice/common/currentUser";

function HeaderAdmin() {
    const [overSearchMB, setOverSearchMB] = useState<boolean>(false);
    const refClickSearchMB = useRef<HTMLLIElement>(null)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(fetchCurrentUser())
    },[dispatch])
    return (
        <>
            <div className="navbar navbar-expand-lg header-main navbar-light">
                <div className={`container-fluid container-header-main ${overSearchMB ? ('mb') : 'pc'}`}>
                    <div className="main-content-header-left">
                        <div className=" navbar-collapse">
                            <ul className="navbar-nav ">
                                <OverPlayMenuAdmin />
                                < SearchHeaderAdminPC />
                                <SearchHeaderAdminMB setOverSearchMB={setOverSearchMB} refClickSearchMB={refClickSearchMB} />
                            </ul>
                        </div>
                    </div>

                    <div className="main-content-header-right">
                        <div className=" navbar-collapse">
                            <ul className="navbar-nav ">
                                <Link href={`/`}>
                                    <li className="nav-item turn-home">
                                        <i className="fa-solid fa-up-right-from-square " />
                                    </li>
                                </Link>
                                <HeaderNotification />
                                <HeaderUser />
                            </ul>
                        </div>
                    </div>
                    <OverSearchAdminMB setOverSearchMB={setOverSearchMB} refClickSearchMB={refClickSearchMB} />
                </div>
            </div>
            <div className="header-navbar-shadow"></div>
        </>
    )
}
export default memo(HeaderAdmin);