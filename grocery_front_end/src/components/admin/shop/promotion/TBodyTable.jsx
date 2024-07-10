import { memo } from "react"
import ActionDropdown from "../../../composite/table/ActionDropdown"
import { convertDate} from "../../../../utils/commonUtils"

function TBodyTable({ list, queryParameter }) {
    
    return (
        <tbody>
            {list && list.result.map((each, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</th>
                    <td>{each.name}</td>
                    <td>{each.description}</td>
                    <td>{each.code}</td>
                    <td>{each.startDate===null?'':convertDate(each.startDate)}</td>
                    <td>{each.endDate===null?'':convertDate(each.endDate)}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} />
                    </td>
                </tr>
            ))}
        </tbody>
    )
}
export default memo(TBodyTable)