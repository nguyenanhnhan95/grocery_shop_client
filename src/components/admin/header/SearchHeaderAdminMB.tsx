'use client'
import { memo } from "react";

export interface OverSearchAdminMBProps {
    setOverSearchMB: (value: boolean) => void;
    refClickSearchMB: React.RefObject<HTMLLIElement>;
}
function SearchHeaderAdminMB(props:OverSearchAdminMBProps) {
    const {setOverSearchMB,refClickSearchMB} = props;
    return (
        <li className="header-search-admin-mb nav-item" onClick={()=>setOverSearchMB(true)} ref={refClickSearchMB}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </li>
    )
}
export default memo(SearchHeaderAdminMB)