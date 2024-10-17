'use client';
import SearchContent from "@/components/admin/common/SearchContent";
import SectionAction from "@/components/admin/common/SectionAction";
import TitleAdmin from "@/components/admin/common/TitleAdmin";
import { ColumnPromotion, optionSearch, queryParameterInitial, sectionActions } from "@/components/admin/shop/promotion/initialConfig";
import TBodyTable from "@/components/admin/shop/promotion/TBodyTable";
import TableManage from "@/components/composite/table/TableManage";
import { useAppDispatch } from "@/lib/redux";
import { createQueryParameter } from "@/redux/slice/common/queryParameter";
import { Promotion } from "@/types/promotion";
import { useEffect } from "react";

function ManageShopPromotion() {
    const dispatch = useAppDispatch();
    useEffect(() => {

        dispatch(createQueryParameter(queryParameterInitial))

    }, [dispatch])
    return (
        <div className="container-body-admin">
            <TitleAdmin />
            <SectionAction itemAction={sectionActions} />
            <SearchContent itemSearch={optionSearch} />
            <TableManage<Promotion>
                url={'shop-promotion'}
                TBodyTable={TBodyTable}
                nameColumn={ColumnPromotion}
            />
        </div>
    )
}
export default ManageShopPromotion