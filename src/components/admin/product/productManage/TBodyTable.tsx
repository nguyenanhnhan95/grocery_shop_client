import ActionDropdown from "@/components/composite/table/ActionDropdown"
import TDImageTable from "@/components/composite/table/TDImageTable"
import { useAppSelector } from "@/lib/redux"
import { RootState } from "@/setting/store"
import { optionActions } from "./initialConfig"
import { memo } from "react"
import { KEY_IMAGE_ERROR } from "@/utils/commonConstants"
import { QueryListResult } from "@/types/queryListResult"
import { ProductManage } from "@/types/product"

interface PropsTBody {
    list: QueryListResult<ProductManage>
    url: string
}

function TBodyTable({ list, url }: PropsTBody) {
    const { queryParameter } = useAppSelector((state: RootState) => state.queryParameter)

    return (
        <>
            {list && list.result.map((each, index) => (
                <tr key={index} className="tr-product-manage">
                    <td scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</td>
                    {/* <td>{each.images.length>0?each.images[0]:''}</td> */}
                    <td>{each.name}</td>
                    <td ><TDImageTable srcImage={each.images[0] || KEY_IMAGE_ERROR} /></td>
                    <td>{each.brand}</td>
                    <td>{each.nameProductCategory}</td>
                    <td>{each.qtyInStock}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} url={url} optionActions={optionActions} />
                    </td>
                </tr>
            ))}
        </>
    )
}
export default memo(TBodyTable)