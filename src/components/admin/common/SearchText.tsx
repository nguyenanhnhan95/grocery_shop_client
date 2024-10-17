import { SearchAdminProps } from "@/types/search";
import { TextField } from "@mui/material";
import { memo, useCallback } from "react";

function SearchText<T,ID>(props: SearchAdminProps<T, ID>){
    const { setSearchFiled,searchItem,title,attribute } = props;
    const handleSelect =useCallback( (value:ID) => {

        const newQueryParameter: Record<string, ID> = {
            ...searchItem,
            [attribute]: value,
        };
        setSearchFiled(newQueryParameter);
    },[searchItem,attribute,setSearchFiled])
    return(
        <div className="col-12 col-md-6 col-xl-3 container-content-search-advanced-item">
            <TextField label={title} onChange={(e)=>handleSelect(e.target.value as ID)} variant="outlined"/>
        </div>
    )
}
export default memo(SearchText)