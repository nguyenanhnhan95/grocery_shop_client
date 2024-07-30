import { Autocomplete, Box, styled, TextField } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "../../../assets/css/composite/search/inputDataSearch.css"
import BaseServiceAdmin from "../../../services/admin/base"
import { debounce, getScreenThem } from "../../../utils/commonUtils";
import { SCREEN_THEME_MODE } from "../../../utils/commonConstants";
const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root.dark': {
        backgroundColor: 'black', // thay đổi màu nền khi có lớp 'dark'
        color: 'white', // thay đổi màu chữ khi có lớp 'dark'
        // các thuộc tính CSS khác
    },
}));
function InputDataSearch(props) {
    const { handleSetQuery, item, query } = props;
    const [options, setOptions] = useState([]);
    const getOptions = useCallback(async () => {
        try {
            const response = await BaseServiceAdmin.getAll(item.data)
            if (response.code === 200) {
                setOptions(response.result)
            }

        } catch (error) {
            console.log(error)
            setOptions([]);
        }
    }, [item.data])
    useEffect(() => {
        if (item.callApi) {
            getOptions()
        } else {
            return item.data;
        }
    }, [item.callApi, item.data, getOptions])
    const handleInputChange = useCallback((newInputValue) => {
        if (newInputValue !== undefined && newInputValue.length > 0) {
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            const newQueryParameter = {
                ...query,
                criterias: {
                    ...query.criterias,
                    [firstKey]: newInputValue,
                }
            }
            handleSetQuery(newQueryParameter)
        } else {
            console.log(newInputValue)
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            const newQueryParameter = {
                ...query,
                criterias: {
                    ...query.criterias,
                    [firstKey]: null
                }
            }
            handleSetQuery(newQueryParameter)
        }
    }, [query, handleSetQuery, item])
    console.log(getScreenThem() === SCREEN_THEME_MODE.SCREEN_DARK.alias)
    const debouncedHandleEnterData = useMemo(() => debounce(handleInputChange, 500), [handleInputChange]);
    return (
        <div className="col-12 col-md-4 col-xl-3 container-content-search-advanced-item">
            <Autocomplete
             
                getOptionLabel={(option) => option.code}
                
                freeSolo
                selectOnFocus
                clearOnBlur={false}
                autoHighlight
                options={options}
                onInputChange={(event, newInputValue) => debouncedHandleEnterData(newInputValue)}
                renderOption={(props, option) => (
                    <Box component="li" {...props} key={option.code}>
                        {option.code}
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} label={item.title}  />}
            />
        </div>
    )
}
export default memo(InputDataSearch);