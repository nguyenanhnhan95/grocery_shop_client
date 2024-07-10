import { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../assets/css/composite/modal/componentModal.css"
function ComponentModal(props) {
    const { handleShow, show, informationModal,handleAction } = props;
    return (
        <Modal show={show} onHide={() => handleShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>{informationModal.title}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleAction}>
                    Đồng ý
                </Button>
                <Button variant="secondary" onClick={() => handleShow(false)}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default memo(ComponentModal);