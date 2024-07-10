import TableManage from "../../../composite/table/TableManage";
import SearchContentAdmin from "../../common/SearchContentAdmin";
import SectionActionAdmin from "../../common/SectionActionAdmin";

function Manage() {
    return (
        <>
            <SectionActionAdmin />
            <SearchContentAdmin />
            <TableManage />
        </>
    )
}
export default Manage;