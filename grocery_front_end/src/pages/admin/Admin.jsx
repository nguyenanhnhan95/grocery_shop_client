import "../../assets/css/admin/admin.css";
import ContentAdmin from "../../components/admin/content/ContentAdmin"
import { memo, useEffect, useRef } from "react";
import AdminMenu from "../../components/admin/menus/AdminMenu";

function Admin() {
    const menuMainRef = useRef(null)
    useEffect(()=>{
        console.log(menuMainRef)
    },[])
    return (
            <div className="container-fluid container-main d-flex">
            <AdminMenu ref={menuMainRef} />
            <ContentAdmin />
        </div>    
    )
}
export default memo(Admin);