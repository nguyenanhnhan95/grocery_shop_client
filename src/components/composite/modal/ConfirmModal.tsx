'use client'
import { AGREE, CLOSE } from "@/utils/commonConstants";
import { Button, Modal } from "react-bootstrap";
import './styles/customModal.css'

function ConfirmModal(props: ModalProps) {
    const { handleShow, show, informationModal, handleAction, informationTitle } = props;
    return (
        <Modal show={show}  onHide={() => handleShow(false)} >
            <Modal.Header  closeButton>
                <Modal.Title>{informationTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{informationModal}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleShow(false)}>
                    {CLOSE}
                </Button>
                <Button variant="primary" onClick={handleAction}>
                    {AGREE}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ConfirmModal;