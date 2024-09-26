'use client'
import { useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";

function TitleAdmin(){
    const { menu } = useAppSelector((state:RootState) => state.sidebarMenu)
    return (
        <div className="row main-content-title m-0 pl-2 text-xl font-semibold dark:">
            <div className="col-12">
                {menu !== null ? menu.title : ""}
            </div>
        </div>
    )
}
export default TitleAdmin;