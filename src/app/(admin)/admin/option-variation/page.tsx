'use client';
import SearchContent from "@/components/admin/common/SearchContent";
import SectionAction from "@/components/admin/common/SectionAction";
import TitleAdmin from "@/components/admin/common/TitleAdmin";
import { queryParameterInitial } from "@/components/admin/product/variation/initialConfig";
import { ColumnVariationOption, optionSearch, sectionActions } from "@/components/admin/product/variationOption/initialConfig";
import TBodyTable from "@/components/admin/product/variationOption/TBodyTable";
import TableManage from "@/components/composite/table/TableManage";
import { useAppDispatch } from "@/lib/redux";
import { createQueryParameter } from "@/redux/slice/common/queryParameter";
import { VariationOption } from "@/types/product";
import { useEffect } from "react";

function ManageVariationOption() {
    const dispatch = useAppDispatch();
    useEffect(() => {

        dispatch(createQueryParameter(queryParameterInitial))

    }, [dispatch])
    return (
        <div className="container-body-admin">
            <TitleAdmin />
            <SectionAction itemAction={sectionActions} />
            <SearchContent itemSearch={optionSearch} />
            <TableManage<VariationOption>
                url={'option-variation'}
                TBodyTable={TBodyTable}
                nameColumn={ColumnVariationOption}
            />
        </div>
    )
}
export default ManageVariationOption