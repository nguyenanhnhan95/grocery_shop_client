'use client';
import SearchContent from "@/components/admin/common/SearchContent";
import SectionAction from "@/components/admin/common/SectionAction";
import TitleAdmin from "@/components/admin/common/TitleAdmin";
import { columnRoles, optionSearch, queryParameterInitial, sectionActions } from "@/components/admin/system/role/initialConfig";
import TBodyTable from "@/components/admin/system/role/TBodyTable";
import TableManage from "@/components/composite/table/TableManage";
import { useAppDispatch } from "@/lib/redux";
import { createQueryParameter } from "@/redux/slice/common/queryParameter";
import { useEffect } from "react";

function ManageRole() {
    const dispatch = useAppDispatch();
    useEffect(() => {

        dispatch(createQueryParameter(queryParameterInitial))

    }, [dispatch])
    return (
        <div className="container-body-admin">
            <TitleAdmin />
            <SectionAction itemAction={sectionActions} />
            <SearchContent itemSearch={optionSearch} />
            <TableManage<Role>
                url={'role'}
                TBodyTable={TBodyTable}
                nameColumn={columnRoles}
            />
        </div>
    )
}
export default ManageRole