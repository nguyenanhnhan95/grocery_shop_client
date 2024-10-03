import ActionDropdown from "@/components/composite/table/ActionDropdown"
import { convertDate } from "@/lib/date"
import { useAppSelector } from "@/lib/redux"
import { RootState } from "@/setting/store"
import { memo } from "react"
import { optionActions } from "./initialConfig"

interface PropsTBody {
    list: QueryListResult<Promotion>
    url: string
}
function TBodyTable({ list,url }:PropsTBody) {
    const { queryParameter } = useAppSelector((state:RootState) => state.queryParameter)
    return (
        <>
            {list && list.result.map((each, index) => (
                <tr key={index}>
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    <td>{each.name}</td>
                    <td>{each.description}</td>
                    <td>{each.code}</td>
                    <td>{each.startDate===null?'':convertDate(each.startDate)}</td>
                    <td>{each.endDate===null?'':convertDate(each.endDate)}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActions} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)