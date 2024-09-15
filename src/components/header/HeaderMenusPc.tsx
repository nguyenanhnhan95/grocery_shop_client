'use client';

import { useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import LogoSky from "./../../../public/image/logo-sky.png"
import Image from "next/image";
function HeaderMenusPc() {
    const {  list } = useAppSelector((state:RootState) => state.productCategoryMenus)
    return (
        <div className="header-menu-pc">
            <div className="header-logo header-item">
                <Image src={LogoSky} alt=""  />
            </div>
            <div className="drop-menu header-item ">
                <ul className="nav" >
                    {list && list.map((parent, index) => (
                        <li className="nav-item category-item d-flex align-items-center dropdown" key={index}>
                            {parent.name}
                            <ul className="dropdown-menu">
                                {parent.children.map((child, zIndex) => (
                                    <li key={zIndex}>
                                        <div className="dropdown-item"><i className="fa-solid fa-caret-right" />{child.name}</div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}
export default HeaderMenusPc;