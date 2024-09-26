'use client'
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { SearchAdminProps } from "@/types/search";
import { createActionURL } from "@/utils/commonUtils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { memo, useEffect, useState } from "react";

function SelectCustomSearch<T extends { [key: string]: any }, ID>(props: SearchAdminProps<T, ID>) {
    const { setSearchFiled, searchItem,  url, take,show, title,data,attribute } = props;
    const { fetchData, data:dataFetch,code } = useFetchData<T[]>();
    const [options,setOptions]=useState<T[]|[]>(data)
    useEffect(() => {
        if (url) {
            fetchData(createActionURL(url).instant());
        }
    }, [fetchData, url]);
    useEffect(()=>{
        if(code===200){
            setOptions(dataFetch||data)
        }
    },[code])

    const handleSelect = (value:ID) => {

        const newQueryParameter: Record<string, ID> = {
            ...searchItem,
            [attribute]: value,
        };
        console.log(newQueryParameter)
        setSearchFiled(newQueryParameter);
    }

    return (
        <div className="col-12 col-md-6 col-xl-3 container-content-search-advanced-item">
            <FormControl >
                <InputLabel id={title} >{title}</InputLabel>
                <Select defaultValue={''}
                    labelId={title}
                    onChange={(e)=>handleSelect(e.target.value as ID)}
                    label={title}
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                        disableScrollLock: true,
                        // PaperProps: {
                        //     className: getScreenThem(screenMode),
                        // },
                    }}
                >
                    <MenuItem value="">
                        <em>{title}</em>
                    </MenuItem>
                    {options && options.map((each, index) => (
                        <MenuItem value={each[take]}  key={index}>{each[show]}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
export default memo(SelectCustomSearch);