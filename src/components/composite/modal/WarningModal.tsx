'use client'
import { AGREE, VARIANT_OUTLINE_WANING } from "@/utils/commonConstants";
import { Button, Modal } from "react-bootstrap";
import "./styles/warningModal.css"
function WarningModal(props:ModalProps){
    const { handleShow, show, informationModal  } = props;
    return (
        <Modal show={show} className="modal-warning" onHide={() => handleShow(false)} >
            <Modal.Body>{informationModal}</Modal.Body>
            <Modal.Footer >
                <Button variant={VARIANT_OUTLINE_WANING} onClick={() => handleShow(false)}>
                    {AGREE}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default WarningModal;