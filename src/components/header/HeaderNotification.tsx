'use client';
import useClickOutsideModal from "@/hooks/common/useClickOutsideModel";
import { useRef } from "react";
import "./styles/headerNotification.css"
import { useAppSelector } from "@/lib/redux";
import { RootState } from "@/setting/store";
function HeaderNotification() {
    const { isModalVisible, modalRef, setIsModalVisible } = useClickOutsideModal(false);
    const notifyHeaderRef = useRef<HTMLDivElement | null>(null);
    const { loading } = useAppSelector((state: RootState) => state.currentUser)
    const handleNotificationHeaderClick = () => {
        if (notifyHeaderRef.current) {
            if (isModalVisible) {
                notifyHeaderRef.current.style.display = 'none';
                setIsModalVisible(false);
            } else {
                notifyHeaderRef.current.style.display = 'block';
                setIsModalVisible(true);
            }
        }

    };
    return (
        <li className="nav-item  header-notification " ref={modalRef} >
            <div className={`${loading !== false ? 'loading-information-user' : ''}`}>
                {loading !== null && loading !== true && (
                    <i className="fa-regular fa-bell  " onClick={handleNotificationHeaderClick} />
                )}
            </div>
            {loading === false && (
                <>
                    <div className="header-notification-numbers  translate-middle badge rounded-circle">15</div>

                    <div className="header-notification-modal" style={{ display: isModalVisible ? 'block' : 'none' }} ref={notifyHeaderRef}>
                        <div className="d-flex justify-content-between header-notification-modal-header">
                            <div className="header-notification-modal-title">Thông báo</div>
                            <div className="header-notification-modal-read">Đánh dâu đã đọc tất cả</div>
                        </div>
                        <hr />
                        <div className="card card-notification">
                            <div className="card-header container-header-notification">
                                <div className="card-title">5 ngày trước</div>
                            </div>
                            <div className="card-body card-body-notification-content">
                                <div className="card-body-notification-content-title">
                                    Giảm giá
                                </div>
                                <div className="card-body-notification-content-description">
                                    xin thông báo hiện Shop KHÔNG có chương trình tri ân khách hàng nào bằng việc tặng
                                    nước hoa,
                                    quà.
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="card card-notification">
                            <div className="card-header container-header-notification">
                                <div className="card-title">5 ngày trước</div>
                            </div>
                            <div className="card-body card-body-notification-content">
                                <div className="card-body-notification-content-title">
                                    Giảm giá
                                </div>
                                <div className="card-body-notification-content-description">
                                    xin thông báo hiện Shop KHÔNG có chương trình tri ân khách hàng nào bằng việc tặng
                                    nước hoa,
                                    quà.
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="card-notification-seen-all d-flex justify-content-center">
                            Xem tất cả thông báo !
                        </div>
                    </div>
                </>
            )}

        </li>
    )
}
export default HeaderNotification;