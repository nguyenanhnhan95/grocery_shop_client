'use client'
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";

import { getSidebarMenusAdmin, transferMenuToContentMain } from "@/redux/slice/admin/sideMenu";
import Link from "next/link";
import LoadingSideBarMenu from "./LoadingSideBarMenu";
import { usePathname } from "next/navigation";
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { createActionURL } from "@/utils/commonUtils";
import { MainMenu } from "@/types/menu";


function ContentSideBarMenu() {
    const { menus, menu, loadingMenus } = useAppSelector((state: RootState) => state.sidebarMenu);
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const [menuActive, setMenuActive] = useState<MainMenu|null>(null);
    const {fetchData,data,code} = useFetchData<MainMenu>()
    useEffect(()=>{
        if(pathname && loadingMenus===false  ){
            fetchData(`${createActionURL("menu/admin-side/path-children").requestParam([{key:'children',value:pathname}])}`)
        }
    },[fetchData,loadingMenus,pathname])
    useEffect(()=>{
        dispatch(getSidebarMenusAdmin())
    },[dispatch])
    const handleChangeOpenMenu = useCallback((menu: MainMenu, flagMenu: boolean) => {
        if (flagMenu) {
            setMenuActive((prev) => (prev === menu ? null : menu));
        } else {
            dispatch(transferMenuToContentMain(menu));
        }
    }, [dispatch]);
    useEffect(() => {
        if(pathname && ['/admin','/admin/dash-board'].includes(pathname)){
            dispatch(transferMenuToContentMain(menus[0]));
        }    
    }, [pathname,menus,dispatch])

    useEffect(() => {
        if(data){
            setMenuActive(data)
        }    
    }, [data])

    if(code!==200  ){
      return  <LoadingSideBarMenu/>
    }
    return (
        <div className="main-menu-content ps ps--active-y">
            <ul className="navigation navigation-main" >
                {menus.length !== 0 && (
                    <li className={`nav-item ${menus[0]?.title === menu?.title ? 'active' : ''}`} onClick={() => handleChangeOpenMenu(menus[0], false)}>
                        <Link className="d-flex align-items-center" href={menus[0].href} >
                            <i className="fa-solid fa-house " />
                            <span className="menu-item text-truncate">Tổng quan</span>
                        </Link>
                    </li>
                )}
                {menus && menus.map((parent, indexParent) => (
                    <Fragment key={indexParent}>
                        {parent.header && (
                            <li className="navigation-header">
                                <span>{parent.title}</span>
                            </li>
                        )}
                        {!parent.header && indexParent !== 0 && (
                            <li className={`nav-item   menu-item-animating ${menuActive?.title === parent.title ? 'open' : ''} ${parent.subMenus.length !== 0 ? 'has-sub ' : ''} `}>
                                {parent?.href !== null ?
                                    (
                                        <Link className={`d-flex align-items-center menu-active-parent `} href={`${parent.href}`}
                                            onClick={() => handleChangeOpenMenu(parent, true)}>
                                            <i className={parent.iconClass} />
                                            <span className="menu-item text-truncate">{parent.title}</span>
                                        </Link>
                                    )
                                    : (
                                        <div className="d-flex align-items-center menu-head " onClick={() => handleChangeOpenMenu(parent, true)} >
                                            <i className={parent.iconClass} />
                                            <span className="menu-title text-truncate">{parent.title}</span>
                                        </div>
                                    )}

                                {parent.subMenus && parent.subMenus.map((children:MainMenu, indexChildren:number) => (
                                    <ul className="menu-content" key={indexChildren}>
                                        <li >
                                            <Link className={`d-flex align-items-center ${pathname?.startsWith(children.href) ?'active':''}`} href={`${children.href}`}
                                                onClick={() => handleChangeOpenMenu(children, false)}>
                                                <i className={children.iconClass} />
                                                <span className="menu-item text-truncate">{children.title}</span>
                                            </Link>
                                        </li>
                                    </ul>
                                ))}
                            </li>
                        )}
                    </Fragment>
                ))}
            </ul>
        </div>
    )
}
export default memo(ContentSideBarMenu)