'use client'
import { useFetchData } from "@/hooks/fetch-authencation/useFetchData";
import { SearchAdminProps } from "@/types/search";
import { debounce } from "@/utils/commonUtils";
import { Autocomplete, Box, TextField } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";


function SearchDataList<T, ID>(props: SearchAdminProps<T, ID>) {
    const { setSearchFiled, searchItem,  url, take,show, title,data,attribute } = props;
    const { fetchData, data:dataFetch,code } = useFetchData<T[]>();
    const [options,setOptions]=useState<T[]|[]>(data)
    // Fetch data when URL is provided
    useEffect(() => {
        if (url) {
            fetchData(url);
        }
    }, [fetchData, url]);
    useEffect(()=>{
        if(code===200){
            setOptions(dataFetch||data)
        }
    },[code])
    // Handle input change, set searchField with the updated value
    const handleInputChange = useCallback((newInputValue: ID) => {
        const newQueryParameter: Record<string, ID> = {
            ...searchItem.search,
            [attribute]: newInputValue,
        };

        setSearchFiled(newQueryParameter);
    }, [setSearchFiled, searchItem]);

    // Debounced input handler to reduce API calls
    const debouncedHandleInputChange = useMemo(() => debounce(handleInputChange, 500), [handleInputChange]);

    // Custom Paper Component
    // const CustomPaper = useCallback((props) => <Paper elevation={8} {...props} />, []);

    return (
        <div className="col-12 col-md-6 col-xl-3 container-content-search-advanced-item">
            <Autocomplete
                getOptionLabel={(option) => option}
                freeSolo
                selectOnFocus
                clearOnBlur={false}
                autoHighlight
                options={options as []}
                onInputChange={(event, newInputValue) => debouncedHandleInputChange(newInputValue as ID)}
                renderOption={(props, option) => (
                    <Box component="li" {...props} key={option[take]}>
                        {option[take]} {/* Display the value based on the attribute */}
                    </Box>
                )}
                // PaperComponent={CustomPaper}
                renderInput={(params) => <TextField {...params} label={title} />}
            />
        </div>
    );
}

export default memo(SearchDataList);