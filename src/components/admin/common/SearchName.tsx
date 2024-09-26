'use client'
import { useAppDispatch } from "@/lib/redux";
import { updateQueryCriterias } from "@/redux/slice/common/queryParameter";
import {  OptionSearch } from "@/types/initialConfigAdmin";
import { debounce } from "@/utils/commonUtils";
import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react"
interface SearchNameProps<T, ID> {
    setSearchFiled: Dispatch<SetStateAction<Record<string, ID>>>,
    handleShowAdvanced: () => void,
    searchItem: Record<string, ID>,
    attribute: string,
    searchAdvanced:OptionSearch<T>
}
function SearchName<T, ID>(props: SearchNameProps<T, ID>) {
    const { handleShowAdvanced, setSearchFiled, searchItem,searchAdvanced ,attribute} = props;
    const dispatch = useAppDispatch();
    const handelEnterData = useCallback((value: ID) => {
        const newQueryParameter: Record<string, ID> = {
            ...searchItem,
            [attribute]: value,
        };
        setSearchFiled(newQueryParameter)
    }, [setSearchFiled, searchItem])
    const debouncedHandleEnterData = useMemo(() => debounce(handelEnterData, 500), [handelEnterData]);
    return (
        <div className="row container-content-search-head">
            <div className={searchAdvanced.modeShow.style.display === 'none' ? 'col-12 col-md-9 col-xl-10 container-content-search-name' : 'col-12 col-md-9 col-xl-10 container-content-search-name'} >
                <input type="text" placeholder="Nhập tên " onChange={(event) => debouncedHandleEnterData(event.target.value as ID)} />
                <button type="button" onClick={() => dispatch(updateQueryCriterias(searchItem))}>
                    <i className="fa-solid fa-magnifying-glass" />
                </button>
            </div>
            <div className="col-12 col-md-3 col-xl-2 container-content-option-advanced" style={{ display: searchAdvanced.modeShow.style.display }} onClick={handleShowAdvanced} >
                <button type="button" >
                    Lọc nâng cao<i className="fa-solid fa-chevron-down " />
                </button>
            </div>
        </div>
    )
}
export default memo(SearchName)