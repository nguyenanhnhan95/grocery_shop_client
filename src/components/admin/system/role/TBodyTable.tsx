import ActionDropdown from "@/components/composite/table/ActionDropdown"
import { useAppSelector } from "@/lib/redux"
import { RootState } from "@/setting/store"
import { memo } from "react"
import { optionActions } from "./initialConfig"
import { Role } from "@/types/role"
import { QueryListResult } from "@/types/queryListResult"
interface PropsTBody {
    list: QueryListResult<Role>,
    url: string
}
function TBodyTable({ list, url }: PropsTBody) {
    const { queryParameter } = useAppSelector((state: RootState) => state.queryParameter)
    return (
        <>
            {list && list.result.map((each:Role, index:number) => (
                <tr key={index} className="tr-product-manage">
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    {/* <td>{each.images.length>0?each.images[0]:''}</td> */}
                    <td>{each.name}</td>
                    <td>{each.description}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActions} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)