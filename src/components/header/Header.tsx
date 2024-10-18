'use client'
import { useAppDispatch } from "@/lib/redux";
import { createProductCategoryMenus } from "@/redux/slice/common/productCategory";
import { useEffect } from "react";
import HeaderMenusMB from "@/components/header/HeaderMenusMB";
import HeaderMenusPC from "@/components/header/HeaderMenusPC";
import HeaderSearchMB from "./HeaderSearchMB";
import HeaderSearchPC from "./HeaderSearchPC";
import HeaderCart from "./HeaderCart";
import HeaderNotification from "./HeaderNotification";
import HeaderUser from "./HeaderUser";
import "./styles/header.css";
import { fetchCurrentUser } from "@/redux/slice/common/currentUser";
import { ProductCategory } from "@/types/product";

interface HeaderProps {
    productCategoryMenus: ProductCategory[],

}
function Header({ productCategoryMenus }: HeaderProps) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(createProductCategoryMenus(productCategoryMenus))

    }, [productCategoryMenus, dispatch])
    useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [dispatch])
    return (
        <div className="header">
            <div className="container-fluid container-header ">
                <div className="d-flex  header-mb-container navbar-collapse">
                    <HeaderMenusMB />
                    <HeaderMenusPC />
                    <HeaderSearchMB />
                    <ul className="navbar-nav ">
                        <HeaderSearchPC />
                        <HeaderCart />
                        <HeaderNotification />
                        <HeaderUser />
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Header;