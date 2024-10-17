'use client';
import SearchContent from "@/components/admin/common/SearchContent";
import SectionAction from "@/components/admin/common/SectionAction";
import TitleAdmin from "@/components/admin/common/TitleAdmin";
import { ColumnVariation, optionSearch, queryParameterInitial, sectionActions } from "@/components/admin/product/variation/initialConfig";
import TBodyTable from "@/components/admin/product/variation/TBodyTable";
import TableManage from "@/components/composite/table/TableManage";
import { useAuthorizePage } from "@/hooks/auth/useAuthorizePage";
import { useAppDispatch } from "@/lib/redux";
import { createQueryParameter } from "@/redux/slice/common/queryParameter";
import { Variation } from "@/types/product";
import { useEffect } from "react";

function ManageProductVariation() {
    useAuthorizePage("variation:view")
    const dispatch = useAppDispatch();
    useEffect(() => {

        dispatch(createQueryParameter(queryParameterInitial))

    }, [dispatch])
    return (
        <div className="container-body-admin">
            <TitleAdmin />
            <SectionAction itemAction={sectionActions} />
            <SearchContent itemSearch={optionSearch} />
            <TableManage<Variation>
                url={'variation'}
                TBodyTable={TBodyTable}
                nameColumn={ColumnVariation}
            />
        </div>
    )
}
export default ManageProductVariation