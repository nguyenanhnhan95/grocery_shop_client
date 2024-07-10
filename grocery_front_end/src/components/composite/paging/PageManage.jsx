import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { choicePage, selectSize } from "../../../slice/main/actionAdmin";
import "../../../assets/css/composite/paging/pageManage.css"
function PageManage() {
    const { queryParameter, list } = useSelector((state) => state.actionAdmin);
    const dispatch = useDispatch();
    const handleSelectSize = (size) => {
        dispatch(selectSize(size))
    }
    const handleChoicePage = useCallback((page) => {
        dispatch(choicePage(page))
    }, [dispatch])
    const listPage = useMemo(() => {
        const listPage = [];
        for (let i = 0; i < list.total / queryParameter.size; ++i) {
            listPage.push(
                <li className={i === queryParameter.page ? 'selected' : ''} onClick={() => handleChoicePage(i)} key={i}>{i}</li>
            );
        }
        return listPage;
    }, [queryParameter.size, queryParameter.page, list.total, handleChoicePage])
    return (
        <div className="d-flex justify-content-between row container-content-data-page ">
            <div className="col-12 d-flex justify-content-end align-items-center">
                <div className="dataTables_info  container-content-data-page-item">
                    [
                    <span>{list.total === 0 ? 0 : (queryParameter.page) * queryParameter.size + 1}</span>-
                    <span>{((queryParameter.page + 1) * queryParameter.size) > list.total ? list.total : ((queryParameter.page + 1) * queryParameter.size)}</span>/
                    <span>{list.total}</span>]
                </div>
                <div className="table-selection-page container-content-data-page-item">
                    <label>
                        <select defaultValue={queryParameter.size} onChange={(event) => handleSelectSize(event.target.value * 1)}>
                            <option >5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                        </select>
                    </label>
                </div>
                <div className="table-items-page container-content-data-page-item">
                    <ul>
                        {listPage.length === 1 ? '' : listPage}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default memo(PageManage);