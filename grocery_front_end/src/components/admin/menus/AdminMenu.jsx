import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import "../../../assets/css/admin/menus/menuAdmin.css"
import React from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onClickHandleOverPlay } from "../../../slice/main/overPlayMenu";
import logoBrand from "../../../assets/img/header/logo-sky.png"
import { transferMenuToContentMain } from "../../../slice/main/menuContentMain";
import { checkResourceAdmin, commonResource, createHeader } from "../../../utils/commonUtils";
import { connectAWSParams, linkHttp } from "../../../utils/commonConstants";
import { getListMainMenu } from "../../../services/admin/mainMenu";

function AdminMenu(props,ref) {
  const isOpen = useSelector((state) => state.overPlayMenuMain.open)
  const [menus, setMenus] = useState([]);
  const [menuActive, setMenuActive] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  let pathName = commonResource(location.pathname)
  const handlePathMenu = useCallback((data) => {
    let size = data.length;
    for (let i = 0; i < size; ++i) {
      if (checkResourceAdmin(data[i].resources, location.pathname)) {
        setMenuActive(data[i])
        dispatch(transferMenuToContentMain(data[i]))
        return;
      }
      let sizeSub = data[i].subMenus.length;
      for (let j = 0; j < sizeSub; ++j) {
        if (checkResourceAdmin(data[i].subMenus[j].resources, location.pathname)) {
          setMenuActive(data[i])
          dispatch(transferMenuToContentMain(data[i]))
          return;
        }
      }
    }
    window.location.href = linkHttp.linkNotFound;
  }, [dispatch, location.pathname])
  const getListMenu = useCallback(async () => {
    const header = createHeader()
    const data = await getListMainMenu(header);
    handlePathMenu(data);
    setMenus(data)
  }, [handlePathMenu])
  useEffect(() => {
    getListMenu()
  }, [getListMenu])
  const handleChangeOpenMenu = (menu, flagMenu) => {
    if (flagMenu) {
      if (menuActive === null || menuActive !== menu) {
        setMenuActive(menu)
      } else {
        setMenuActive(null)
      }
    } else {
      dispatch(transferMenuToContentMain(menu))
    }
  }
  return (
    <div className={`main-menu  menu-fixed menu-light menu-accordion menu-shadow menu-native-scroll expanded ${isOpen ? `open` : ``}`} data-scroll-to-active="true" ref={ref}>
      <div className="row main-menu-logo">
        <div className="col-8">
          <div className="menu-logo">
            <img src={logoBrand} alt="" />
          </div>
        </div>
        <div className="col-4 close-overPlay">
          <i className="fa-solid fa-xmark " onClick={() => dispatch(onClickHandleOverPlay(false))}></i>
        </div>
      </div>
      <div className="main-menu-content ps ps--active-y">
        <ul id="main-menu-navigation" className="navigation navigation-main" data-menu="menu-navigation">
          {menus.length !== 0 && (
            <li className={`nav-item ${menus[0].href === pathName || pathName === '/admin' ? 'active' : ''}`}>
              <NavLink className="d-flex align-items-center" to={menus[0].href} >
                <i className="fa-solid fa-house " />
                <span className="menu-item text-truncate">Tổng quan</span>
              </NavLink>
            </li>
          )}
          {menus && menus.map((menu, index) => (
            <React.Fragment key={index}>
              {!menu.visible && menu.header && (
                <li className="navigation-header">
                  <span>{menu.title}</span>
                </li>
              )}
              {!menu.visible && !menu.header && index !== 0 && (
                <li className={`nav-item   menu-item-animating ${menu === menuActive ? 'open' : ''} ${menu.subMenus.length !== 0 ? 'has-sub ' : ''} `}   >
                  <div className={`d-flex align-items-center menu-head ${menu === menuActive ? 'active' : ''}`} onClick={() => handleChangeOpenMenu(menu, true)} >
                    <i className={menu.iconClass} />
                    <span className="menu-title text-truncate">{menu.title}</span>
                  </div>
                  {menu.subMenus && menu.subMenus.map((subMenu, zIndex) => (
                    <ul className="menu-content" key={zIndex}>
                      <li >
                        <NavLink className={`d-flex align-items-center ${subMenu.href === pathName ? 'active' : ''}`} to={`${connectAWSParams.domainClient}${subMenu.href}`} onClick={() => handleChangeOpenMenu(subMenu, false)}>
                          <i className={subMenu.iconClass} />
                          <span className="menu-item text-truncate">{subMenu.title}</span>
                        </NavLink>
                      </li>
                    </ul>
                  ))}
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>

      </div>
    </div>
  )
}
export default memo(forwardRef(AdminMenu));