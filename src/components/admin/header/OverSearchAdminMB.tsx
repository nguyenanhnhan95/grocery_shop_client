'use client'
import { memo, useEffect, useRef } from "react";
import { OverSearchAdminMBProps } from "./SearchHeaderAdminMB";
import "./styles/overSearchAdminMB.css"
function OverSearchAdminMB({ setOverSearchMB, refClickSearchMB }: OverSearchAdminMBProps) {
    const coverElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                coverElement.current &&
                !coverElement.current.contains(event.target as Node) &&
                refClickSearchMB.current &&
                !refClickSearchMB.current.contains(event.target as Node)
            ) {
                setOverSearchMB(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [setOverSearchMB, refClickSearchMB]);
    return (
        <div className="header-search-admin-over-mb " ref={coverElement}>
            <div className="navbar-collapse">
                <ul className="navbar-nav ">
                    <li className="nav-item handle-icon">
                        <i className="fa-solid fa-arrow-left-long" onClick={() => setOverSearchMB(false)}></i>
                    </li>
                    <li className="nav-item handle-input">
                        <input placeholder="Tìm kiếm" className="form-control" />
                    </li>
                    <li className="nav-item handle-icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default memo(OverSearchAdminMB)