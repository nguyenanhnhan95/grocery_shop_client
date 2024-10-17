'use client'
import { CONFIRM, NOTIFY_DELETE } from "@/utils/commonConstants";
import ConfirmModal from "../modal/ConfirmModal";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
import { useRouter } from "next/navigation";
import { createQueryParameter } from "@/redux/slice/common/queryParameter";
import { useFetchDelete } from "@/hooks/fetch-authencation/useFetchDelete";
import { createActionURL } from "@/utils/commonUtils";
import { ActionDropdownProps, ActionTable } from "@/types/initialConfigAdmin";
import "./styles/actionDropdown.css"
import { Dropdown } from "react-bootstrap";
function ActionDropdown(props: ActionDropdownProps) {
    const { id, url, optionActions } = props;
    const { initialQueryParameter } = useAppSelector((state: RootState) => state.queryParameter)
    const [showModal, setShowModal] = useState<boolean>(false)
    const route = useRouter();
    const dispatch = useAppDispatch();
    const handleReload = useCallback(() => {
        dispatch(createQueryParameter(JSON.parse(JSON.stringify(initialQueryParameter))))
    }, [dispatch,initialQueryParameter])
    const { fetchDelete } = useFetchDelete(`${createActionURL(url).pathVariable(`${id}`)}`, handleReload);
    const handleShowModal = useCallback((show: boolean) => {
        setShowModal(show)
    }, [])
    const handleAction = useCallback((action: ActionTable) => {
        switch (action.action) {
            case 'edit':
                if (id) {
                    setShowModal(false)
                    route.push(`/admin/${url}/edit/${id}`);
                }
                break;
            case 'delete':
                handleShowModal(true)
                break;
            default:
                return;
        }
    }, [id, handleShowModal, route,url])
    const handleDelete = useCallback(() => {
        fetchDelete()
        handleShowModal(false);
    }, [ handleShowModal,fetchDelete])
    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" >
                <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {optionActions.map((action: ActionTable, aIndex) => (
                    <Dropdown.Item onClick={() => handleAction(action)} key={aIndex}><li className="dropdown-item"><i className={action.icon}></i>{action.name}</li></Dropdown.Item>
                ))}

            </Dropdown.Menu>
            <ConfirmModal handleAction={handleDelete} show={showModal} informationTitle={CONFIRM} informationModal={NOTIFY_DELETE} handleShow={handleShowModal} />
        </Dropdown>

    )
}
export default ActionDropdown;