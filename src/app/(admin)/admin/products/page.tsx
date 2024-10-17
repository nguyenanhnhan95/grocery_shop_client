'use client';
import SearchContent from "@/components/admin/common/SearchContent";
import SectionAction from "@/components/admin/common/SectionAction";
import TitleAdmin from "@/components/admin/common/TitleAdmin";
import { ColumnProduct, optionSearch, queryParameterInitial, sectionActions } from "@/components/admin/product/productManage/initialConfig";
import TBodyTable from "@/components/admin/product/productManage/TBodyTable";
import TableManage from "@/components/composite/table/TableManage";
import { useAppDispatch } from "@/lib/redux";
import { createQueryParameter } from "@/redux/slice/common/queryParameter";
import { ProductManage } from "@/types/product";
import { useEffect } from "react";

function ManageProducts() {
    const dispatch = useAppDispatch();
    useEffect(() => {

        dispatch(createQueryParameter(queryParameterInitial))

    }, [dispatch])
    return (
        <div className="container-body-admin">
            <TitleAdmin />
            <SectionAction itemAction={sectionActions} />
            <SearchContent itemSearch={optionSearch} />
            <TableManage<ProductManage>
                url={'products'}
                TBodyTable={TBodyTable}
                nameColumn={ColumnProduct}
            />
        </div>
    )
}
export default ManageProducts