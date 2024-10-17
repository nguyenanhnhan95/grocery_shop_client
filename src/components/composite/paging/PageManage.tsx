'use client'
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { updateQueryParameter } from "@/redux/slice/common/queryParameter";
import { RootState } from "@/setting/store";
import { memo, useCallback, useMemo } from "react";
import "./styles/pageManage.css"
import { QueryListResult } from "@/types/queryListResult";
export interface PageManageProps<T> {
    list: QueryListResult<T>; // list is a single QueryListResult object, not an array
    isPendingList: boolean; // Boolean indicating pending status
  }
function PageManage<T>(props: PageManageProps<T>) {
    const { list,isPendingList } = props;
    const { queryParameter } = useAppSelector((state:RootState) => state.queryParameter)
    const dispatch = useAppDispatch();
    const handleSelectSize =useCallback( (size:number) => {
        if ( size >= 0 && size !== queryParameter.size && !isPendingList) {
            dispatch(updateQueryParameter({...queryParameter,size:size,page:0}))
        }
    },[dispatch,queryParameter,isPendingList])
    const handleChoicePage = useCallback((page:number) => {
        if (page >= 0 && page !== queryParameter.page && !isPendingList) {
            dispatch(updateQueryParameter({...queryParameter,page:page}))
        }
    }, [dispatch,queryParameter,isPendingList])
    const listPage = useMemo(() => {
        const listPage = [];
        for (let i = 0; i < list.total / queryParameter.size; ++i) {
            listPage.push(
                <li className={i === queryParameter.page ? 'selected' : ''} onClick={() => handleChoicePage(i)} key={i}>{i}</li>
            );
        }
        return listPage;
    }, [queryParameter.size, queryParameter.page, list, handleChoicePage])
    return (
        <div className="container-content-data-page row ">
            <div className="col-12 d-flex justify-content-end align-items-center">
                <div className="dataTables_info  container-content-data-page-item">
                    [
                    <span>{list.total === 0 ? 0 : (queryParameter.page) * queryParameter.size + 1}</span>-
                    <span>{((queryParameter.page + 1) * queryParameter.size) > list.total ? list.total : ((queryParameter.page + 1) * queryParameter.size)}</span>/
                    <span>{list.total}</span>]
                </div>
                <div className="table-selection-page container-content-data-page-item">
                    <label>
                        <select defaultValue={queryParameter.size} onChange={(event) => handleSelectSize(Number(event.target.value) || 0)}>
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