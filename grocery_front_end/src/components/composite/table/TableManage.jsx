import { useDispatch, useSelector } from "react-redux";
import "../../../assets/css/composite/table/tableManage.css"
import { searchDataAdmin } from "../../../redux/slice/admin/actionAdmin";
import { memo, useCallback, useEffect } from "react";
import PageManage from "../paging/PageManage";
function TableManage() {
  const { queryParameter, nameColumn, list, httpApi, TBodyTable } = useSelector((state) => state.actionAdmin)
  const dispatch = useDispatch();
  const getListResult = useCallback(async () => {
    try {
      const encodedQuery = encodeURIComponent(JSON.stringify(queryParameter));
      await dispatch(searchDataAdmin({ http: httpApi + '/search', data: encodedQuery })).unwrap();
    } catch (error) {
      console.log(error)
    }
  }, [httpApi, queryParameter, dispatch])
  useEffect(() => {
    getListResult();
  }, [getListResult])
  return (
    <div className="main-content-data pb-3">
      <div className="container-fluid container-content-data table-responsive">
        <table className="table table-hover ">
          <thead className="table-thead">
            <tr >
              {nameColumn.map((each, index) => (
                <th scope="col" style={each.style} key={index}>{each.name}</th>
              ))}
            </tr>
          </thead>
          <TBodyTable list={list} queryParameter={queryParameter} />
        </table>
      </div>
      <PageManage />
    </div>
  )
}
export default memo(TableManage);