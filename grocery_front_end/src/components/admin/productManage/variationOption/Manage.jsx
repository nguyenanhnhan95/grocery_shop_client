import { memo } from "react";
import SectionActionAdmin from "../../common/SectionActionAdmin";
import SearchContentAdmin from "../../common/SearchContentAdmin";
import TableManage from "../../../composite/table/TableManage";
import TitleActionAdmin from "../../common/TitleActionAdmin";

function Manage() {
    return (
        <div className="container-body-admin">
            <TitleActionAdmin />
            <SectionActionAdmin />
            <SearchContentAdmin  />
            <TableManage  />
        </div>
    )
}
export default memo(Manage);