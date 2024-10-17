import ActionDropdown from "@/components/composite/table/ActionDropdown"
import { useAppSelector } from "@/lib/redux"
import { RootState } from "@/setting/store"
import { optionActions } from "./initialConfig"
import { memo } from "react"
import { QueryListResult } from "@/types/queryListResult"
import { Variation } from "@/types/product"

interface PropsTBody {
    list: QueryListResult<Variation>
    url: string
}
function TBodyTable({ list, url }:PropsTBody) {
    const { queryParameter } = useAppSelector((state:RootState) => state.queryParameter)
    return (
        <>
            {list && list.result.map((each, index) => (
                <tr key={index}>
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    <td>{each.name}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActions} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)