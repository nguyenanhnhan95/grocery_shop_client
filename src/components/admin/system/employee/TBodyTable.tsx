import ActionDropdown from "@/components/composite/table/ActionDropdown"
import TDImageTable from "@/components/composite/table/TDImageTable"
import { convertDate } from "@/lib/date"
import { useAppSelector } from "@/lib/redux"
import { RootState } from "@/setting/store"
import { getStatusClassName, getStatusName, optionActions } from "./initialConfig"
import { memo } from "react"
interface PropsTBody {
    list: QueryListResult<Employee>,
    url: string
}
function TBodyTable({ list, url }: PropsTBody) {
    const { queryParameter } = useAppSelector((state: RootState) => state.queryParameter)
    return (
        <>
            {list && list.result.map((each, index) => (
                <tr key={index} className="tr-product-manage">
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    <td>{each.name}</td>
                    <td>{each.nameLogin}</td>
                    <td>
                        <TDImageTable srcImage={each.avatar} />
                    </td>
                    <td>{each.email}</td>
                    <td>
                        <div className={`${getStatusClassName(each.accountStatus)}`}>
                            {getStatusName(each.accountStatus)}
                        </div>
                    </td>
                    <td>{convertDate(each.createDate)}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActions} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)