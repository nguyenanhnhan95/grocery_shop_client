'use client'
import CustomDate from "@/components/composite/form/CustomDate";
import { SearchAdminProps } from "@/types/search";
import { Dayjs } from "dayjs";
import { memo, useCallback } from "react";

function SearchDate(props:SearchAdminProps<unknown,Date>){
    const {  searchItem, setSearchFiled, title,take } = props;
    const handleEnterDate = useCallback(
        (value: Dayjs | null) => {
            const date = value ? value.toDate() : null;


            const newQueryParameter: Record<string, Date> = {
                ...searchItem,
                [take]: date,
            };

            setSearchFiled(newQueryParameter);
        },
        [setSearchFiled, searchItem]
    );

    return (
        <div className="col-12 col-md-6 col-xl-3 container-content-search-advanced-item">
            <CustomDate onChange={(value: Dayjs | null) => handleEnterDate(value)} title={title} />
        </div>
    );
};

export default memo(SearchDate);