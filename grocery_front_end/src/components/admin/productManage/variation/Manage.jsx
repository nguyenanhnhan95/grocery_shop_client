import { memo } from "react";
import SearchContentAdmin from "../../common/SearchContentAdmin";
import SectionActionAdmin from "../../common/SectionActionAdmin";
import TableManage from "../../../composite/table/TableManage";
function Manage() {
    return (
        <>
            <SectionActionAdmin />
            <SearchContentAdmin />
            <TableManage />
        </>
    )
}
export default memo(Manage);