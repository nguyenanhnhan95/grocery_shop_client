'use client'
import { Modal } from "react-bootstrap";

function ImageModal(props:ModalProps){
    const { handleShow, show ,urlImage  } = props;
    return(
        <Modal show={show} className="modal-fullscreen" onHide={() => handleShow(false)} >
            <Modal.Body>
                <img src={urlImage} alt=""/>
            </Modal.Body>
        </Modal>
    )
}
export default ImageModal