import { memo, useCallback } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "../../../assets/css/composite/search/dateItemSearch.css"

function DateItemSearch(props) {
    const { handleSetQuery, item, query } = props;
    const handleEnterDate =useCallback( (value) => {
        const date = new Date(value)
        let newQueryParameter=null;
        if (date instanceof Date ) {    
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            newQueryParameter = {
                ...query,
                criterias: {
                    ...query.criterias,
                    [firstKey]: date,
                }
            }
        }else{
            const newSearchName = { ...item.search };
            const firstKey = Object.keys(newSearchName)[0];
            newQueryParameter = {
                ...query,
                criterias: {
                    ...query.criterias,
                    [firstKey]: null,
                }
            }
        }
        handleSetQuery(newQueryParameter)
    },[query,item,handleSetQuery])
    console.log(query)
    return (
        <div className="col-12 col-md-4 col-xl-3 container-content-search-advanced-item">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker  label={item.title} dateFormat="dd/MM/yyyy" onChange={(value) => handleEnterDate(value)} />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    )
}
export default memo(DateItemSearch)