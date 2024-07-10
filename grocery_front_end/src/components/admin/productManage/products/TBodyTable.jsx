import { memo } from "react"
import ActionDropdown from "../../../composite/table/ActionDropdown"

function TBodyTable({ list, queryParameter }) {
    return (
        <tbody>
            {list && list.result.map((each, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</th>
                    <td>{each.images.length>0?each.images[0]:''}</td>
                    <td>{each.name}</td>
                    <td>{each.sky}</td>    
                    <td>{each.productCategory.name}</td>
                    <td></td>
                    <td>{each.price}</td>
                    <td></td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} />
                    </td>
                </tr>
            ))}
        </tbody>
    )
}
export default memo(TBodyTable)