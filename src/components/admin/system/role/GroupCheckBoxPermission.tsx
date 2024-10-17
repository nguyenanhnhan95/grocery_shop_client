import CheckBox from "@/components/composite/form/CheckBox";
import { Permission } from "@/types/role";
import { memo, useState } from "react";

interface CheckBoxPermisson{
    permission:Permission,
}
function GroupCheckBoxPermission({ permission}:CheckBoxPermisson) {
    const [showScope, setShowScope] = useState<boolean>(false);
    return (
        <>
            <tbody>
                <tr className="name-permisson" onClick={()=>setShowScope(prevShow => !prevShow)} >
                    <td >
                        {permission.name}
                    </td>
                    <td>
                        <button type="button" className={`action-open-scope ${showScope === true && 'show'}`}  >
                            <i className="fa-solid fa-chevron-up">
                            </i></button>
                    </td>
                </tr>
            </tbody>
            <tbody className={`${showScope === true ? 'show' : 'close'}`}>

                {
                    permission.scopes && permission.scopes.map((scope, zIndex) => (
                        <tr key={zIndex}>
                            <td className="permission-scope">{scope.name}</td>
                            <td className="permission-scope permission-scope-check">
                                <CheckBox
                                    name="permissions"
                                    instant={scope?.id}               
                                    className="form-check-input"
                                    type="checkbox"
                                />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </>
    )

}
export default memo(GroupCheckBoxPermission)