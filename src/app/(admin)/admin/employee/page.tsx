'use client';

import SearchContent from "@/components/admin/common/SearchContent";
import SectionAction from "@/components/admin/common/SectionAction";
import TitleAdmin from "@/components/admin/common/TitleAdmin";
import { ColumnEmployee, optionSearch, queryParameterInitial, sectionActions } from "@/components/admin/system/employee/initialConfig";
import TBodyTable from "@/components/admin/system/employee/TBodyTable";
import TableManage from "@/components/composite/table/TableManage";
import { useAppDispatch } from "@/lib/redux";
import { createQueryParameter } from "@/redux/slice/common/queryParameter";
import { Employee } from "@/types/user";
import { useEffect } from "react";

function ManageEmloyee() {
    const dispatch = useAppDispatch();
    useEffect(() => {

        dispatch(createQueryParameter(queryParameterInitial))

    }, [dispatch])
    return (
        <div className="container-body-admin">
            <TitleAdmin />
            <SectionAction itemAction={sectionActions} />
            <SearchContent itemSearch={optionSearch} />
            <TableManage<Employee>
                url={'employee'}
                TBodyTable={TBodyTable}
                nameColumn={ColumnEmployee}
            />
        </div>
    )
}
export default ManageEmloyee