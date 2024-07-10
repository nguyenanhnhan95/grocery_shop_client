import { memo,  useCallback,  useEffect, useState } from "react"
import "../../../assets/css/composite/search/selectItemSearch.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BaseServiceAdmin from "../../../services/admin/base";
import { validation } from "../../../utils/validation";
function SelectItemSearch(props) {
    const { handleSetQuery, item, query } = props;
    const [options, setOptions] = useState([]);
    const getOptions =useCallback( async () => {
        try {
            const response = await BaseServiceAdmin.getAll(item.data)
            setOptions(response.result)
        } catch (error) {
            console.log(error)
            setOptions([]);
        }
    },[item.data])
    useEffect(() => {
        if (item.callApi) {
            getOptions()
        } else {
            return item.data;
        }
    }, [item.callApi,item.data,getOptions])
    const handleSelect = (value) => {
        const id = value.target.value;
        if (validation.isNumber(id)) {
            const selectedItem = options.find(option => option.id === id * 1);
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            const newQueryParameter = {
                ...query,
                criterias: {
                    ...query.criterias,
                    [firstKey]: parseInt(selectedItem.id),
                }
            }
            handleSetQuery(newQueryParameter)
        } else {
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
    }
    return (
        <div className="col-12 col-md-4 col-xl-3 container-content-search-advanced-item">
            <FormControl >
                <InputLabel id={item.title} >{item.title}</InputLabel>
                <Select defaultValue={''}
                    labelId={item.title}
                    onChange={handleSelect}
                    label={item.title}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>{item.title}</em>
                    </MenuItem>
                    {options && options.map((each, index) => (
                        <MenuItem value={each.id} key={index}>{each.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
export default memo(SelectItemSearch);