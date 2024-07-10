import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQueryParameter } from "../../../slice/main/actionAdmin";
import { debounce } from "../../../constants/common/methodCommon";
function SearchNameAdmin(props) {
    const {  handleShowAdvanced,handleSetQuery,query } = props;
    const { itemSearch } = useSelector((state) => state.actionAdmin)
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(createQueryParameter(query))
    };

    const handelEnterData =useCallback( (value) => {
        Object.keys(query.criterias).forEach(key => {
            if (value.hasOwnProperty(key)) {
                // Logs the key if it exists in both objects
                let copyQueryParameter = {
                    ...query,
                    criterias: {
                        ...query.criterias,
                        [key]: value[key]
                    }
                };
                handleSetQuery(copyQueryParameter)
                // Logs the updated queryParameter object
            }
        })
    },[handleSetQuery,query])
    const debouncedHandleEnterData = useMemo(() => debounce(handelEnterData, 500), [handelEnterData]);
    return (
        <div className="row container-content-search-head">
            <div className={itemSearch.searchAdvanced.style.display === 'none' ? 'col-12 col-md-9 col-xl-10 container-content-search-name' : 'col-12 col-md-9 col-xl-10 container-content-search-name'} >
                <input type="text" placeholder="Nhập tên " onChange={(event) => debouncedHandleEnterData({ name: event.target.value })} />
                <button type="button" onClick={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass" />
                </button>
            </div>
            <div className="col-12 col-md-3 col-xl-2 container-content-option-advanced" style={{ display: itemSearch.searchAdvanced.style.display }} onClick={handleShowAdvanced} >
                <button type="button" >
                    Lọc nâng cao<i className="fa-solid fa-chevron-down " />
                </button>
            </div>
        </div>
    )
}
export default memo(SearchNameAdmin);