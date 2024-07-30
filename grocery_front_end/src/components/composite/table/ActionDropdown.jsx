import { useNavigate } from "react-router-dom";
import "../../../assets/css/composite/table/actionDropdown.css"
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDataAdmin } from "../../../redux/slice/admin/actionAdmin";
import ConfirmModal from "../modal/ConfirmModal";
import { CONFIRM, NOTIFY_DELETE } from "../../../utils/commonConstants";

function ActionDropdown(props) {
    const { dataActions, httpApi, httpNavigate } = useSelector((state) => state.actionAdmin);
    const { id } = props;
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleShowModal = useCallback((show) => {
        setShowModal(show)
    }, [])
    const handleAction = useCallback((action) => {
        switch (action.action) {
            case 'edit':
                setShowModal(false)
                navigate(`${httpNavigate}/edit/${id}`);
                break;
            case 'delete':
                handleShowModal(true)
                break;
            default:
                return;
        }
    }, [httpNavigate, id, handleShowModal, navigate])
    const handleDelete = useCallback(() => {
        dispatch(deleteDataAdmin({ http: httpApi, data: id }))
        handleShowModal(false);
    }, [httpApi, id, handleShowModal, dispatch])
    return (
        <div className="dropdown">
            <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false" />
            <ul className="dropdown-menu dropdown-menu-action">
                {dataActions.map((action, aIndex) => (
                    <div onClick={() => handleAction(action)} key={aIndex}><li className="dropdown-item"><i className={action.icon}></i>{action.name}</li></div>
                ))}

            </ul>
            <ConfirmModal handleAction={handleDelete} show={showModal} informationTitle={CONFIRM} informationModal={NOTIFY_DELETE} handleShow={handleShowModal} />
        </div>

    )
}
export default ActionDropdown;