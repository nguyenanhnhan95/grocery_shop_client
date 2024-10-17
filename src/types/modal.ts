export interface ModalProps {
    handleShow: (show: boolean) => void,
    show: boolean,
    informationModal?: string,
    handleAction?: () => void,
    informationTitle?: string,
    urlImage?:string
}