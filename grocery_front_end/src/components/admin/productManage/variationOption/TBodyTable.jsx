import { memo } from "react";
import ActionDropdown from "../../../composite/table/ActionDropdown";

function TBodyTable({ list,queryParameter }) {
    return (
        <tbody>
            {list && list.result.map((each, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1 + (queryParameter.size * queryParameter.page)}</th>
                    <td>{each.name}</td>
                    <td>{each.variation.name}</td>
                    <td className="table-action">
                        <ActionDropdown id={each.id} />
                    </td>
                </tr>
            ))}
        </tbody>
    )
}
export default memo(TBodyTable)