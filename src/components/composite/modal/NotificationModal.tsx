'use client'
import { handleNotificationModal } from "@/redux/slice/common/notificationModal";
import { Modal, Button } from 'react-bootstrap';
import { actionCloseNotificationModal } from "@/redux/action/actionShowNotificationModal";
import { RootState } from "@/setting/store";
import "./styles/customModal.css"
import "./styles/notificationModal.css"
import { AGREE, NOTIFICATION, VARIANT_OUTLINE_WANING } from "@/utils/commonConstants";
import { useAppDispatch, useAppSelector } from "@/lib/redux";


const NotificationModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { show, message, handleServiceConfirm } = useAppSelector((state: RootState) => state.notificationModal)

    const handleService = () => {
        dispatch(handleNotificationModal(actionCloseNotificationModal()))
        if (handleServiceConfirm) {
            handleServiceConfirm();
        }
    }

    return (
        <Modal show={show} className="notification-modal"  >
            <Modal.Header closeButton={false}  >
                <Modal.Title >{NOTIFICATION}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer >
                <Button variant={VARIANT_OUTLINE_WANING} onClick={() => handleService()}>
                    {AGREE}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default NotificationModal