import SearchDataList from "@/components/admin/common/SearchDataList";
import SearchDate from "@/components/admin/common/SearchDate";
import SearchName from "@/components/admin/common/SearchName";
import SelectSearch from "@/components/admin/common/SelectSearch";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

export interface SearchAdminProps<T =unknown ,ID = string | number|Dayjs |Date    >{
    searchItem:Record<string,ID>
    setSearchFiled:Dispatch<SetStateAction<Record<string, ID>>>,
    title?:string,
    url?:string,
    data:T[],
    attribute:keyof T,
    take:keyof T,
    show:keyof T  
}
export const ComponentSearchAdmin={
    date:SearchDate,
    dataList:SearchDataList,
    name:SearchName,
    select:SelectSearch
}